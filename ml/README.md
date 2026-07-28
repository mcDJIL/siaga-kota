# SiagaKota ML Production Module

## Overview
This folder contains a production-oriented machine learning workflow for flood risk prediction.

## Structure
- datasets/raw: source datasets
- datasets/processed: cleaned and engineered datasets
- models: trained model and feature selection metadata
- reports: evaluation reports
- src: reusable Python modules for preprocessing, training, prediction, recommendation, and assignment
- notebooks: validation and EDA notebooks

## Workflow
1. Run preprocessing and training:
   - `python -m src.train`
2. Generate a prediction:
   - `python -c "from src.predict import predict; print(predict({...}))"`

## Production Notes
- The model outputs a 0-100 flood risk score.
- The score is mapped to LOW/MEDIUM/HIGH business levels.
- Recommendations and priority scoring are generated as rule-based outputs to support operations.

## API Integration
Run the API server with:
- `uvicorn src.api:app --host 0.0.0.0 --port 8000`

Example request:
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "MonsoonIntensity": 8,
    "TopographyDrainage": 5,
    "RiverManagement": 4,
    "Deforestation": 6,
    "Urbanization": 7,
    "ClimateChange": 9,
    "DamsQuality": 3,
    "Siltation": 5,
    "AgriculturalPractices": 4,
    "Encroachments": 6,
    "IneffectiveDisasterPreparedness": 7,
    "DrainageSystems": 2,
    "CoastalVulnerability": 4,
    "Landslides": 3,
    "Watersheds": 5,
    "DeterioratingInfrastructure": 6,
    "PopulationScore": 8,
    "WetlandLoss": 4,
    "InadequatePlanning": 5,
    "PoliticalFactors": 3,
    "flood_reports_24h": 10,
    "waste_reports_24h": 8
  }'
```
