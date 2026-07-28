from __future__ import annotations

import json
import sys
from pathlib import Path

import joblib
import pandas as pd

if __package__ is None or __package__ == "":
    sys.path.append(str(Path(__file__).resolve().parent.parent))

from src.assignment import compute_priority_score
from src.feature_engineering import build_feature_frame_from_payload, get_feature_columns
from src.recommendation import generate_recommendations
from src.risk_mapping import risk_level_from_score


def build_confidence(score: float) -> float:
    return round(max(0.0, min(1.0, score / 100.0)), 4)

ROOT_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = ROOT_DIR / "models" / "best_model.pkl"
FEATURES_PATH = ROOT_DIR / "models" / "selected_features.json"


def load_model(model_path: str | Path | None = None):
    path = Path(model_path) if model_path else MODEL_PATH
    return joblib.load(path)


def load_selected_features(path: str | Path | None = None) -> list[str]:
    path = Path(path) if path else FEATURES_PATH
    with path.open("r", encoding="utf-8") as handle:
        payload = json.load(handle)
    return payload.get("selected_features", [])


def build_feature_frame(payload: dict[str, float | int | str]) -> pd.DataFrame:
    return build_feature_frame_from_payload(payload)


def predict(payload: dict[str, float | int | str], model_path: str | Path | None = None) -> dict[str, object]:
    model = load_model(model_path)
    feature_frame = build_feature_frame(payload)
    selected_features = load_selected_features()
    if not selected_features:
        selected_features = get_feature_columns()
    feature_frame = feature_frame[selected_features]
    score = float(model.predict(feature_frame)[0])
    score = max(0.0, min(100.0, score))
    recommendations = generate_recommendations(score)
    district_id = str(payload.get("district_id", "unknown")).strip().lower()
    district_name = district_id.replace("-", " ").title() if district_id else "Unknown"
    return {
        "district_id": district_id,
        "district_name": district_name,
        "risk_score": round(score, 2),
        "risk_level": risk_level_from_score(score),
        "confidence": build_confidence(score),
        "recommendations": recommendations,
        "priority_score": compute_priority_score(
            score,
            int(payload.get("flood_reports_24h", 0)),
            int(payload.get("waste_reports_24h", 0)),
        ),
        "explanation": {
            "main_factors": [
                "recent rainfall intensity",
                "weather persistence over last 3-7 days",
                "district drainage and elevation profile",
                "recent flood and waste report volume",
            ]
        },
    }
