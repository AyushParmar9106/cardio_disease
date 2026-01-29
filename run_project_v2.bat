@echo off
echo Starting CardioGuard AI...

echo.
echo ==========================================
echo Starting Backend (FastAPI) on Port 8000...
echo ==========================================
start "CardioGuard Backend" cmd /k "cd Backend && python -m uvicorn api:app --reload"

echo.
echo ==========================================
echo Starting Frontend (Next.js) on Port 3000...
echo ==========================================
start "CardioGuard Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Waiting for servers to start (10 seconds)...
timeout /t 10

echo.
echo ==========================================
echo Opening Application in Default Browser...
echo ==========================================
start http://localhost:3000

echo.
echo If the browser does not open, please visit:
echo http://localhost:3000
echo.
pause
