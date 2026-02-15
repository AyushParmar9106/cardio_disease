from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
from utils import preprocess_input

from fastapi.staticfiles import StaticFiles
import os

app = FastAPI(title="Cardio Risk API", version="1.0", root_path="/api")

# Mount the current directory to serve static chart images
# We use os.path.dirname(__file__) to serve files from the running directory (api)
app.mount("/charts", StaticFiles(directory=os.path.dirname(__file__)), name="charts")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    # Use relative path for Vercel deployment
    base_dir = os.path.dirname(__file__)
    model_path = os.path.join(base_dir, 'cardio_model_final.pkl')
    scaler_path = os.path.join(base_dir, 'scaler.pkl')
    
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    print("Model and Scaler loaded successfully.")
except Exception as e:
    print(f"Error loading model/scaler: {e}")
    model = None
    scaler = None

class PatientData(BaseModel):
    age: int 
    gender: int 
    height: int 
    weight: float 
    ap_hi: int 
    ap_lo: int 
    cholesterol: int 
    gluc: int 
    smoke: int 
    alco: int 
    active: int 

@app.get("/")
def home():
    return {"message": "Cardio Risk Prediction API is running."}

@app.post("/predict")
def predict_risk(data: PatientData):
    if not model or not scaler:
        raise HTTPException(status_code=500, detail="Model not loaded.")
    
    input_data = data.dict()
    df = pd.DataFrame([input_data])
    
    df['age_years'] = df['age'] 
    
    df['bmi'] = df['weight'] / ((df['height'] / 100) ** 2)
    
    features = ['age_years', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 
                'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'bmi']
    
    try:
        X = df[features]
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing feature: {e}")
        
    X_scaled = scaler.transform(X)
    
    prediction = model.predict(X_scaled)[0]
    probability = model.predict_proba(X_scaled)[0][1] 
    
    # Generate Personalized Insights (Backend Logic)
    risk_factors = []
    
    # 1. BMI Analysis
    bmi = df['bmi'].values[0]
    if bmi > 30:
        risk_factors.append({"factor": "BMI", "value": f"{bmi:.1f}", "status": "Obese", "severity": "High"})
    elif bmi > 25:
        risk_factors.append({"factor": "BMI", "value": f"{bmi:.1f}", "status": "Overweight", "severity": "Medium"})
        
    # 2. Blood Pressure Analysis
    ap_hi = input_data['ap_hi']
    ap_lo = input_data['ap_lo']
    if ap_hi > 140 or ap_lo > 90:
        risk_factors.append({"factor": "Blood Pressure", "value": f"{ap_hi}/{ap_lo}", "status": "Hypertension", "severity": "High"})
    elif ap_hi > 120 and ap_lo > 80:
        risk_factors.append({"factor": "Blood Pressure", "value": f"{ap_hi}/{ap_lo}", "status": "Elevated", "severity": "Low"})
        
    # 3. Age Analysis
    age_years = input_data['age']
    if age_years > 60:
        risk_factors.append({"factor": "Age", "value": f"{age_years}", "status": "Senior", "severity": "Medium"})
        
    # 4. Cholesterol & Glucose (Categorical)
    chol_map = {1: "Normal", 2: "Above Normal", 3: "High"}
    gluc_map = {1: "Normal", 2: "Above Normal", 3: "High"}
    
    chol = input_data['cholesterol']
    if chol > 1:
        risk_factors.append({"factor": "Cholesterol", "value": chol_map[chol], "status": "High Levels", "severity": "High" if chol == 3 else "Medium"})

    gluc = input_data['gluc']
    if gluc > 1:
        risk_factors.append({"factor": "Glucose", "value": gluc_map[gluc], "status": "High Levels", "severity": "High" if gluc == 3 else "Medium"})
        
    # 5. Lifestyle
    if input_data['smoke'] == 1:
        risk_factors.append({"factor": "Smoking", "value": "Yes", "status": "Smoker", "severity": "High"})
    if input_data['alco'] == 1:
        risk_factors.append({"factor": "Alcohol", "value": "Yes", "status": "Consumer", "severity": "Medium"})
    if input_data['active'] == 0:
        risk_factors.append({"factor": "Activity", "value": "No", "status": "Sedentary", "severity": "High"})

    return {
        "risk_prediction": int(prediction),
        "risk_probability": float(probability),
        "message": "High Risk" if prediction == 1 else "Low Risk",
        "analysis": {
            "bmi": float(f"{bmi:.1f}"),
            "risk_factors": risk_factors
        }
    }

@app.get("/model-info")
def get_model_info():
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded.")
    
    # Feature names matching the training columns
    features = ['Age', 'Gender', 'Height', 'Weight', 'AP Hi', 'AP Lo', 
                'Cholesterol', 'Glucose', 'Smoke', 'Alcohol', 'Active', 'BMI']
    
    # Get feature importances
    importances = model.feature_importances_
    
    # Create a list of dictionaries for easier frontend consumption
    feature_importance_list = [
        {"feature": name, "importance": float(imp)} 
        for name, imp in zip(features, importances)
    ]
    
    # Sort by importance descending
    feature_importance_list.sort(key=lambda x: x['importance'], reverse=True)
    
    return {
        "model_type": "Random Forest Classifier",
        "accuracy": 0.73, 
        "feature_importances": feature_importance_list
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
