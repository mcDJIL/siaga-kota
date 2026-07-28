from __future__ import annotations

from pathlib import Path

import pandas as pd

ROOT_DIR = Path(__file__).resolve().parent.parent
RAW_DATA_PATH = ROOT_DIR / "datasets" / "raw" / "flood.csv"
PROCESSED_DATA_PATH = ROOT_DIR / "datasets" / "processed" / "clean_dataset.csv"


def load_raw_data(path: str | Path | None = None) -> pd.DataFrame:
    data_path = Path(path) if path else RAW_DATA_PATH
    return pd.read_csv(data_path)


def clean_dataset(df: pd.DataFrame) -> pd.DataFrame:
    cleaned = df.copy()
    cleaned = cleaned.drop_duplicates().reset_index(drop=True)
    for column in cleaned.columns:
        if cleaned[column].dtype.kind in "biufc":
            cleaned[column] = pd.to_numeric(cleaned[column], errors="coerce")
    cleaned = cleaned.dropna().reset_index(drop=True)
    return cleaned


def save_processed_data(df: pd.DataFrame, path: str | Path | None = None) -> Path:
    output_path = Path(path) if path else PROCESSED_DATA_PATH
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)
    return output_path


def run_preprocessing(path: str | Path | None = None) -> Path:
    df = load_raw_data(path)
    cleaned_df = clean_dataset(df)
    return save_processed_data(cleaned_df, path=path if path else None)
