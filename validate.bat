@echo off
REM Dark Souls I Guide - Build Validation Script for Windows

echo.
echo ===== Dark Souls I Guide - Build Validation =====
echo.

setlocal enabledelayedexpansion
set PASSED=0
set FAILED=0

REM 1. Build Web App
echo 1. Building web application...
call npm run build -w apps/web >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo [OK] Web app build
  set /A PASSED+=1
) else (
  echo [FAIL] Web app build
  set /A FAILED+=1
)

REM 2. Type Check Web App
echo 2. Type checking web application...
call npm run type-check -w apps/web >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo [OK] Web app TypeScript
  set /A PASSED+=1
) else (
  echo [FAIL] Web app TypeScript
  set /A FAILED+=1
)

REM 3. Build Backend
echo 3. Building backend application...
call npm run build -w backend >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo [OK] Backend build
  set /A PASSED+=1
) else (
  echo [FAIL] Backend build
  set /A FAILED+=1
)

REM 4. Type Check Backend
echo 4. Type checking backend application...
call npm run type-check -w backend >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo [OK] Backend TypeScript
  set /A PASSED+=1
) else (
  echo [FAIL] Backend TypeScript
  set /A FAILED+=1
)

REM 5. Verify Types Package
echo 5. Checking type definitions...
call npm run type-check -w packages/types >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo [OK] Types package
  set /A PASSED+=1
) else (
  echo [FAIL] Types package
  set /A FAILED+=1
)

REM 6. Verify Shared Package
echo 6. Checking shared utilities...
call npm run type-check -w packages/shared >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo [OK] Shared package
  set /A PASSED+=1
) else (
  echo [FAIL] Shared package
  set /A FAILED+=1
)

REM Summary
echo.
echo ===== Summary =====
echo Passed: %PASSED%
echo Failed: %FAILED%

if %FAILED% equ 0 (
  echo.
  echo All validations passed! Ready for deployment.
  exit /b 0
) else (
  echo.
  echo Some validations failed!
  exit /b 1
)
