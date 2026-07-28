from __future__ import annotations


def compute_priority_score(risk_score: float, flood_reports: int = 0, waste_reports: int = 0) -> float:
    """Create a simple prioritization formula for field assignment."""
    weighted_score = (0.6 * risk_score) + (0.25 * min(flood_reports, 50)) + (0.15 * min(waste_reports, 50))
    return round(min(100.0, weighted_score), 2)


def rank_assignments(records: list[dict[str, float | int | str]]) -> list[dict[str, float | int | str]]:
    """Rank a list of assignments by priority score."""
    scored = []
    for record in records:
        score = compute_priority_score(
            float(record.get("risk_score", 0)),
            int(record.get("flood_reports_24h", 0)),
            int(record.get("waste_reports_24h", 0)),
        )
        scored.append({**record, "priority_score": score})
    return sorted(scored, key=lambda item: float(item["priority_score"]), reverse=True)
