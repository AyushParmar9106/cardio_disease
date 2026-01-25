@echo off
echo Starting CardioGuard AI...

:: Start Backend in a new window
start "CardioGuard Backend" cmd /k "cd Backend && python -m uvicorn api:app --reload"

:: Start Frontend in a new window
start "CardioGuard Frontend" cmd /k "cd frontend && npm run dev"

echo Servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
