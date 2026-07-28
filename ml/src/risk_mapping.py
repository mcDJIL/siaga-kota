from __future__ import annotations


def risk_level_from_score(score: float) -> str:
    """Map a continuous score in the 0-100 range into a business label."""
    if score >= 71:
        return "HIGH"
    if score >= 41:
        return "MEDIUM"
    return "LOW"


def risk_band(score: float) -> dict[str, float | str]:
    """Return the label and the threshold band used for interpretation."""
    label = risk_level_from_score(score)
    if label == "HIGH":
        return {"label": label, "min": 71.0, "max": 100.0}
    if label == "MEDIUM":
        return {"label": label, "min": 41.0, "max": 70.0}
    return {"label": label, "min": 0.0, "max": 40.0}
