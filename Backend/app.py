import streamlit as st
import pandas as pd
import numpy as np
import joblib

# Page Configuration
st.set_page_config(
    page_title="Cardio Risk Prediction",
    page_icon="❤️",
    layout="centered"
)

# Load Model and Scaler
@st.cache_resource
def load_model_and_scaler():
    try:
        model = joblib.load('cardio_model_final.pkl')
        scaler = joblib.load('scaler.pkl')
        return model, scaler
    except Exception as e:
        st.error(f"Error loading model/scaler: {e}")
        return None, None

model, scaler = load_model_and_scaler()

# Title and Description
st.title("❤️ Cardiovascular Disease Risk Prediction")
st.write("Enter your health data below to get a risk assessment.")

# Input Form
with st.form("risk_form"):
    col1, col2 = st.columns(2)
    
    with col1:
        age_years = st.number_input("Age (years)", min_value=1, max_value=120, value=50)
        gender = st.selectbox("Gender", options=[1, 2], format_func=lambda x: "Female" if x == 1 else "Male")
        height = st.number_input("Height (cm)", min_value=50, max_value=250, value=170)
        weight = st.number_input("Weight (kg)", min_value=10.0, max_value=200.0, value=70.0)
        ap_hi = st.number_input("Systolic Blood Pressure (ap_hi)", min_value=50, max_value=250, value=120)
        ap_lo = st.number_input("Diastolic Blood Pressure (ap_lo)", min_value=30, max_value=150, value=80)

    with col2:
        cholesterol = st.selectbox("Cholesterol", options=[1, 2, 3], format_func=lambda x: {1: "Normal", 2: "Above Normal", 3: "High"}[x])
        gluc = st.selectbox("Glucose", options=[1, 2, 3], format_func=lambda x: {1: "Normal", 2: "Above Normal", 3: "High"}[x])
        smoke = st.selectbox("Smoking", options=[0, 1], format_func=lambda x: "Yes" if x == 1 else "No")
        alco = st.selectbox("Alcohol Intake", options=[0, 1], format_func=lambda x: "Yes" if x == 1 else "No")
        active = st.selectbox("Physical Activity", options=[0, 1], format_func=lambda x: "Yes" if x == 1 else "No")
    
    submitted = st.form_submit_button("Predict Risk")

if submitted:
    if not model or not scaler:
        st.error("Model is not loaded. Please check the backend configuration.")
    else:
        # Calculate derived features
        bmi = weight / ((height / 100) ** 2)
        
        # Prepare input data
        input_data = pd.DataFrame([{
            'age_years': age_years,
            'gender': gender,
            'height': height,
            'weight': weight,
            'ap_hi': ap_hi,
            'ap_lo': ap_lo,
            'cholesterol': cholesterol,
            'gluc': gluc,
            'smoke': smoke,
            'alco': alco,
            'active': active,
            'bmi': bmi
        }])
        
        # Scale features
        try:
            X_scaled = scaler.transform(input_data)
            
            # Predict
            prediction = model.predict(X_scaled)[0]
            probability = model.predict_proba(X_scaled)[0][1]
            
            # Display Results
            st.divider()
            st.subheader("Results")
            
            if prediction == 1:
                st.error(f"High Risk Detected (Probability: {probability:.1%})")
                st.write("Please consult a healthcare professional.")
            else:
                st.success(f"Low Risk (Probability: {probability:.1%})")
                st.write("Keep up the healthy lifestyle!")
            
            # Insights
            st.subheader("Personalized Insights")
            
            # BMI Analysis
            if bmi > 30:
                st.warning(f"**BMI: {bmi:.1f}** - Obese (High Risk Factor)")
            elif bmi > 25:
                st.info(f"**BMI: {bmi:.1f}** - Overweight")
            else:
                st.success(f"**BMI: {bmi:.1f}** - Normal Range")
            
            # BP Analysis
            if ap_hi > 140 or ap_lo > 90:
                st.warning(f"**Blood Pressure: {ap_hi}/{ap_lo}** - Hypertension (High Risk Factor)")
            elif ap_hi > 120 and ap_lo > 80:
                st.info(f"**Blood Pressure: {ap_hi}/{ap_lo}** - Elevated")
            else:
                st.success(f"**Blood Pressure: {ap_hi}/{ap_lo}** - Normal")
                
            # Lifestyle Analysis
            risk_factors = []
            if smoke == 1: risk_factors.append("Smoking")
            if alco == 1: risk_factors.append("Alcohol Consumption")
            if active == 0: risk_factors.append("Sedentary Lifestyle")
            if cholesterol > 1: risk_factors.append(f"Cholesterol: {{1: 'Normal', 2: 'Above Normal', 3: 'High'}}[cholesterol]") # Fixed map access
            if gluc > 1: risk_factors.append(f"Glucose: {{1: 'Normal', 2: 'Above Normal', 3: 'High'}}[gluc]") # Fixed map access
            
            if risk_factors:
                st.write("**Other Risk Factors Identified:**")
                for factor in risk_factors:
                    if "Normal" not in factor: # Simple filter to avoid showing normal levels if logic slipped
                         st.markdown(f"- {factor}")
            else:
                 st.write("No other significant lifestyle risk factors identified.")

        except Exception as e:
            st.error(f"An error occurred during prediction: {e}")
