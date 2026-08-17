@echo off
setlocal enabledelayedexpansion
title FAKHAMA DECOR - Stop Dev Server
cd /d "%~dp0"

echo ============================================================
echo   FAKHAMA DECOR - IMMERSIVE EDITORIAL SHOWROOM
echo   Development Server Stopper
echo ============================================================
echo.

set "FOUND_SERVER=0"

for %%P in (5173 5174 5175) do (
    for /f "usebackq tokens=*" %%A in (`powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort %%P -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique" 2^>nul`) do (
        set "PID=%%A"
        if defined PID (
            if not "!PID!"=="0" (
                echo [INFO] Found server process on port %%P - PID !PID!
                echo [ACTION] Terminating process tree for PID !PID!...
                taskkill /F /T /PID !PID! >nul 2>&1
                if !errorlevel! equ 0 (
                    echo [SUCCESS] Vite server on port %%P - PID !PID! successfully stopped.
                    set "FOUND_SERVER=1"
                ) else (
                    echo [WARN] Could not terminate PID !PID!
                )
            )
        )
    )
)

echo.
if "%FOUND_SERVER%"=="0" (
    echo [INFO] No active FAKHAMA DECOR server found on ports 5173, 5174, or 5175.
    echo [STATUS] Server is already stopped.
) else (
    echo [STATUS] Development server stopped successfully.
)

echo.
echo ============================================================
echo   Done.
echo ============================================================
timeout /t 3 >nul 2>&1
exit /b 0
