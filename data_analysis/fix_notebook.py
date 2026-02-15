import nbformat
from nbformat.v4 import new_code_cell, new_markdown_cell

notebook_path = 'Cardio.ipynb'

# Read the notebook
try:
    with open(notebook_path, 'r', encoding='utf-8') as f:
        nb = nbformat.read(f, as_version=4)
except Exception as e:
    print(f"Error reading notebook: {e}")
    exit()

# Find the index of "Step 25"
step_25_index = -1
for i, cell in enumerate(nb.cells):
    if "Step 25: Final DataFrame Assembly" in cell.source or "Step 25: Final Processed DataFrame" in cell.source:
        step_25_index = i
        # We want to keep Step 25, so we will cut after it.
        # Check if the next cell is the code for Step 25
        if i + 1 < len(nb.cells) and nb.cells[i+1].cell_type == 'code':
             step_25_index = i + 1
        break

if step_25_index != -1:
    print(f"Found Step 25 at index {step_25_index}. Truncating notebook after this cell.")
    nb.cells = nb.cells[:step_25_index+1]
else:
    print("Step 25 not found. Appending to the end (this might still result in duplicates if not careful, but assuming the user wants to overwrite/fix).")
    # If not found, we really should find where the duplicates start. 
    # Let's try to look for Step 26 and cut before it if it exists.
    for i, cell in enumerate(nb.cells):
        if "Step 26: Data Preparation" in cell.source:
            print(f"Found existing Step 26 at index {i}. Truncating before it.")
            nb.cells = nb.cells[:i]
            break

# Define new cells
cells_to_add = []

# Section 1: Data Preparation
cells_to_add.append(new_markdown_cell("# Step 26: Data Preparation for Modeling\nDefine Features (X) and Target (y), then split into Train and Test sets."))
cells_to_add.append(new_code_cell("""
from sklearn.model_selection import train_test_split

# Features and Target
X = df_cleaned.drop(columns=['cardio'])
y = df_cleaned['cardio']

# Train-Test Split (80% Train, 20% Test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training shape: {X_train.shape}")
print(f"Testing shape: {X_test.shape}")
"""))

# Section 2: Model Training
cells_to_add.append(new_markdown_cell("# Step 27: Train Baseline Models\nWe will train Logistic Regression, Random Forest, Decision Tree, KNN, and Naive Bayes."))
cells_to_add.append(new_code_cell("""
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Initialize models
models = {
    "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
    "Random Forest": RandomForestClassifier(random_state=42),
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "KNN": KNeighborsClassifier(),
    "Naive Bayes": GaussianNB()
}

results = []

print("Training models...")
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    
    # Calculate probabilities for ROC-AUC if supported
    if hasattr(model, "predict_proba"):
        y_prob = model.predict_proba(X_test)[:, 1] 
        roc = roc_auc_score(y_test, y_prob)
    else:
        roc = 0 # KNN might not support predict_proba in standard call without setup, or others. 
                # Actually KNN does support it. This is just a safeguard.
    
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    
    results.append({
        "Model": name,
        "Accuracy": acc,
        "Precision": prec,
        "Recall": rec,
        "F1 Score": f1,
        "ROC AUC": roc
    })
    print(f"{name} trained. Accuracy: {acc:.4f}")
"""))

# Section 3: Model Comparison
cells_to_add.append(new_markdown_cell("# Step 28: Model Comparison\nCompare the performance metrics of the trained models."))
# Ensure pandas is available or use the results list directly if preferred, but DataFrame is better.
cells_to_add.append(new_code_cell("""
results_df = pd.DataFrame(results)
print(results_df)

# Visualize Accuracy Comparison
plt.figure(figsize=(10, 6))
sns.barplot(x='Accuracy', y='Model', data=results_df, palette='viridis')
plt.title('Model Accuracy Comparison')
plt.xlim(0, 1)
plt.show()
"""))

# Section 4: Hyperparameter Tuning
cells_to_add.append(new_markdown_cell("# Step 29: Hyperparameter Tuning (Random Forest)\nOptimize the Random Forest model using GridSearchCV."))
cells_to_add.append(new_code_cell("""
from sklearn.model_selection import GridSearchCV
# Make sure RandomForestClassifier is known if run independently, though it was imported in Step 27.
from sklearn.ensemble import RandomForestClassifier

# Define parameter grid
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20],
    'min_samples_split': [2, 5, 10]
}

# Initialize GridSearchCV
rf = RandomForestClassifier(random_state=42)
grid_search = GridSearchCV(estimator=rf, param_grid=param_grid, cv=3, n_jobs=-1, verbose=1, scoring='accuracy')

# Fit GridSearchCV
print("Starting Hyperparameter Tuning...")
grid_search.fit(X_train, y_train)

# Best Model
best_rf = grid_search.best_estimator_
print(f"Best Parameters: {grid_search.best_params_}")
print(f"Best Cross-Val Accuracy: {grid_search.best_score_:.4f}")
"""))

# Section 5: Final Evaluation
cells_to_add.append(new_markdown_cell("# Step 30: Final Evaluation\nEvaluate the tuned Random Forest model on the test set."))
cells_to_add.append(new_code_cell("""
from sklearn.metrics import confusion_matrix

# Predict on Test Set
y_final_pred = best_rf.predict(X_test)

# Final Metrics
final_acc = accuracy_score(y_test, y_final_pred)
final_f1 = f1_score(y_test, y_final_pred)
print(f"Final Tuned Random Forest Accuracy: {final_acc:.4f}")
print(f"Final Tuned Random Forest F1 Score: {final_f1:.4f}")

# Confusion Matrix
plt.figure(figsize=(6, 5))
cm = confusion_matrix(y_test, y_final_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title('Confusion Matrix (Tuned Random Forest)')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.show()
"""))

# Section 6: Save Model
cells_to_add.append(new_markdown_cell("# Step 31: Save Model\nSave the final trained model for future use."))
cells_to_add.append(new_code_cell("""
import joblib
joblib.dump(best_rf, 'cardio_model_final.pkl')
print("Model saved to 'cardio_model_final.pkl'")
"""))

# Append cells
nb.cells.extend(cells_to_add)

# Write back
with open(notebook_path, 'w', encoding='utf-8') as f:
    nbformat.write(nb, f)

print("Notebook fixed and updated successfully.")
