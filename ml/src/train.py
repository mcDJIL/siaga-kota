from __future__ import annotations

import json
import sys
from pathlib import Path

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

if __package__ is None or __package__ == "":
    sys.path.append(str(Path(__file__).resolve().parent.parent))

from src.feature_engineering import get_feature_columns, prepare_training_dataset, save_selected_features
from src.preprocessing import load_raw_data, save_processed_data

ROOT_DIR = Path(__file__).resolve().parent.parent
RAW_DATA_PATH = ROOT_DIR / "datasets" / "raw" / "flood.csv"
PROCESSED_DATA_PATH = ROOT_DIR / "datasets" / "processed" / "clean_dataset.csv"
TRAINING_DATA_PATH = ROOT_DIR / "datasets" / "processed" / "training_dataset.csv"
MODEL_PATH = ROOT_DIR / "models" / "best_model.pkl"
REPORT_PATH = ROOT_DIR / "reports" / "evaluation_report.md"


def train_model() -> dict[str, object]:
    raw_df = load_raw_data(RAW_DATA_PATH)
    processed_df = raw_df.drop_duplicates().reset_index(drop=True)
    save_processed_data(processed_df, PROCESSED_DATA_PATH)

    training_df = prepare_training_dataset(processed_df)
    training_df["target"] = training_df["target"] * 100.0
    training_df.to_csv(TRAINING_DATA_PATH, index=False)

    feature_columns = get_feature_columns(training_df)
    X = training_df[feature_columns]
    y = training_df["target"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(
        n_estimators=250,
        max_depth=10,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1,
    )
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test, predictions)
    mse = mean_squared_error(y_test, predictions)
    rmse = mse ** 0.5
    r2 = r2_score(y_test, predictions)

    save_selected_features(feature_columns, ROOT_DIR / "models" / "selected_features.json")
    joblib.dump(model, MODEL_PATH)

    report_lines = [
        "# Evaluation Report",
        "",
        "## Purpose",
        "Assess the production readiness of the flood risk model.",
        "",
        "## Metrics",
        f"- MAE: {mae:.4f}",
        f"- MSE: {mse:.4f}",
        f"- RMSE: {rmse:.4f}",
        f"- R2: {r2:.4f}",
        "",
        "## Explanation",
        "The model uses a Random Forest regressor to estimate a flood risk score between 0 and 100.",
        "The target is scaled from the original probability range to 0-100 so the score matches business expectations.",
        "The metrics indicate regression quality and provide a baseline for production monitoring.",
    ]
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text("\n".join(report_lines), encoding="utf-8")

    return {
        "model_path": str(MODEL_PATH),
        "training_data": str(TRAINING_DATA_PATH),
        "report_path": str(REPORT_PATH),
        "metrics": {
            "mae": round(float(mae), 4),
            "mse": round(float(mse), 4),
            "rmse": round(float(rmse), 4),
            "r2": round(float(r2), 4),
        },
    }


if __name__ == "__main__":
    result = train_model()
    print(json.dumps(result, indent=2))
