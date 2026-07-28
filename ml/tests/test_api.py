from fastapi.testclient import TestClient

from src.api import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json()['status'] == 'ok'


def test_predict_endpoint():
    payload = {
        'district_id': 'patrang',
        'district_profile': {
            'elevation': 84,
            'drainage_score': 0.72,
            'population_density': 4200,
        },
        'weather_history': [
            {'rainfall': 40, 'humidity': 82, 'temperature': 24},
            {'rainfall': 35, 'humidity': 80, 'temperature': 25},
            {'rainfall': 50, 'humidity': 84, 'temperature': 26},
            {'rainfall': 45, 'humidity': 83, 'temperature': 25},
            {'rainfall': 55, 'humidity': 85, 'temperature': 24},
            {'rainfall': 60, 'humidity': 86, 'temperature': 25},
            {'rainfall': 70, 'humidity': 88, 'temperature': 26},
        ],
        'reports': {
            'flood_reports_24h': 12,
            'waste_reports_24h': 26,
        },
    }
    response = client.post('/predict', json=payload)
    assert response.status_code == 200
    body = response.json()
    assert 'district_id' in body
    assert 'district_name' in body
    assert 'risk_score' in body
    assert 'risk_level' in body
    assert 'confidence' in body
    assert 'recommendations' in body
    assert 'priority_score' in body
    assert 'explanation' in body
