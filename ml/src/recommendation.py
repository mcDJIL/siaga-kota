from __future__ import annotations


def generate_recommendations(score: float) -> list[str]:
    """Generate explainable operational actions based on the risk score."""
    if score >= 80:
        return [
            "Deploy BPBD rapid response team",
            "Clean primary drainage channels",
            "Activate emergency water pumps",
        ]
    if score >= 60:
        return [
            "Increase field monitoring",
            "Prepare evacuation route signage",
            "Inspect drainage choke points",
        ]
    return [
        "Continue routine inspections",
        "Monitor rainfall and river conditions",
        "Coordinate with community volunteers",
    ]
