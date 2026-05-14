#!/bin/bash

# Dark Souls I Guide - Desktop Build Script for Linux/macOS

echo ""
echo "======================================"
echo "Dark Souls I Guide - Desktop Build"
echo "======================================"
echo ""

# Check if Rust is installed
if ! command -v cargo &> /dev/null; then
  echo "ERROR: Rust is not installed!"
  echo ""
  echo "Please install Rust from: https://rustup.rs/"
  echo ""
  echo "After installing Rust, run this script again."
  echo ""
  exit 1
fi

echo "Step 1: Checking Rust installation..."
cargo --version
echo ""

echo "Step 2: Building web app first..."
npm run build -w apps/web
if [ $? -ne 0 ]; then
  echo "ERROR: Web app build failed!"
  exit 1
fi
echo "Web app build successful!"
echo ""

echo "Step 3: Building Tauri desktop app..."
echo "This may take 5-10 minutes on first build..."
echo ""
cd apps/desktop
npm run tauri build
if [ $? -ne 0 ]; then
  echo "ERROR: Tauri build failed!"
  cd ../../
  exit 1
fi
cd ../../

echo ""
echo "======================================"
echo "BUILD SUCCESSFUL!"
echo "======================================"
echo ""
echo "Your executable has been created at:"
echo "apps/desktop/src-tauri/target/release/dark_souls_i_guide"
echo ""
echo "On macOS, the .app is at:"
echo "apps/desktop/src-tauri/target/release/bundle/macos/Dark Souls I Guide.app"
echo ""
echo "You can now:"
echo "1. Run the executable directly"
echo "2. Use the DMG/AppImage to install on other machines"
echo "3. Distribute the applications"
echo ""
