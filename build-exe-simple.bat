@echo off
REM Dark Souls I Guide - Desktop Build Script for Windows (.exe)
REM Simplified version that focuses on building

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
  echo Please install from: https://rustup.rs/
  echo.
  pause
  exit /b 1
)

echo Rust found!
cargo --version
echo.

REM Step 1: Install dependencies
echo Step 1: Installing dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
  echo ERROR: npm install failed!
  pause
  exit /b 1
)
echo Dependencies installed!
echo.

REM Step 2: Build web app
echo Step 2: Building web app (production)...
call npm run build -w apps/web
if %ERRORLEVEL% neq 0 (
  echo ERROR: Web app build failed!
  pause
  exit /b 1
)
echo Web app built successfully!
echo.

REM Step 3: Build desktop with Tauri
echo Step 3: Building desktop application...
echo This may take 10-20 minutes on first build...
echo Please wait patiently...
echo.

cd apps/desktop

REM Build with Tauri
echo Building Tauri app...
call npm run tauri build

if %ERRORLEVEL% neq 0 (
  echo.
  echo ERROR: Tauri build failed!
  echo.
  echo Try these steps:
  echo 1. Close this window
  echo 2. Delete: apps/desktop/src-tauri/target folder
  echo 3. Run build again
  echo.
  pause
  exit /b 1
)

cd ..\..\

echo.
echo ======================================
echo BUILD SUCCESSFUL!
echo ======================================
echo.

REM Show output locations
echo Your executable files are located at:
echo.
echo Executable:
echo   apps/desktop/src-tauri/target/release/dark_souls_i_guide.exe
echo.
echo Installers:
echo   apps/desktop/src-tauri/target/release/bundle/msi/
echo   apps/desktop/src-tauri/target/release/bundle/nsis/
echo.

echo Next steps:
echo 1. Test the .exe file
echo 2. Distribute to users
echo 3. Or use one of the installers for professional distribution
echo.
echo.

pause
