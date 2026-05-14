🖥️ QUICK START - BUILD DARK SOULS I GUIDE .EXE

═══════════════════════════════════════════════════════════════

## ⚡ FASTEST WAY TO BUILD .EXE (Windows)

### Step 1: Install Rust (5 minutes)
1. Go to: https://rustup.rs/
2. Download and run installer
3. Follow prompts (default settings OK)
4. Close and reopen terminal
5. Verify: `cargo --version`

### Step 2: Install C++ Build Tools (10 minutes)
1. Go to: https://visualstudio.microsoft.com/visual-cpp-build-tools/
2. Download installer
3. Run installer
4. Select: "Desktop development with C++"
5. Click Install
6. Restart computer (if prompted)

### Step 3: Build .EXE (10-15 minutes)
1. Open Command Prompt in project folder
2. Double-click: `build-desktop.bat`
3. Wait for build to complete
4. Success message will appear

### Step 4: Find Your .EXE
Location: `apps/desktop/src-tauri/target/release/`

Files created:
- ✓ Dark Souls I Guide.exe (executable)
- ✓ Dark Souls I Guide_1.0.0_x64_en-US.msi (installer)
- ✓ Dark Souls I Guide_1.0.0_x64-setup.exe (NSIS installer)

═══════════════════════════════════════════════════════════════

## 🎯 MANUAL BUILD (If script doesn't work)

```bash
# Step 1: Build web app
npm run build -w apps/web

# Step 2: Go to desktop folder
cd apps/desktop

# Step 3: Build with Tauri
npm run tauri build

# Step 4: Wait 10-15 minutes...
# Then check target/release/ for .exe
```

═══════════════════════════════════════════════════════════════

## 📦 DISTRIBUTION OPTIONS

### Option A: Direct .EXE (Easiest)
- File: `Dark Souls I Guide.exe`
- Size: ~150MB
- Users: Run directly, no installation
- Share on: GitHub, itch.io, Dropbox

### Option B: MSI Installer (Professional)
- File: `Dark Souls I Guide_1.0.0_x64_en-US.msi`
- Size: ~60MB
- Users: Professional installer experience
- Good for: Corporate/enterprise

### Option C: NSIS Installer (Recommended)
- File: `Dark Souls I Guide_1.0.0_x64-setup.exe`
- Size: ~70MB
- Users: Create shortcuts, Add to Start menu
- Good for: End users

═══════════════════════════════════════════════════════════════

## ✅ PRE-BUILD CHECKLIST

Before building, make sure:

[ ] Backend is NOT running (close terminal)
[ ] Web app is NOT running (close terminal)
[ ] Desktop app is NOT running (close terminal)
[ ] You have 5GB free disk space
[ ] Rust installed: `cargo --version`
[ ] C++ Build Tools installed (Windows)
[ ] Node 18+: `node --version`
[ ] npm updated: `npm --version`

═══════════════════════════════════════════════════════════════

## 🚀 AFTER SUCCESSFUL BUILD

### Test Your .EXE
1. Navigate to: `apps/desktop/src-tauri/target/release/`
2. Double-click: `Dark Souls I Guide.exe`
3. Should open Dark Souls I Guide application
4. Test all features work

### Share With Others
1. Share the .exe file via:
   - Email
   - GitHub Releases
   - itch.io
   - Dropbox/Drive
   - Your website

2. Or use installer for better experience:
   - Share MSI for IT admins
   - Share NSIS .exe for regular users

### Create GitHub Release
1. Go to: GitHub repository > Releases
2. Click: "Create new release"
3. Upload files:
   - Dark Souls I Guide.exe
   - Dark Souls I Guide_1.0.0_x64-setup.exe
4. Add version notes
5. Publish

═══════════════════════════════════════════════════════════════

## ⚠️ COMMON ISSUES & SOLUTIONS

### Issue: "Rust not found"
✓ Solution: Install from https://rustup.rs/
✓ Restart terminal after install

### Issue: "C++ Build Tools missing" (Windows)
✓ Solution: Install Visual Studio Build Tools
✓ Select "Desktop C++" workload

### Issue: "Build fails halfway"
✓ Solution: Close other apps to free RAM
✓ Try again (first build is slow)

### Issue: "Where's my .EXE?"
✓ Location: apps/desktop/src-tauri/target/release/
✓ Look for: Dark Souls I Guide.exe

### Issue: ".EXE won't start"
✓ Check Windows Event Viewer for errors
✓ Try running as Administrator
✓ Ensure backend API accessible

═══════════════════════════════════════════════════════════════

## 📊 BUILD TIME EXPECTATIONS

First Build:
- Compiling Rust: 10-15 minutes
- Building app: 5 minutes
- Total: 15-20 minutes

Subsequent Builds:
- Only changes compiled: 2-3 minutes
- Total: 3-5 minutes

═══════════════════════════════════════════════════════════════

## 🎮 FEATURES IN DESKTOP APP

✓ All web features work in desktop
✓ Better performance than web
✓ Can be installed like desktop app
✓ Windows Start menu integration
✓ Native window controls

═══════════════════════════════════════════════════════════════

## 📝 BUILD SCRIPT CONTENT

File: build-desktop.bat (auto-run)

What it does:
1. Checks Rust installation
2. Builds web app (production)
3. Builds Tauri desktop app
4. Creates .exe and installers
5. Shows success message with locations

═══════════════════════════════════════════════════════════════

## 🔧 CUSTOMIZE BEFORE BUILDING

Edit: apps/desktop/tauri.conf.json

Change app name:
```json
"productName": "Your App Name"
```

Change window size:
```json
"width": 1400,
"height": 900
```

Change version:
```json
"version": "1.1.0"
```

═══════════════════════════════════════════════════════════════

## 🎯 NEXT STEPS

1. Install Rust: https://rustup.rs/ (5 min)
2. Install C++ Build Tools (10 min)
3. Run build-desktop.bat script
4. Wait 15-20 minutes
5. Test .exe from target/release/
6. Share with users!

═══════════════════════════════════════════════════════════════

Questions? Check BUILD_DESKTOP_GUIDE.md for detailed info!

Ready? Run: build-desktop.bat 🚀
