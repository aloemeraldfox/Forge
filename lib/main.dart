import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'dart:convert';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await [Permission.microphone, Permission.camera].request();
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
const _muted    = Color(0xFF3A4A5E);
const _text     = Color(0xFFB8CADE);

class ForgeApp extends StatelessWidget {
  const ForgeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Lotus',
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
  final String path;
  final String type;
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

// ── Built-in library definitions ───────────────────────────────────────────

class BuiltinDef {
  final String name;
  final String assetPath;
  final String? componentName; // null = raw HTML asset, no JSX wrapping
  final Color color;
  final String glyph;

  const BuiltinDef({
    required this.name,
    required this.assetPath,
    this.componentName,
    required this.color,
    required this.glyph,
  });
}

const _builtins = [
  BuiltinDef(
    name: 'Lotus Scanner',
    assetPath: 'assets/builtin/lotus_scanner.html',
    color: Color(0xFFC084F5),
    glyph: '🪷',
  ),
  BuiltinDef(
    name: 'Egyptian',
    assetPath: 'assets/builtin/egyptianlibrary.jsx',
    componentName: 'EgyptianLibrary',
    color: Color(0xFFC8A040),
    glyph: '𓇯',
  ),
  BuiltinDef(
    name: 'Greek',
    assetPath: 'assets/builtin/greeklibrary.jsx',
    componentName: 'GreekLibrary',
    color: Color(0xFFC084F5),
    glyph: 'Θ',
  ),
  BuiltinDef(
    name: 'Norse',
    assetPath: 'assets/builtin/norselibrary.jsx',
    componentName: 'NorseLibrary',
    color: Color(0xFF7090C0),
    glyph: 'ᚱ',
  ),
  BuiltinDef(
    name: 'Celtic',
    assetPath: 'assets/builtin/celticlibrary.jsx',
    componentName: 'CelticLibrary',
    color: Color(0xFF7AB87A),
    glyph: 'ᚌ',
  ),
  BuiltinDef(
    name: 'Japanese',
    assetPath: 'assets/builtin/japaneselibrary.jsx',
    componentName: 'JapaneseLibrary',
    color: Color(0xFF4A7A9B),
    glyph: '神',
  ),
  BuiltinDef(
    name: 'Arcana',
    assetPath: 'assets/builtin/magicresearch.jsx',
    componentName: 'MagicResearch',
    color: Color(0xFFC8A96E),
    glyph: '⟡',
  ),
];

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
    final raw = prefs.getStringList('lotus_apps') ?? [];
    setState(() {
      _apps = raw
        .map((s) => LoadedApp.fromJson(jsonDecode(s)))
        .where((a) => File(a.path).existsSync())
        .toList();
    });
  }

  Future<void> _saveApps() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(
      'lotus_apps',
      _apps.map((a) => jsonEncode(a.toJson())).toList(),
    );
  }

  // ── File picker ──────────────────────────────────────────────────────────

  Future<void> _pickFile() async {
    setState(() => _loading = true);

    try {
      final result = await FilePicker.platform.pickFiles(
        type: FileType.any,   // FileType.custom breaks JSX — no MIME type on Android
        allowMultiple: false,
        withData: true,       // ensures bytes available for content:// URIs
      );

      if (result == null || result.files.isEmpty) {
        setState(() => _loading = false);
        return;
      }

      final file = result.files.single;
      final ext = (file.extension ?? file.name.split('.').last).toLowerCase();

      const supported = {'html', 'htm', 'jsx', 'tsx', 'js', 'vue', 'svelte'};
      if (!supported.contains(ext)) {
        setState(() => _loading = false);
        _showError('Unsupported type .$ext — load HTML, JSX, TSX, JS, Vue or Svelte');
        return;
      }

      final docsDir = await getApplicationDocumentsDirectory();
      final destDir = Directory('${docsDir.path}/forge_apps');
      await destDir.create(recursive: true);
      final destPath = '${destDir.path}/${file.name}';

      // Use bytes when path is null (content:// URIs from Drive, Downloads, etc.)
      if (file.path != null) {
        await File(file.path!).copy(destPath);
      } else if (file.bytes != null) {
        await File(destPath).writeAsBytes(file.bytes!);
      } else {
        throw Exception('Could not read file — try copying it to local storage first');
      }

      final finalPath = (ext == 'jsx' || ext == 'tsx')
          ? await _wrapJsx(destPath, file.name, null)
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
        _apps.removeWhere((a) => a.name == app.name);
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

  // ── Open a built-in library app ───────────────────────────────────────────

  Future<void> _openBuiltin(BuiltinDef def) async {
    setState(() => _loading = true);
    try {
      final src = await rootBundle.loadString(def.assetPath);

      final String html;
      final String cacheKey;

      if (def.componentName == null) {
        // Raw HTML built-in — use the asset as-is, no JSX wrapping needed.
        html = src;
        cacheKey = def.name.replaceAll(RegExp(r'[^a-zA-Z0-9_]'), '_');
      } else {
        // JSX built-in — strip imports and wrap with Babel/React runtime.
        String cleaned = src
          .replaceAll(RegExp("^import\\s+.*?from\\s+['\"].*?['\"];?\\s*\$", multiLine: true), '')
          .replaceAll(RegExp("^import\\s+['\"].*?['\"];?\\s*\$",             multiLine: true), '')
          .replaceFirst('export default function ${def.componentName}', 'function ${def.componentName}');
        html = _buildBuiltinHtml(cleaned, def.componentName!);
        cacheKey = def.componentName!;
      }

      final dir = await getApplicationDocumentsDirectory();
      final cacheDir = Directory('${dir.path}/forge_builtins');
      await cacheDir.create(recursive: true);
      final path = '${cacheDir.path}/$cacheKey.html';
      await File(path).writeAsString(html);

      setState(() => _loading = false);

      _openApp(LoadedApp(
        name: def.name,
        path: path,
        type: 'builtin',
        loadedAt: DateTime.now(),
      ));
    } catch (e) {
      setState(() => _loading = false);
      _showError('Could not open ${def.name}: $e');
    }
  }

  String _buildBuiltinHtml(String jsxSrc, String componentName) {
    return '''<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script>
window.storage = {
  get: function(key) {
    var v = localStorage.getItem(key);
    return Promise.resolve(v != null ? { value: v } : null);
  },
  set: function(key, value) {
    localStorage.setItem(key, value);
    return Promise.resolve();
  }
};
</script>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
// React hooks available as globals — allows code that imported them to work
const { useState, useEffect, useRef, useCallback, useMemo, useContext,
        useReducer, useLayoutEffect, useId, createContext, Fragment,
        forwardRef, memo, Children, cloneElement, createElement } = React;

$jsxSrc

const _mountRoot = ReactDOM.createRoot(document.getElementById('root'));
_mountRoot.render(<$componentName />);
</script>
</body>
</html>''';
  }

  // ── JSX wrapper ───────────────────────────────────────────────────────────

  Future<String> _wrapJsx(String srcPath, String fileName, String? componentName) async {
    final src = await File(srcPath).readAsString();
    final docsDir = await getApplicationDocumentsDirectory();

    // Strip all import/export-from statements — no bundler in browser context
    String cleaned = src
      .replaceAll(RegExp("^import\\s+.*?from\\s+['\"].*?['\"];?\\s*\$", multiLine: true), '')
      .replaceAll(RegExp("^import\\s+['\"].*?['\"];?\\s*\$",             multiLine: true), '')
      .replaceAll(RegExp(r"^export\s+\{[^}]*\}\s*;?\s*$",              multiLine: true), '');

    // Detect component name then strip the export default
    String mountComponent = componentName ?? 'App';

    // export default function Name
    final m1 = RegExp(r'export\s+default\s+function\s+(\w+)').firstMatch(cleaned);
    // export default class Name
    final m2 = RegExp(r'export\s+default\s+class\s+(\w+)').firstMatch(cleaned);
    // export default ArrowOrIdentifier
    final m3 = RegExp(r'export\s+default\s+(\w+)').firstMatch(cleaned);

    if (m1 != null) {
      mountComponent = m1.group(1)!;
      cleaned = cleaned.replaceFirst(m1.group(0)!, 'function $mountComponent');
    } else if (m2 != null) {
      mountComponent = m2.group(1)!;
      cleaned = cleaned.replaceFirst(m2.group(0)!, 'class $mountComponent');
    } else if (m3 != null) {
      mountComponent = m3.group(1)!;
      cleaned = cleaned.replaceFirst(m3.group(0)!, '');
    }

    // Strip any remaining bare 'export' keywords on named declarations
    cleaned = cleaned.replaceAll(RegExp(r'^export\s+(function|class|const|let|var)\s+', multiLine: true), r'$1 ');

    final wrapped = _buildBuiltinHtml(cleaned, mountComponent);
    final wrappedPath = '${docsDir.path}/forge_apps/${fileName}_wrapped.html';
    await File(wrappedPath).writeAsString(wrapped);
    return wrappedPath;
  }

  // ── Vue/Svelte wrapper ────────────────────────────────────────────────────

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
      MaterialPageRoute(builder: (_) => ForgeViewer(app: app)),
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
                  const Text('🪷', style: TextStyle(fontSize: 28)),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text('LOTUS',
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
                          child: CircularProgressIndicator(color: _lotus, strokeWidth: 2),
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

            const SizedBox(height: 6),

            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 24),
              child: Text(
                'HTML  ·  JSX  ·  TSX  ·  Vue  ·  JS  ·  Svelte',
                style: TextStyle(color: _muted, fontSize: 9, letterSpacing: 2),
              ),
            ),

            const SizedBox(height: 24),

            // ── Built-in library grid
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                children: [

                  const Text(
                    'LIBRARY',
                    style: TextStyle(color: _muted, fontSize: 9, letterSpacing: 3),
                  ),
                  const SizedBox(height: 10),

                  GridView.count(
                    crossAxisCount: 3,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    crossAxisSpacing: 8,
                    mainAxisSpacing: 8,
                    childAspectRatio: 1.65,
                    children: _builtins.map((def) => _BuiltinCard(
                      def: def,
                      onTap: _loading ? null : () => _openBuiltin(def),
                    )).toList(),
                  ),

                  if (_apps.isNotEmpty) ...[
                    const SizedBox(height: 28),
                    const Text(
                      'LOADED',
                      style: TextStyle(color: _muted, fontSize: 9, letterSpacing: 3),
                    ),
                    const SizedBox(height: 10),
                    ...List.generate(_apps.length, (i) {
                      final app = _apps[i];
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: _AppCard(
                          app: app,
                          onTap: () => _openApp(app),
                          onDelete: () => _deleteApp(app),
                        ),
                      );
                    }),
                  ],

                  const SizedBox(height: 20),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ── Built-in card ──────────────────────────────────────────────────────────

class _BuiltinCard extends StatelessWidget {
  final BuiltinDef def;
  final VoidCallback? onTap;

  const _BuiltinCard({required this.def, this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: def.color.withOpacity(0.06),
          border: Border.all(color: def.color.withOpacity(0.3)),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(def.glyph,
              style: TextStyle(
                fontSize: 20,
                color: def.color,
              ),
            ),
            const SizedBox(height: 4),
            Text(def.name.toUpperCase(),
              style: TextStyle(
                color: def.color.withOpacity(0.85),
                fontSize: 8,
                letterSpacing: 1.5,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
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
      case 'jsx': case 'tsx': case 'builtin': return '⚛';
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
                    child: const Text('← LOTUS',
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
                      databaseEnabled: true,
                      domStorageEnabled: true,
                    ),
                    onWebViewCreated: (ctrl) => _webCtrl = ctrl,
                    onLoadStop: (_, __) => setState(() => _loading = false),
                    onPermissionRequest: (_, request) async {
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
