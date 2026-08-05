import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:convert';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.light,
  ));
  runApp(const ForgeApp());
}

// ── Theme ──────────────────────────────────────────────────────────────────

const _bg       = Color(0xFF06080D);
const _surface  = Color(0xFF0C1018);
const _border   = Color(0xFF16202E);
const _lotus    = Color(0xFFC084F5);
const _cyan     = Color(0xFF00E5FF);
const _muted    = Color(0xFF3A4A5E);
const _text     = Color(0xFFB8CADE);

class ForgeApp extends StatelessWidget {
  const ForgeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Forge',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: _bg,
        colorScheme: const ColorScheme.dark(
          primary: _lotus,
          surface: _surface,
        ),
        fontFamily: 'monospace',
      ),
      home: const ForgeHome(),
    );
  }
}

// ── App model ──────────────────────────────────────────────────────────────

class LoadedApp {
  final String name;
  final String path;       // local file path
  final String type;       // html | jsx | vue | js
  final DateTime loadedAt;

  LoadedApp({
    required this.name,
    required this.path,
    required this.type,
    required this.loadedAt,
  });

  Map<String, dynamic> toJson() => {
    'name': name,
    'path': path,
    'type': type,
    'loadedAt': loadedAt.toIso8601String(),
  };

  factory LoadedApp.fromJson(Map<String, dynamic> j) => LoadedApp(
    name: j['name'],
    path: j['path'],
    type: j['type'],
    loadedAt: DateTime.parse(j['loadedAt']),
  );
}

// ── Home screen ────────────────────────────────────────────────────────────

class ForgeHome extends StatefulWidget {
  const ForgeHome({super.key});

  @override
  State<ForgeHome> createState() => _ForgeHomeState();
}

class _ForgeHomeState extends State<ForgeHome> {
  List<LoadedApp> _apps = [];
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _loadSavedApps();
  }

  // ── Persist ──────────────────────────────────────────────────────────────

  Future<void> _loadSavedApps() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getStringList('forge_apps') ?? [];
    setState(() {
      _apps = raw
        .map((s) => LoadedApp.fromJson(jsonDecode(s)))
        .where((a) => File(a.path).existsSync()) // prune deleted files
        .toList();
    });
  }

  Future<void> _saveApps() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(
      'forge_apps',
      _apps.map((a) => jsonEncode(a.toJson())).toList(),
    );
  }

  // ── File picker ──────────────────────────────────────────────────────────

  Future<void> _pickFile() async {
    setState(() => _loading = true);

    try {
      final result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['html', 'htm', 'jsx', 'tsx', 'js', 'vue', 'svelte'],
        allowMultiple: false,
      );

      if (result == null || result.files.isEmpty) {
        setState(() => _loading = false);
        return;
      }

      final file = result.files.single;
      final srcPath = file.path!;
      final ext = file.extension?.toLowerCase() ?? 'html';

      // Copy to app documents dir so it persists even if original moves
      final docsDir = await getApplicationDocumentsDirectory();
      final destDir = Directory('${docsDir.path}/forge_apps');
      await destDir.create(recursive: true);
      final destPath = '${destDir.path}/${file.name}';
      await File(srcPath).copy(destPath);

      // If JSX/TSX/Vue — wrap in a runtime that handles it
      final finalPath = (ext == 'jsx' || ext == 'tsx')
          ? await _wrapJsx(destPath, file.name)
          : (ext == 'vue' || ext == 'svelte')
              ? await _wrapVue(destPath, file.name)
              : destPath;

      final app = LoadedApp(
        name: file.name.replaceAll(RegExp(r'\.\w+$'), ''),
        path: finalPath,
        type: ext,
        loadedAt: DateTime.now(),
      );

      setState(() {
        _apps.removeWhere((a) => a.name == app.name); // replace if exists
        _apps.insert(0, app);
        _loading = false;
      });

      await _saveApps();
      _openApp(app);

    } catch (e) {
      setState(() => _loading = false);
      _showError('Could not load file: $e');
    }
  }

  // ── JSX wrapper — injects Babel standalone so JSX runs in WebView ─────────

  Future<String> _wrapJsx(String srcPath, String fileName) async {
    final src = await File(srcPath).readAsString();
    final docsDir = await getApplicationDocumentsDirectory();
    final wrapped = '''<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #06080d; color: #b8cade; font-family: monospace; }
</style>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
$src

// Auto-mount if component named App exists
if (typeof App !== 'undefined') {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
}
</script>
</body>
</html>''';

    final wrappedPath = '${docsDir.path}/forge_apps/${fileName}_wrapped.html';
    await File(wrappedPath).writeAsString(wrapped);
    return wrappedPath;
  }

  // ── Vue/Svelte wrapper — CDN runtime ──────────────────────────────────────

  Future<String> _wrapVue(String srcPath, String fileName) async {
    final src = await File(srcPath).readAsString();
    final docsDir = await getApplicationDocumentsDirectory();
    final wrapped = '''<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #06080d; color: #b8cade; font-family: monospace; }
</style>
</head>
<body>
<div id="app"></div>
<script>
$src
</script>
</body>
</html>''';

    final wrappedPath = '${docsDir.path}/forge_apps/${fileName}_wrapped.html';
    await File(wrappedPath).writeAsString(wrapped);
    return wrappedPath;
  }

  // ── Open app in WebView ───────────────────────────────────────────────────

  void _openApp(LoadedApp app) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => ForgeViewer(app: app),
      ),
    );
  }

  void _deleteApp(LoadedApp app) {
    setState(() => _apps.remove(app));
    _saveApps();
    try { File(app.path).deleteSync(); } catch (_) {}
  }

  void _showError(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(msg), backgroundColor: const Color(0xFFFF4C6A)),
    );
  }

  // ── Build ─────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            // ── Header
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 32, 24, 0),
              child: Row(
                children: [
                  const Text('🔥', style: TextStyle(fontSize: 28)),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text('FORGE',
                        style: TextStyle(
                          color: _lotus,
                          fontSize: 18,
                          letterSpacing: 6,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text('load · run · install',
                        style: TextStyle(color: _muted, fontSize: 10, letterSpacing: 2),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 28),

            // ── Load button
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: GestureDetector(
                onTap: _loading ? null : _pickFile,
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  decoration: BoxDecoration(
                    border: Border.all(color: _lotus.withOpacity(0.5)),
                    borderRadius: BorderRadius.circular(8),
                    color: _lotus.withOpacity(0.06),
                  ),
                  child: Center(
                    child: _loading
                      ? const SizedBox(
                          width: 18, height: 18,
                          child: CircularProgressIndicator(
                            color: _lotus, strokeWidth: 2,
                          ),
                        )
                      : const Text(
                          '+ LOAD FILE',
                          style: TextStyle(
                            color: _lotus,
                            fontSize: 12,
                            letterSpacing: 4,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                  ),
                ),
              ),
            ),

            const SizedBox(height: 8),

            // ── Supported types label
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 24),
              child: Text(
                'HTML  ·  JSX  ·  TSX  ·  Vue  ·  JS  ·  Svelte',
                style: TextStyle(color: _muted, fontSize: 9, letterSpacing: 2),
              ),
            ),

            const SizedBox(height: 28),

            // ── Apps list
            if (_apps.isEmpty)
              Expanded(
                child: Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      Text('🌑', style: TextStyle(fontSize: 36)),
                      SizedBox(height: 12),
                      Text('NO APPS LOADED',
                        style: TextStyle(color: _muted, fontSize: 11, letterSpacing: 3),
                      ),
                    ],
                  ),
                ),
              )
            else
              Expanded(
                child: ListView.separated(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                  itemCount: _apps.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 10),
                  itemBuilder: (_, i) {
                    final app = _apps[i];
                    return _AppCard(
                      app: app,
                      onTap: () => _openApp(app),
                      onDelete: () => _deleteApp(app),
                    );
                  },
                ),
              ),
          ],
        ),
      ),
    );
  }
}

// ── App card ───────────────────────────────────────────────────────────────

class _AppCard extends StatelessWidget {
  final LoadedApp app;
  final VoidCallback onTap;
  final VoidCallback onDelete;

  const _AppCard({required this.app, required this.onTap, required this.onDelete});

  String get _icon {
    switch (app.type) {
      case 'jsx': case 'tsx': return '⚛';
      case 'vue': return '💚';
      case 'svelte': return '🧡';
      default: return '🌐';
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      onLongPress: () {
        showModalBottomSheet(
          context: context,
          backgroundColor: _surface,
          builder: (_) => SafeArea(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                ListTile(
                  leading: const Icon(Icons.delete_outline, color: Color(0xFFFF4C6A)),
                  title: const Text('Remove', style: TextStyle(color: _text)),
                  onTap: () { Navigator.pop(context); onDelete(); },
                ),
              ],
            ),
          ),
        );
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          color: _surface,
          border: Border.all(color: _border),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          children: [
            Text(_icon, style: const TextStyle(fontSize: 22)),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(app.name,
                    style: const TextStyle(color: _text, fontSize: 13, letterSpacing: 1),
                  ),
                  const SizedBox(height: 2),
                  Text(app.type.toUpperCase(),
                    style: const TextStyle(color: _muted, fontSize: 9, letterSpacing: 2),
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: _muted, size: 18),
          ],
        ),
      ),
    );
  }
}

// ── WebView viewer ─────────────────────────────────────────────────────────

class ForgeViewer extends StatefulWidget {
  final LoadedApp app;
  const ForgeViewer({super.key, required this.app});

  @override
  State<ForgeViewer> createState() => _ForgeViewerState();
}

class _ForgeViewerState extends State<ForgeViewer> {
  InAppWebViewController? _webCtrl;
  bool _loading = true;

  @override
  Widget build(BuildContext context) {
    final fileUri = Uri.file(widget.app.path);

    return Scaffold(
      backgroundColor: _bg,
      body: SafeArea(
        child: Column(
          children: [

            // ── Mini top bar
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              color: _surface,
              child: Row(
                children: [
                  GestureDetector(
                    onTap: () => Navigator.pop(context),
                    child: const Text('← FORGE',
                      style: TextStyle(color: _lotus, fontSize: 11, letterSpacing: 2),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Text(widget.app.name,
                      style: const TextStyle(color: _muted, fontSize: 11, letterSpacing: 1),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  // Reload
                  GestureDetector(
                    onTap: () => _webCtrl?.reload(),
                    child: const Text('↺',
                      style: TextStyle(color: _muted, fontSize: 18),
                    ),
                  ),
                ],
              ),
            ),

            // ── WebView
            Expanded(
              child: Stack(
                children: [
                  InAppWebView(
                    initialUrlRequest: URLRequest(url: WebUri.uri(fileUri)),
                    initialSettings: InAppWebViewSettings(
                      javaScriptEnabled: true,
                      allowFileAccessFromFileURLs: true,
                      allowUniversalAccessFromFileURLs: true,
                      mediaPlaybackRequiresUserGesture: false,
                      allowsInlineMediaPlayback: true,
                      // localStorage persists between sessions
                      databaseEnabled: true,
                      domStorageEnabled: true,
                    ),
                    onWebViewCreated: (ctrl) => _webCtrl = ctrl,
                    onLoadStop: (_, __) => setState(() => _loading = false),
                    onPermissionRequest: (_, request) async {
                      // Auto-grant mic + camera inside Forge
                      return PermissionResponse(
                        resources: request.resources,
                        action: PermissionResponseAction.GRANT,
                      );
                    },
                  ),
                  if (_loading)
                    const Center(
                      child: CircularProgressIndicator(color: _lotus, strokeWidth: 2),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
