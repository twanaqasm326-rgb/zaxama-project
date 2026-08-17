@echo off
setlocal
title FAKHAMA DECOR - Digital Showroom Dev Server
cd /d "%~dp0"

echo ============================================================
echo   FAKHAMA DECOR - IMMERSIVE EDITORIAL SHOWROOM
echo   Development Server Launcher
echo ============================================================
echo.

:: 1. Verify Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 goto :NO_NODE

:: 2. Verify npm is installed
where npm >nul 2>&1
if %errorlevel% neq 0 goto :NO_NPM

:: 3. Verify node_modules exists
if not exist "node_modules\" goto :INSTALL_DEPS

:DEPS_READY
echo [STATUS] Node.js version:
node -v
echo [STATUS] npm version:
call npm -v
echo.
echo ============================================================
echo   Starting Vite Development Server...
echo   Target Local URL: http://localhost:5173/
echo   Press Ctrl+C or run stop_server.bat to stop the server.
echo ============================================================
echo.

:: 4. Run Vite dev server via existing npm script
call npm run dev

pause
exit /b 0

:NO_NODE
echo [ERROR] Node.js is not detected in your PATH.
echo Please install Node.js v18 or newer from nodejs.org
echo.
pause
exit /b 1

:NO_NPM
echo [ERROR] npm is not detected in your PATH.
echo.
pause
exit /b 1

:INSTALL_DEPS
echo [INFO] node_modules folder not found. Installing dependencies...
call npm install
if %errorlevel% neq 0 goto :INSTALL_FAIL
goto :DEPS_READY

:INSTALL_FAIL
echo [ERROR] npm install failed.
pause
exit /b 1
