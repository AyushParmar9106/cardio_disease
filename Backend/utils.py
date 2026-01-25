import pandas as pd
import numpy as np

def calculate_bmi(weight, height_cm):
    height_m = height_cm / 100
    if height_m <= 0:
        return 0
    return weight / (height_m ** 2)

def preprocess_input(data: dict):
    df = pd.DataFrame([data])
    df['age_years'] = df['age']
    df['bmi'] = df.apply(lambda row: calculate_bmi(row['weight'], row['height']), axis=1)
    
    return df
