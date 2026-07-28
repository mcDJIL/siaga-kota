from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

ROOT_DIR = Path(__file__).resolve().parent.parent
PROCESSED_DATA_PATH = ROOT_DIR / "datasets" / "processed" / "clean_dataset.csv"
TRAINING_DATA_PATH = ROOT_DIR / "datasets" / "processed" / "training_dataset.csv"
SELECTED_FEATURES_PATH = ROOT_DIR / "models" / "selected_features.json"

FEATURE_COLUMNS = [
    "TopographyDrainage",
    "RiverManagement",
    "Deforestation",
    "DamsQuality",
    "Siltation",
    "AgriculturalPractices",
    "Encroachments",
    "IneffectiveDisasterPreparedness",
    "CoastalVulnerability",
    "Landslides",
    "Watersheds",
    "DeterioratingInfrastructure",
    "WetlandLoss",
    "InadequatePlanning",
    "PoliticalFactors",
    "rainfall_today",
    "rainfall_last_3_days",
    "rainfall_last_7_days",
    "flood_reports_24h",
    "waste_reports_24h",
    "population_density",
    "elevation",
    "river_distance",
    "drainage_score",
    "climate_stress_index",
    "drainage_risk_index",
    "development_pressure",
    "ecological_pressure",
    "preparedness_gap",
    "infrastructure_decay",
    "agriculture_pressure",
    "coastal_exposure",
]


def prepare_training_dataset(df: pd.DataFrame) -> pd.DataFrame:
    engineered = df.copy()
    engineered["rainfall_today"] = engineered["MonsoonIntensity"]
    engineered["rainfall_last_3_days"] = engineered["MonsoonIntensity"] + engineered["ClimateChange"]
    engineered["rainfall_last_7_days"] = engineered["MonsoonIntensity"] * 2 + engineered["ClimateChange"]
    engineered["flood_reports_24h"] = engineered["MonsoonIntensity"]
    engineered["waste_reports_24h"] = engineered["Urbanization"]
    engineered["population_density"] = engineered["PopulationScore"]
    engineered["elevation"] = engineered["TopographyDrainage"]
    engineered["river_distance"] = engineered["RiverManagement"]
    engineered["drainage_score"] = engineered["DrainageSystems"]

    engineered["climate_stress_index"] = engineered["MonsoonIntensity"] * engineered["ClimateChange"]
    engineered["drainage_risk_index"] = (
        engineered["TopographyDrainage"]
        + engineered["RiverManagement"]
        + engineered["DamsQuality"]
        + engineered["DrainageSystems"]
    )
    engineered["development_pressure"] = engineered["Urbanization"] * engineered["PopulationScore"]
    engineered["ecological_pressure"] = (
        engineered["Deforestation"]
        + engineered["WetlandLoss"]
        + engineered["Landslides"]
        + engineered["Watersheds"]
    )
    engineered["preparedness_gap"] = engineered["IneffectiveDisasterPreparedness"] + engineered["InadequatePlanning"]
    engineered["infrastructure_decay"] = engineered["DeterioratingInfrastructure"] + engineered["Siltation"] + engineered["PoliticalFactors"]
    engineered["agriculture_pressure"] = engineered["AgriculturalPractices"] + engineered["Encroachments"]
    engineered["coastal_exposure"] = engineered["CoastalVulnerability"]

    engineered = engineered.drop(columns=[col for col in ["MonsoonIntensity", "ClimateChange", "DrainageSystems", "PopulationScore", "Urbanization"] if col in engineered.columns])
    engineered = engineered.rename(columns={"FloodProbability": "target"})
    engineered = engineered[[*FEATURE_COLUMNS, "target"]]

    return engineered


def build_feature_frame_from_payload(payload: dict[str, float | int | str | dict | list]) -> pd.DataFrame:
    district_profile = payload.get('district_profile', {}) if isinstance(payload.get('district_profile'), dict) else {}
    weather_history = payload.get('weather_history', []) if isinstance(payload.get('weather_history'), list) else []
    reports = payload.get('reports', {}) if isinstance(payload.get('reports'), dict) else {}

    elevation = float(district_profile.get('elevation', 0))
    drainage_score = float(district_profile.get('drainage_score', 0))
    population_density = float(district_profile.get('population_density', 0))

    rainfall_values = [float(item.get('rainfall', 0)) for item in weather_history if isinstance(item, dict)]
    humidity_values = [float(item.get('humidity', 0)) for item in weather_history if isinstance(item, dict)]
    temperature_values = [float(item.get('temperature', 0)) for item in weather_history if isinstance(item, dict)]

    rainfall_today = rainfall_values[-1] if rainfall_values else 0.0
    rainfall_last_3_days = sum(rainfall_values[-3:]) if len(rainfall_values) >= 3 else sum(rainfall_values)
    rainfall_last_7_days = sum(rainfall_values[-7:]) if len(rainfall_values) >= 7 else sum(rainfall_values)
    humidity_avg = sum(humidity_values[-3:]) / len(humidity_values[-3:]) if humidity_values else 0.0
    temperature_avg = sum(temperature_values[-3:]) / len(temperature_values[-3:]) if temperature_values else 0.0

    flood_reports_24h = float(reports.get('flood_reports_24h', payload.get('flood_reports_24h', 0)))
    waste_reports_24h = float(reports.get('waste_reports_24h', payload.get('waste_reports_24h', 0)))

    feature_values = {
        'TopographyDrainage': elevation,
        'RiverManagement': max(0.0, 1000.0 - elevation),
        'Deforestation': max(0.0, rainfall_last_7_days / 1000.0),
        'DamsQuality': max(0.0, 1.0 - (drainage_score / 2.0)),
        'Siltation': max(0.0, rainfall_last_3_days / 200.0),
        'AgriculturalPractices': humidity_avg / 100.0,
        'Encroachments': population_density / 10000.0,
        'IneffectiveDisasterPreparedness': max(0.0, (humidity_avg - 80.0) / 20.0),
        'CoastalVulnerability': temperature_avg / 50.0,
        'Landslides': max(0.0, rainfall_today / 200.0),
        'Watersheds': max(0.0, rainfall_last_7_days / 300.0),
        'DeterioratingInfrastructure': max(0.0, (100.0 - drainage_score * 100.0) / 100.0),
        'WetlandLoss': max(0.0, rainfall_last_3_days / 400.0),
        'InadequatePlanning': max(0.0, (humidity_avg - 70.0) / 30.0),
        'PoliticalFactors': max(0.0, (population_density / 10000.0) / 2.0),
        'rainfall_today': rainfall_today,
        'rainfall_last_3_days': rainfall_last_3_days,
        'rainfall_last_7_days': rainfall_last_7_days,
        'flood_reports_24h': flood_reports_24h,
        'waste_reports_24h': waste_reports_24h,
        'population_density': population_density,
        'elevation': elevation,
        'river_distance': max(0.0, 1000.0 - elevation),
        'drainage_score': drainage_score,
        'climate_stress_index': rainfall_today * (humidity_avg / 100.0),
        'drainage_risk_index': (elevation + (1000.0 - elevation) + drainage_score * 100.0) / 3.0,
        'development_pressure': population_density / 1000.0,
        'ecological_pressure': (rainfall_last_7_days / 100.0) + (humidity_avg / 100.0),
        'preparedness_gap': max(0.0, humidity_avg - 80.0),
        'infrastructure_decay': max(0.0, 1.0 - drainage_score),
        'agriculture_pressure': humidity_avg / 100.0 + population_density / 10000.0,
        'coastal_exposure': temperature_avg / 30.0,
    }
    return pd.DataFrame([feature_values])[FEATURE_COLUMNS]


def save_training_dataset(df: pd.DataFrame, path: str | Path | None = None) -> Path:
    output_path = Path(path) if path else TRAINING_DATA_PATH
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)
    return output_path


def save_selected_features(features: list[str], path: str | Path | None = None) -> Path:
    output_path = Path(path) if path else SELECTED_FEATURES_PATH
    output_path.parent.mkdir(parents=True, exist_ok=True)
    payload = {"selected_features": features}
    with output_path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2)
    return output_path


def get_feature_columns(df: pd.DataFrame | None = None) -> list[str]:
    if df is not None:
        target = "target"
        return [col for col in df.columns if col != target]
    return FEATURE_COLUMNS.copy()
