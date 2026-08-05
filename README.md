# 🔥 Forge — Cloud Build

## Get the APK on your phone, no PC needed

### Step 1 — Create the repo (github.com in Chrome)
1. Go to **github.com** → sign in
2. Tap **+** → **New repository**
3. Name it `forge` → **Create repository**

### Step 2 — Upload files (still in Chrome)
On your new empty repo page:
1. Tap **uploading an existing file** (the link in the middle of the page)
2. Upload these files one by one (tap Upload, pick file, repeat):
   - `pubspec.yaml`
   - `lib/main.dart`
   - `android/app/src/main/AndroidManifest.xml`
   - `android/app/src/main/res/xml/provider_paths.xml`
   - `.github/workflows/build.yml`

> ⚠️ GitHub mobile can't create folders via upload.
> Use the **pencil ✏️ edit** trick: after uploading a file, rename it
> by typing the folder path before it e.g. `lib/main.dart`

### Step 3 — Watch it build
1. Tap the **Actions** tab on your repo
2. You'll see **Build Forge APK** running — takes ~5 min
3. When it says ✅ — tap it → scroll down → **Artifacts** → tap **Forge-APK**
4. It downloads a zip → inside is `app-release.apk`

### Step 4 — Install
1. Open the zip from your downloads
2. Tap `app-release.apk`
3. Allow unknown sources if prompted
4. Install → open Forge 🔥

---

## After that — never again
Every Lotus app is just:
**Make it in Claude → save HTML → open Forge → Load File → done**
