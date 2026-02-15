# Cardiovascular Disease Prediction System

An advanced full-stack application using **Next.js** for the frontend and **FastAPI** with **Scikit-Learn** for the backend to predict cardiovascular disease risk.

## Project Structure

- **Frontend**: Next.js application (React, TailwindCSS, Shadcn UI)
- **Backend**: FastAPI server (Python, Scikit-Learn, Pandas)

## 🚀 How to Run Locally

You must run the Frontend and Backend separately in two different terminals.

### 1. Start the Backend (FastAPI)

1. Open a terminal and navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies (if not already installed):
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   python -m uvicorn api:app --reload --port 8000
   ```
   The backend will start at `http://localhost:8000`.

### 2. Start the Frontend (Next.js)

1. Open a **new** terminal and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will start at `http://localhost:3000`.

## Features
- Real-time risk prediction
- Interactive data visualizations
- Mobile-responsive design
- Comprehensive analysis dashboard

## Deployment
This project is configured for deployment on Vercel. accurately routing API requests to the Python backend.
