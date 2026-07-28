from fastapi import FastAPI
from pydantic import BaseModel

from src.predict import predict

app = FastAPI(title='SiagaKota Flood Risk API', version='1.0.0')


class DistrictProfile(BaseModel):
    elevation: float = 0.0
    drainage_score: float = 0.0
    population_density: float = 0.0


class WeatherPoint(BaseModel):
    rainfall: float = 0.0
    humidity: float = 0.0
    temperature: float = 0.0


class ReportsPayload(BaseModel):
    flood_reports_24h: int = 0
    waste_reports_24h: int = 0


class PredictionPayload(BaseModel):
    district_id: str
    district_profile: DistrictProfile
    weather_history: list[WeatherPoint] = []
    reports: ReportsPayload = ReportsPayload()


class PredictionResponse(BaseModel):
    district_id: str
    district_name: str
    risk_score: float
    risk_level: str
    confidence: float
    recommendations: list[str]
    priority_score: float
    explanation: dict[str, list[str]]


@app.get('/health')
def health() -> dict[str, str]:
    return {'status': 'ok'}


@app.post('/predict', response_model=PredictionResponse)
def create_prediction(payload: PredictionPayload) -> PredictionResponse:
    result = predict(payload.model_dump())
    return PredictionResponse(**result)
