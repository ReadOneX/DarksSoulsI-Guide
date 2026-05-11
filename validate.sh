#!/bin/bash

echo "=== Dark Souls I Guide - Build Validation ==="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
PASSED=0
FAILED=0

# Function to check test result
check_result() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ $1${NC}"
    ((PASSED++))
  else
    echo -e "${RED}✗ $1${NC}"
    ((FAILED++))
  fi
}

echo "1. Building web application..."
npm run build -w apps/web > /dev/null 2>&1
check_result "Web app build"

echo ""
echo "2. Type checking web application..."
npm run type-check -w apps/web > /dev/null 2>&1
check_result "Web app TypeScript"

echo ""
echo "3. Building backend application..."
npm run build -w backend > /dev/null 2>&1
check_result "Backend build"

echo ""
echo "4. Type checking backend application..."
npm run type-check -w backend > /dev/null 2>&1
check_result "Backend TypeScript"

echo ""
echo "5. Checking type definitions..."
npm run type-check -w packages/types > /dev/null 2>&1
check_result "Types package"

echo ""
echo "6. Checking shared utilities..."
npm run type-check -w packages/shared > /dev/null 2>&1
check_result "Shared package"

echo ""
echo "=== Summary ==="
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}All validations passed!${NC}"
  exit 0
else
  echo -e "${RED}Some validations failed!${NC}"
  exit 1
fi
