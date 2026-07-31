# ML Module - Flood Risk Prediction & Recommendations

Modul Machine Learning untuk **SiagaKota** yang menghasilkan **Flood Risk Score** (0-100) per district dan rekomendasi aksi berbasis AI untuk mitigasi banjir.

## 📊 Fitur Utama

- **Risk Score Generation**: Prediksi flood risk score 0-100 untuk setiap district
- **Risk Classification**: Klasifikasi otomatis ke LOW / MEDIUM / HIGH
- **Smart Recommendations**: Rule-based recommendations berdasarkan risk score
- **Priority Ranking**: Scoring untuk officer assignment dan task prioritization
- **FastAPI Integration**: Ready-to-deploy REST API

## 🏗️ Struktur Folder

```
ml/
├── src/                          # Python source code
│   ├── api.py                    # FastAPI application & endpoints
│   ├── predict.py                # Prediction pipeline
│   ├── feature_engineering.py    # Feature transformations
│   ├── preprocessing.py          # Data cleaning & preparation
│   ├── train.py                  # Model training script
│   ├── recommendation.py         # Recommendation engine
│   ├── risk_mapping.py          # Risk level mapping (LOW/MEDIUM/HIGH)
│   ├── assignment.py             # Task prioritization & ranking
│   └── __init__.py
│
├── notebooks/                    # Jupyter notebooks
│   ├── dataset_validation.ipynb  # Dataset exploration & validation
│   └── eda.ipynb                 # Exploratory Data Analysis
│
├── datasets/
│   ├── raw/
│   │   ├── flood.csv             # Original flood incident data
│   │   └── weather_data.csv      # Weather historical data
│   └── processed/
│       ├── clean_dataset.csv     # After preprocessing
│       └── training_dataset.csv  # Feature-engineered data
│
├── models/
│   ├── best_model.pkl            # Trained Random Forest model
│   └── selected_features.json    # List of features used in model
│
├── reports/
│   └── evaluation_report.md      # Model performance metrics
│
├── tests/
│   └── test_api.py               # API integration tests
│
├── requirements.txt              # Python dependencies
├── AI_DEVELOPMENT_PLAN.md        # Development guidelines & phases
└── README.md                     # Dokumentasi ini
```

## 🚀 Setup & Installation

### 1. Prerequisites
- Python 3.9+
- pip atau conda
- Virtual environment (recommended)

### 2. Clone & Navigate
```bash
cd ml
```

### 3. Create Virtual Environment
```bash
# Linux / macOS
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Verify Installation
```bash
python -c "import fastapi, sklearn, pandas; print('✓ All dependencies installed')"
```

## 🎯 Usage

### Quick Start - Run API Server

```bash
# Pastikan virtual environment sudah activated
source venv/bin/activate  # atau venv\Scripts\activate di Windows

# Run FastAPI server
python -m uvicorn src.api:app --reload --host 0.0.0.0 --port 8001
```

API akan accessible di:
- **URL**: http://localhost:8001
- **Docs**: http://localhost:8001/docs (interactive Swagger UI)
- **ReDoc**: http://localhost:8001/redoc

### Health Check

```bash
curl http://localhost:8001/health
# Response: {"status":"ok"}
```

### Making Predictions

#### Option 1: Using cURL
```bash
curl -X POST "http://localhost:8001/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "district_id": "patrang-1",
    "rainfall_today": 45.5,
    "rainfall_last_3_days": 120.3,
    "rainfall_last_7_days": 250.8,
    "flood_reports_24h": 3,
    "waste_reports_24h": 2,
    "population_density": 5000,
    "elevation": 45,
    "river_distance": 800,
    "drainage_score": 0.75
  }'
```

#### Option 2: Using Python
```python
import requests
import json

payload = {
    "district_id": "patrang-1",
    "rainfall_today": 45.5,
    "rainfall_last_3_days": 120.3,
    "rainfall_last_7_days": 250.8,
    "flood_reports_24h": 3,
    "waste_reports_24h": 2,
    "population_density": 5000,
    "elevation": 45,
    "river_distance": 800,
    "drainage_score": 0.75
}

response = requests.post("http://localhost:8001/predict", json=payload)
result = response.json()
print(json.dumps(result, indent=2))
```

#### Option 3: Using JavaScript/Fetch (dari Frontend)
```javascript
const payload = {
  district_id: "patrang-1",
  rainfall_today: 45.5,
  rainfall_last_3_days: 120.3,
  rainfall_last_7_days: 250.8,
  flood_reports_24h: 3,
  waste_reports_24h: 2,
  population_density: 5000,
  elevation: 45,
  river_distance: 800,
  drainage_score: 0.75
};

const response = await fetch("http://localhost:8001/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});

const result = await response.json();
console.log(result);
```

### Prediction Response Format

```json
{
  "district_id": "patrang-1",
  "district_name": "Patrang 1",
  "risk_score": 78.45,
  "risk_level": "HIGH",
  "confidence": 0.7845,
  "recommendations": [
    "Deploy BPBD rapid response team",
    "Clean primary drainage channels",
    "Activate emergency water pumps"
  ],
  "priority_score": 72.34,
  "explanation": {
    "main_factors": [
      "recent rainfall intensity",
      "weather persistence over last 3-7 days",
      "district drainage and elevation profile",
      "recent flood and waste report volume"
    ]
  }
}
```

## 📥 Input Parameters

### DistrictProfile (Optional nested object)
Informasi statis tentang district:
```javascript
"district_profile": {
  "elevation": 45,              // Elevation dalam meter
  "river_distance": 800,        // Jarak ke sungai terdekat (meter)
  "drainage_score": 0.75,       // Kualitas drainage (0-1)
  "population_density": 5000    // Kepadatan penduduk (per km²)
}
```

### WeatherHistory (Optional array of WeatherPoint)
Riwayat cuaca untuk 7 hari terakhir:
```javascript
"weather_history": [
  {
    "rainfall": 10.2,     // Curah hujan (mm)
    "humidity": 85,       // Kelembaban (%)
    "temperature": 28.5   // Suhu (°C)
  },
  // ... lebih banyak data points
]
```

### ReportsPayload (Optional)
Data pelaporan dari aplikasi:
```javascript
"reports": {
  "flood_reports_24h": 3,   // Jumlah laporan banjir 24 jam terakhir
  "waste_reports_24h": 2    // Jumlah laporan sampah 24 jam terakhir
}
```

### Direct Parameters (Alternative)
Anda bisa juga mengirim parameter langsung (tidak dalam nested object):
```javascript
{
  "district_id": "patrang-1",
  "rainfall_today": 45.5,
  "rainfall_last_3_days": 120.3,
  "rainfall_last_7_days": 250.8,
  "humidity": 82,
  "temperature": 28.5,
  "flood_reports_24h": 3,
  "waste_reports_24h": 2,
  "population_density": 5000,
  "elevation": 45,
  "river_distance": 800,
  "drainage_score": 0.75
}
```

## 📊 Output Explanation

### risk_score (0-100)
Flood risk score yang dihasilkan model. Semakin tinggi = semakin besar risiko.

### risk_level
Klasifikasi risiko:
- **LOW** (0-40): Risk rendah, monitoring rutin saja
- **MEDIUM** (41-70): Risk sedang, perlu persiapan
- **HIGH** (71-100): Risk tinggi, perlu aksi cepat

### confidence (0-1)
Confidence level dari prediksi. Semakin tinggi semakin akurat.

### recommendations (array of strings)
Aksi yang disarankan berdasarkan risk level:

| Risk Level | Recommendations |
|-----------|-----------------|
| **HIGH** | Deploy BPBD rapid response team, Clean primary drainage, Activate water pumps |
| **MEDIUM** | Increase field monitoring, Prepare evacuation routes, Inspect drainage |
| **LOW** | Routine inspections, Monitor conditions, Community coordination |

### priority_score (0-100)
Score untuk prioritas task assignment ke officer:
- Formula: `0.6 * risk_score + 0.25 * flood_reports + 0.15 * waste_reports`
- Digunakan untuk ranking tasks

### explanation
Faktor-faktor utama yang mempengaruhi prediksi:
- Recent rainfall intensity
- Weather persistence (3-7 hari)
- Drainage & elevation profile
- Volume laporan terbaru

## 🔧 Development & Training

### Training Model (Advanced)

Jika Anda ingin retrain model dengan data baru:

```bash
python src/train.py
```

Script ini akan:
1. Load training dataset
2. Train Random Forest model
3. Save best model ke `models/best_model.pkl`
4. Save feature list ke `models/selected_features.json`

### Exploratory Data Analysis (EDA)

Buka dan jalankan notebook:

```bash
jupyter notebook notebooks/eda.ipynb
```

### Testing

Run test suite:

```bash
pytest tests/
```

## 📁 Key Files Explained

### `src/api.py`
Mendefinisikan REST API endpoints dan request/response schemas menggunakan Pydantic.

**Main Endpoint:**
- `POST /predict` - Prediksi flood risk untuk satu district

### `src/predict.py`
Pipeline prediksi lengkap:
1. Load trained model
2. Build feature frame dari payload
3. Make prediction
4. Map ke risk level
5. Generate recommendations
6. Compute priority score

### `src/feature_engineering.py`
Transform raw input menjadi features yang dipakai model:
- Rainfall aggregations (today, 3-day, 7-day)
- Composite risk indices
- Feature scaling dan normalization

### `src/recommendation.py`
Rule-based recommendation engine. Menghasilkan list aksi berdasarkan risk score.

### `src/risk_mapping.py`
Mapping dari continuous risk score (0-100) ke business labels:
- 0-40: LOW
- 41-70: MEDIUM
- 71-100: HIGH

### `src/assignment.py`
Priority scoring untuk task assignment dan ranking:
- Mempertimbangkan risk score, flood reports, waste reports
- Menghasilkan priority score 0-100
- Support ranking multiple districts

## 🌐 Integration dengan Backend

Backend Laravel dapat memanggil endpoint `/predict`:

```php
// Example Laravel code
$client = new Client();
$response = $client->post('http://localhost:8001/predict', [
    'json' => [
        'district_id' => $districtId,
        'rainfall_today' => $weatherData['rainfall'],
        'rainfall_last_3_days' => $weatherData['rainfall_3d'],
        'rainfall_last_7_days' => $weatherData['rainfall_7d'],
        'flood_reports_24h' => $floodReportCount,
        'waste_reports_24h' => $wasteReportCount,
        'population_density' => $districtProfile['population_density'],
        'elevation' => $districtProfile['elevation'],
        'river_distance' => $districtProfile['river_distance'],
        'drainage_score' => $districtProfile['drainage_score']
    ]
]);

$prediction = json_decode($response->getBody(), true);
```

## 🐛 Troubleshooting

### Port 8001 Already in Use
```bash
# Use different port
python -m uvicorn src.api:app --port 8002
```

### Import Errors
```bash
# Verify you're in correct directory
cd ml

# Verify virtual environment is activated
source venv/bin/activate  # Linux/macOS
# atau
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

### Model File Not Found
```
FileNotFoundError: [Errno 2] No such file or directory: 'models/best_model.pkl'
```

Pastikan file model ada di path yang benar:
- Dari folder `ml/`: Path `models/best_model.pkl` harus exist
- Jika tidak ada, jalankan `python src/train.py` untuk train ulang

### Prediction Returns Unexpected Values
- Check input data validity
- Verify feature values dalam reasonable range
- Check untuk NaN atau infinite values di input

## 📚 Dependencies

Lihat `requirements.txt` untuk daftar lengkap. Main dependencies:

| Package | Version | Purpose |
|---------|---------|---------|
| fastapi | Latest | API Framework |
| uvicorn | Latest | ASGI Server |
| scikit-learn | Latest | ML Models |
| pandas | Latest | Data Processing |
| numpy | Latest | Numerical Computing |
| xgboost | Latest | Gradient Boosting |
| joblib | Latest | Model Serialization |
| pydantic | Latest | Data Validation |

## 📖 More Resources

- **Development Plan**: Read `AI_DEVELOPMENT_PLAN.md` untuk detailed development phases
- **Model Evaluation**: Check `reports/evaluation_report.md` untuk metrics
- **Datasets**: Raw data di `datasets/raw/`, processed di `datasets/processed/`
- **Notebooks**: EDA & validation di `notebooks/`

## ✅ Checklist untuk Deployment

- [ ] Virtual environment setup dengan semua dependencies
- [ ] Model file ada di `models/best_model.pkl`
- [ ] Features file ada di `models/selected_features.json`
- [ ] API health check: `GET /health` returns `{"status":"ok"}`
- [ ] API test prediction working dengan sample data
- [ ] Backend dapat hit endpoint `/predict` dengan benar
- [ ] Response format sesuai dengan dokumentasi
- [ ] Error handling sudah OK (invalid inputs, missing model, etc)

## 🤝 Contributing

Jika membuat perubahan pada model atau features:
1. Update `AI_DEVELOPMENT_PLAN.md` dengan phase baru
2. Retrain model: `python src/train.py`
3. Run tests: `pytest tests/`
4. Update documentation dengan perubahan input/output

---

**SiagaKota ML Module** | Flood Risk Prediction System
