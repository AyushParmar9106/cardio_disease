# Cardiovascular Disease Prediction System

An advanced full-stack application using **Next.js** for the frontend and **FastAPI** with **Scikit-Learn** for the backend to predict cardiovascular disease risk.

## Project Structure

- **root**: Next.js application (Frontend)
- **api/**: FastAPI server (Backend)

## 🚀 How to Run Locally

You must run the Frontend and Backend separately in two different terminals.

### 1. Start the Backend (FastAPI)

1. Open a terminal (in the project root) and install dependencies:
   ```bash
   pip install -r api/requirements.txt
   ```
2. Run the server:
   ```bash
   python api/index.py
   ```
   The backend will start at `http://0.0.0.0:8000`.

### 2. Start the Frontend (Next.js)

1. Open a **new** terminal (in the project root) and install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
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
