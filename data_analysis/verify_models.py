import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
import joblib

# Load processed data
try:
    df = pd.read_csv('cardio_processed_final.csv', sep=';')
    print("Data loaded successfully.")
except FileNotFoundError:
    print("Error: cardio_processed_final.csv not found.")
    exit()

# Features and Target
# Excluding target 'cardio' and potentially the index if it was saved (it wasn't based on previous view)
X = df.drop(columns=['cardio'])
y = df['cardio']

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"Training shape: {X_train.shape}, Testing shape: {X_test.shape}")

# Model Dictionary
models = {
    "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
    "Random Forest": RandomForestClassifier(random_state=42),
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "KNN": KNeighborsClassifier(),
    "Naive Bayes": GaussianNB()
}

results = []

print("\n--- Training Baseline Models ---")
for name, model in models.items():
    print(f"Training {name}...")
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1] if hasattr(model, "predict_proba") else None
    
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    roc = roc_auc_score(y_test, y_prob) if y_prob is not None else 0
    
    results.append({
        "Model": name,
        "Accuracy": acc,
        "Precision": prec,
        "Recall": rec,
        "F1 Score": f1,
        "ROC AUC": roc
    })
    print(f"{name} - Accuracy: {acc:.4f}, F1: {f1:.4f}")

# Comparison
results_df = pd.DataFrame(results)
print("\n--- Model Comparison ---")
print(results_df)

# Hyperparameter Tuning (Random Forest)
print("\n--- Hyperparameter Tuning (Random Forest) ---")
# Using a smaller grid for speed in verification
param_grid = {
    'n_estimators': [50, 100],
    'max_depth': [None, 10],
    'min_samples_split': [2, 5]
}

rf = RandomForestClassifier(random_state=42)
grid_search = GridSearchCV(estimator=rf, param_grid=param_grid, cv=3, n_jobs=-1, verbose=1, scoring='accuracy')
grid_search.fit(X_train, y_train)

best_rf = grid_search.best_estimator_
print(f"Best Parameters: {grid_search.best_params_}")
print(f"Best Cross-Val Accuracy: {grid_search.best_score_:.4f}")

# Final Evaluation
y_final_pred = best_rf.predict(X_test)
final_acc = accuracy_score(y_test, y_final_pred)
print(f"Final Tuned RF Accuracy on Test: {final_acc:.4f}")

# Save Model
joblib.dump(best_rf, 'cardio_model_final.pkl')
print("Model saved to cardio_model_final.pkl")
