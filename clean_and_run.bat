@echo off
echo ==========================================
echo      CardioGuard Fix & Run Tool
echo ==========================================
echo.
echo This script will:
echo 1. Stop any running Node/Python processes (optional check)
echo 2. Clear the Frontend cache (.next folder)
echo 3. Start the project
echo.
echo IMPORTANT: Please make sure you have closed any other 
echo terminal windows running the project before continuing!
echo.
pause

cd frontend
echo.
echo Cleaning .next cache...
if exist .next (
    rmdir /s /q .next
    echo Cache deleted.
) else (
    echo Cache already clean.
)
cd ..

echo.
echo Starting Project...
call run_project_v2.bat
