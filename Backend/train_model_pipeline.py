import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

DATA_PATH = 'cardio_train.csv'
MODEL_PATH = 'cardio_model_final.pkl'
SCALER_PATH = 'scaler.pkl'

def load_and_clean_data(filepath):
    print("Loading data...")
    df = pd.read_csv(filepath, sep=';')
    
    if 'id' in df.columns:
        df = df.drop(columns=['id'])
        
    df['age_years'] = (df['age'] / 365.25).round(1)
    df['bmi'] = df['weight'] / ((df['height'] / 100) ** 2)
    
    df = df[(df['ap_hi'] >= 50) & (df['ap_hi'] <= 250)]
    df = df[(df['ap_lo'] >= 30) & (df['ap_lo'] <= 150)]
    df = df[(df['bmi'] > 10) & (df['bmi'] < 60)]
    
    return df

def train_model():
    df = load_and_clean_data(DATA_PATH)
    
    features = ['age_years', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'bmi']
    target = 'cardio'
    
    X = df[features]
    y = df[target]
    
    print(f"Dataset shape after cleaning: {df.shape}")
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Scaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print("Training Random Forest...")
    rf = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    rf.fit(X_train_scaled, y_train)
    
    y_pred = rf.predict(X_test_scaled)
    acc = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {acc:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    print("Saving artifacts...")
    joblib.dump(rf, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)
    print(f"Model saved to {MODEL_PATH}")
    print(f"Scaler saved to {SCALER_PATH}")

if __name__ == "__main__":
    train_model()
