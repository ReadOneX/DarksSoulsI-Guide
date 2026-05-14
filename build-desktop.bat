@echo off
REM Dark Souls I Guide - Desktop Build Script for Windows (.exe)

echo.
echo ======================================
echo Dark Souls I Guide - Desktop Build
echo ======================================
echo.

REM Check if Rust is installed
where cargo >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo.
  echo ERROR: Rust is not installed!
  echo.
  echo Please install Rust from: https://rustup.rs/
  echo.
  echo After installing Rust, run this script again.
  echo.
  pause
  exit /b 1
)

echo Step 1: Checking Rust installation...
cargo --version
echo.

echo Step 2: Building web app first...
call npm run build -w apps/web
if %ERRORLEVEL% neq 0 (
  echo ERROR: Web app build failed!
  pause
  exit /b 1
)
echo Web app build successful!
echo.

echo Step 3: Building Tauri desktop app...
echo This may take 5-10 minutes on first build...
echo.
cd apps/desktop
call npm run tauri build
if %ERRORLEVEL% neq 0 (
  echo ERROR: Tauri build failed!
  cd ..\..\
  pause
  exit /b 1
)
cd ..\..\

echo.
echo ======================================
echo BUILD SUCCESSFUL!
echo ======================================
echo.
echo Your .exe file has been created at:
echo apps/desktop/src-tauri/target/release/Dark Souls I Guide.exe
echo.
echo Installer files:
echo - MSI Installer: apps/desktop/src-tauri/target/release/bundle/msi/
echo - NSIS Installer: apps/desktop/src-tauri/target/release/bundle/nsis/
echo.
echo You can now:
echo 1. Run the .exe directly
echo 2. Use the MSI installer to install on other machines
echo 3. Distribute the executables
echo.
pause
