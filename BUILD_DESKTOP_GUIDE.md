# Dark Souls I Guide - Desktop Build Guide

## Prerequisites for Building .exe

### Windows Requirements

1. **Node.js 18+** (already installed)
   ```
   node --version
   ```

2. **Rust** (REQUIRED)
   - Download from: https://rustup.rs/
   - Run the installer and follow prompts
   - Verify installation:
     ```
     cargo --version
     ```

3. **Visual C++ Build Tools** (for Windows)
   - Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/
   - Run installer
   - Select "Desktop development with C++"
   - Complete installation

### macOS Requirements

1. **Xcode Command Line Tools**
   ```bash
   xcode-select --install
   ```

2. **Rust**
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

3. **Xcode** (full version, optional but recommended)

### Linux Requirements

1. **Rust**
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Build dependencies**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install libxdo-dev libssl-dev

   # Fedora
   sudo dnf install libxdo-devel openssl-devel
   ```

---

## Building .exe (Windows)

### Option 1: Using Batch Script (Easiest)

```bash
double-click: build-desktop.bat
```

The script will:
1. Check Rust installation
2. Build web app
3. Build Tauri app
4. Create .exe and installers

### Option 2: Manual Build

```bash
# Build web app first
npm run build -w apps/web

# Go to desktop directory
cd apps/desktop

# Build with Tauri CLI
npm run tauri build

# Or directly:
npx tauri build
```

### Build Output

After successful build, files are in:

```
apps/desktop/src-tauri/target/release/
├── Dark Souls I Guide.exe          (Executable)
├── bundle/
│   ├── msi/                        (MSI Installer)
│   │   └── Dark Souls I Guide_1.0.0_x64_en-US.msi
│   └── nsis/                       (NSIS Installer)
│       ├── Dark Souls I Guide_1.0.0_x64-setup.exe
│       └── dark-souls-i-guide_1.0.0_x64-setup.exe
```

---

## Distribution Options

### Option 1: Direct Executable
```
Dark Souls I Guide.exe
```
- No installation needed
- Run directly
- Users need .NET runtime (usually already installed)

### Option 2: MSI Installer
```
Dark Souls I Guide_1.0.0_x64_en-US.msi
```
- Professional installer
- Handles registry entries
- Good for enterprise distribution
- Run with: `msiexec /i "filename.msi"`

### Option 3: NSIS Installer
```
Dark Souls I Guide_1.0.0_x64-setup.exe
```
- User-friendly installer
- Creates Start menu shortcuts
- Adds uninstall option
- Recommended for end users

---

## Cross-Platform Build

### Build for Multiple Platforms

From Windows:
```bash
# Only builds for Windows
npm run tauri build
```

From macOS:
```bash
# Only builds for macOS
npm run tauri build
```

From Linux:
```bash
# Only builds for Linux
npm run tauri build
```

**Note**: Tauri doesn't cross-compile easily. To build for multiple platforms, build on each platform separately.

---

## Troubleshooting

### Error: "Rust not found"
- Install Rust from https://rustup.rs/
- Restart terminal after installation
- Verify: `cargo --version`

### Error: "C++ Build Tools not found" (Windows)
- Install Visual C++ Build Tools
- Or install Visual Studio with C++ support
- Restart terminal

### Error: "Could not find libxdo" (Linux)
- Install: `sudo apt-get install libxdo-dev libssl-dev`

### Error: "Frontend dist not found"
- Run `npm run build -w apps/web` first
- Ensure web app builds successfully

### Build takes very long
- First build compiles all Rust dependencies
- Subsequent builds are much faster
- This is normal (5-15 minutes)

### Memory issues
- Close unnecessary applications
- Build may need 2-4GB RAM
- Windows: check available disk space

---

## Build Options & Customization

### Change App Name
Edit in `apps/desktop/tauri.conf.json`:
```json
"productName": "Your New Name",
"identifier": "com.yourcompany.appname"
```

### Change Version
Edit in `apps/desktop/tauri.conf.json`:
```json
"version": "1.1.0"
```

### Change Window Size
Edit in `apps/desktop/tauri.conf.json`:
```json
"windows": [{
  "title": "Dark Souls I Guide",
  "width": 1400,
  "height": 900,
  "minWidth": 800,
  "minHeight": 600
}]
```

### Add Custom Icons
Replace these files:
- `apps/desktop/icons/32x32.png`
- `apps/desktop/icons/128x128.png`
- `apps/desktop/icons/icon.ico`

---

## Release Build

### Production Release

```bash
# Clean build
npm run clean

# Build web
npm run build -w apps/web

# Build desktop
cd apps/desktop
npm run tauri build

# Sign (optional, for code signing)
# Requires certificate setup
```

### Create Release Package

Zip the output files:
```
Dark Souls I Guide.exe
Dark Souls I Guide_1.0.0_x64_en-US.msi
```

---

## Publishing

### GitHub Releases
1. Go to repository releases
2. Create new release
3. Upload .exe and .msi files
4. Users can download directly

### Windows Store
- Requires Microsoft Store Developer Account
- Can submit MSI or AppX package
- More complex setup

### itch.io
- Easy self-publishing
- Upload .exe or installer
- Free hosting

---

## Next Steps

1. **Install Requirements**
   - Rust from https://rustup.rs/
   - Visual C++ Build Tools (Windows)

2. **Build Desktop**
   - Run: `build-desktop.bat` (Windows)
   - Or: `./build-desktop.sh` (Mac/Linux)

3. **Test Executable**
   - Run the .exe file
   - Test all features work
   - Check for errors

4. **Distribute**
   - Share .exe with users
   - Or use MSI/NSIS installer
   - Consider hosting on GitHub/itch.io

---

Good luck building! 🚀
