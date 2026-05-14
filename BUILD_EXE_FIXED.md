🖥️ BUILD .EXE - FIXED INSTRUCTIONS

═══════════════════════════════════════════════════════════════

## ✅ FIXES APPLIED

1. ✓ Updated package.json with proper "tauri" script
2. ✓ Created new simplified build script: build-exe-simple.bat
3. ✓ Configured for proper Tauri build process

## 🚀 HOW TO BUILD NOW

### Prerequisites (Must do first!)

1. Install Rust from: https://rustup.rs/
   - Download installer
   - Run and follow prompts
   - Verify: Open Command Prompt, type: cargo --version

2. Install Visual C++ Build Tools
   - Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/
   - Run installer
   - Select: "Desktop development with C++"
   - Install and restart

3. Make sure Node.js and npm are installed
   - Verify: node --version (should be 18+)
   - Verify: npm --version (should be 9+)

### Building .EXE (3 Steps)

Step 1: Open Command Prompt
- Press: Windows Key + R
- Type: cmd
- Press: Enter

Step 2: Navigate to project
```
cd C:\Users\loq_q\OneDrive\Documents\DarksSoulsI-Guide
```

Step 3: Run build script
```
build-exe-simple.bat
```

Then wait 15-25 minutes for build to complete.

## 📍 WHERE'S MY .EXE?

After successful build, find files at:

```
apps/desktop/src-tauri/target/release/bundle/
├── msi/
│   └── Dark Souls I Guide_1.0.0_x64_en-US.msi
├── nsis/
│   └── Dark Souls I Guide_1.0.0_x64-setup.exe
└── (exe also in parent release folder)
```

## ⚠️ IF BUILD FAILS

Common issues & fixes:

1. "Rust not found"
   - Solution: Install from https://rustup.rs/
   - Restart Command Prompt after install

2. "C++ Build Tools not found" 
   - Solution: Install Visual Studio Build Tools
   - Select "Desktop C++" workload
   - Restart computer

3. "Build fails halfway"
   - Solution: 
     1. Close all other apps (free up RAM)
     2. Delete: apps/desktop/src-tauri/target
     3. Try again
     4. First build takes longer (Rust compilation)

4. "Node modules missing"
   - Solution: Run "npm install" first

## 📊 BUILD TIMELINE

First Build:
- npm install: 2-3 min
- Web build: 1-2 min
- Rust compilation: 10-15 min (FIRST TIME ONLY)
- Total: 15-25 minutes

Subsequent Builds:
- Only changes rebuild: 2-5 min

## 🎯 THREE BUILD OPTIONS

### Option 1: Direct Build (EASIEST)
```bash
build-exe-simple.bat
```

### Option 2: Manual Steps
```bash
npm install
npm run build -w apps/web
cd apps/desktop
npm run tauri build
```

### Option 3: Development Mode (For testing)
```bash
npm run dev:tauri -w apps/desktop
```

## 📦 DISTRIBUTION

After build, you get 3 types of files:

1. **Direct .EXE** (portable)
   - Run directly without installation
   - Good for testing
   - Share single file

2. **MSI Installer** (professional)
   - Enterprise/IT friendly
   - Registry integration
   - ~60MB

3. **NSIS Installer** (user-friendly)
   - Creates Start menu shortcuts
   - Professional look
   - Uninstall support
   - Recommended for end users

## ✅ QUICK CHECKLIST

Before building:
- [ ] Rust installed (cargo --version works)
- [ ] C++ Build Tools installed
- [ ] 5GB+ free disk space
- [ ] No servers running (close npm terminals)
- [ ] Node 18+ installed
- [ ] npm up to date

Then:
- [ ] Run: build-exe-simple.bat
- [ ] Wait patiently (15-25 min first time)
- [ ] Check apps/desktop/src-tauri/target/release/
- [ ] Find .exe and test it

## 🎮 AFTER SUCCESSFUL BUILD

1. Test the .exe
   - Find it in target/release/
   - Double-click to run
   - Test all features

2. Share it
   - Email the .exe to users
   - Upload to GitHub Releases
   - Host on itch.io
   - Use for distribution

3. Create installer
   - Share .msi or -setup.exe
   - Professional installation experience
   - Better for enterprise

## 🔧 TROUBLESHOOTING COMMANDS

Check what's blocking ports:
```bash
netstat -ano | findstr :3000
netstat -ano | findstr :3001
```

Kill process by PID:
```bash
taskkill /PID [number] /F
```

Clear npm cache:
```bash
npm cache clean --force
```

Reinstall dependencies:
```bash
rm -r node_modules
npm install
```

## 📞 NEED HELP?

1. Read: BUILD_DESKTOP_GUIDE.md (detailed)
2. Check: QUICK_BUILD_EXE.md (quick reference)
3. Run: build-exe-simple.bat (automated)

═══════════════════════════════════════════════════════════════

Ready to build? Follow the 3 steps above! 🚀
