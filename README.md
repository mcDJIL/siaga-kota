# TIC UNEJ - Sistem Pelaporan Banjir dan Sampah

Sistem informasi terintegrasi untuk pelaporan dan monitoring banjir dan sampah di wilayah UNEJ (Universitas Negeri Jember). Aplikasi ini memungkinkan masyarakat untuk melaporkan insiden banjir dan sampah secara real-time dengan lokasi akurat menggunakan peta interaktif.

## 🎯 Fitur Utama

- **Pelaporan Real-time**: Pengguna dapat melaporkan kejadian banjir dan sampah dengan informasi detail
- **Peta Interaktif**: Visualisasi lokasi kejadian menggunakan Leaflet dan heatmap
- **Sistem Notifikasi**: Notifikasi real-time menggunakan Pusher dan Laravel Echo
- **Dashboard Admin**: Monitoring dan analisis data pelaporan
- **PDF Export**: Ekspor laporan dalam format PDF
- **Responsive Design**: Aplikasi berfungsi optimal di desktop dan mobile

## 📁 Struktur Project

Proyek ini menggunakan monorepo architecture dengan tiga folder utama:

```
tic-unej/
├── frontend/          # React + Vite application
├── backend/           # Laravel API server
├── ml/                # Machine Learning module untuk flood risk prediction
├── package.json       # Root package configuration
└── README.md         # Dokumentasi ini
```

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router
- **Form Management**: React Hook Form + Zod
- **State Management**: TanStack React Query
- **Maps**: Leaflet + React Leaflet
- **UI Components**: Lucide React

### Backend
- **Framework**: Laravel
- **Build Tool**: Vite + Laravel Vite Plugin
- **Styling**: Tailwind CSS

### ML (Machine Learning)
- **Framework**: FastAPI
- **Libraries**: scikit-learn, XGBoost, pandas, numpy
- **Model Type**: Random Forest Regressor untuk Flood Risk Prediction
- **Purpose**:
  - Generate Flood Risk Score (0-100) untuk setiap district
  - Power dashboard, heatmap, dan rekomendasi
  - Provide actionable insights untuk officer assignment

**Struktur ML Folder:**
```
ml/
├── src/               # Source code Python
│   ├── api.py         # FastAPI application
│   ├── train.py       # Model training pipeline
│   ├── predict.py     # Prediction pipeline
│   ├── feature_engineering.py    # Feature transformations
│   ├── preprocessing.py          # Data cleaning
│   ├── recommendation.py         # Rule-based recommendations
│   ├── risk_mapping.py          # Risk level mapping
│   └── assignment.py             # Task prioritization
├── notebooks/         # Jupyter notebooks untuk EDA dan validation
├── datasets/          # Data folder
│   ├── raw/           # Original datasets (flood.csv, weather_data.csv)
│   └── processed/     # Cleaned dan engineered datasets
├── models/            # Trained models
│   ├── best_model.pkl # Production-ready model
│   └── selected_features.json  # Feature list
├── reports/           # Analysis reports
│   └── evaluation_report.md
├── requirements.txt   # Python dependencies
└── AI_DEVELOPMENT_PLAN.md  # Development guidelines

## 🚀 Cara Menggunakan

### Prasyarat
- Node.js 16+ dan npm/yarn
- PHP 8.1+ dan Composer (untuk backend)

### Setup Awal

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd tic-unej
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   Ini akan menginstal dependencies untuk frontend dan backend secara otomatis (workspace).

3. **Setup Backend (Laravel)**
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   ```
   Sesuaikan konfigurasi database dan environment variables di file `.env` backend.

4. **Setup ML Module (Optional)**
   ```bash
   cd ml
   python -m venv venv          # Create virtual environment
   source venv/bin/activate     # atau venv\Scripts\activate di Windows
   pip install -r requirements.txt
   ```
   Folder ML berdiri sendiri dengan environment Python terpisah.

5. **Setup Frontend**
   ```bash
   cd ../frontend
   # Dependencies sudah terinstall dari npm install di root
   ```
   Buat file `.env` atau `.env.local` untuk konfigurasi API endpoint jika diperlukan.

### Running Development Server

**Option 1: Run dari root folder**
```bash
npm run dev
```
Perintah ini akan menjalankan frontend development server (Vite) secara otomatis.

**Option 2: Run frontend dan backend secara terpisah**
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend (jika diperlukan)
cd backend
php artisan serve
```

Frontend akan accessible di `http://localhost:5173`
Backend akan accessible di `http://localhost:8000`

### Build untuk Production

```bash
# Build frontend
npm run build

# Backend (Laravel)
cd backend
php artisan build  # jika menggunakan Vite
```

### Linting

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## 🛠 Available Scripts (Root Level)

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Jalankan frontend development server |
| `npm run build` | Build frontend untuk production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Jalankan ESLint pada frontend |

## 🌍 Environment Configuration

### Frontend
Buat file `frontend/.env.local`:
```
VITE_API_URL=http://localhost:8000/api
VITE_ML_API_URL=http://localhost:8001/api
VITE_APP_NAME=TIC UNEJ
```

### Backend
Sesuaikan file `backend/.env`:
```
APP_NAME="TIC UNEJ"
APP_DEBUG=true
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tic_unej
DB_USERNAME=root
DB_PASSWORD=
ML_API_URL=http://localhost:8001
```

### ML Module
Buat file `ml/.env` jika diperlukan:
```
MODEL_PATH=./models/best_model.pkl
FEATURES_PATH=./models/selected_features.json
PORT=8001
```

## 📊 Fitur Teknologi

### Frontend
- **React Query**: Manajemen data remote dan caching
- **React Hook Form**: Manajemen form yang efisien
- **Zod**: Validasi schema
- **Leaflet**: Pemetaan interaktif
- **Framer Motion**: Animasi smooth
- **TailwindCSS**: Utility-first CSS framework
- **Vite**: Lightning-fast build tool

### Backend
- **Laravel**: Framework PHP modern
- **Eloquent ORM**: Database abstraction
- **Laravel Echo + Pusher**: Real-time notification
- **Vite**: Asset bundling untuk blade templates
- **TailwindCSS**: Styling

### ML Module
- **FastAPI**: Modern async API framework
- **scikit-learn**: Machine Learning models
- **XGBoost**: Gradient boosting for better predictions
- **pandas & numpy**: Data manipulation dan numerical computing
- **Jupyter**: Exploratory Data Analysis
- **joblib**: Model serialization

## 🔗 Integrasi Eksternal

- **Pusher**: Real-time event broadcasting
- **Leaflet Heat**: Heatmap visualization untuk data pelaporan
- **HTML2Canvas + jsPDF**: Export laporan ke PDF
- **FastAPI + ML Model**: Flood risk prediction dan recommendations

## 🤖 ML Module Workflow

Modul ML mengikuti development plan terstruktur (AI_DEVELOPMENT_PLAN.md):

1. **Data Collection**: Flood dan weather data dikumpulkan
2. **EDA & Validation**: Exploratory analysis via notebooks
3. **Feature Engineering**: Transform raw data menjadi features yang meaningful
4. **Model Training**: Random Forest model untuk risk scoring
5. **Evaluation**: Model dievaluasi dengan metrics (R², RMSE, dll)
6. **Risk Mapping**: Convert probability menjadi business risk level (LOW/MEDIUM/HIGH)
7. **Recommendations**: Rule-based recommendations berdasarkan risk score
8. **Prediction Pipeline**: End-to-end pipeline dari raw data hingga recommendations
9. **API Deployment**: FastAPI untuk serve predictions

**Output ML Module:**
- Flood Risk Score (0-100) per district
- Risk Level Classification (LOW/MEDIUM/HIGH)
- Actionable Recommendations (cleanup, deployment, etc)
- Priority Scores untuk officer assignment

**Running ML Module:**
```bash
cd ml
source venv/bin/activate
python -m uvicorn src.api:app --reload --port 8001
```

Dokumentasi lengkap ada di `ml/AI_DEVELOPMENT_PLAN.md`

## 📝 Workflow Development

1. Create branch dari `dev` untuk fitur/bugfix baru
2. Develop dan test secara lokal
3. Commit dengan pesan yang jelas
4. Push dan buat Pull Request
5. Code review dan merge ke `dev`

## 🐛 Troubleshooting

### Port sudah terpakai
Jika port 5173 (frontend), 8000 (backend), atau 8001 (ML API) sudah terpakai:

**Frontend (Vite)**
```bash
cd frontend
npm run dev -- --port 3000
```

**Backend (Laravel)**
```bash
cd backend
php artisan serve --port 8002
```

**ML API (FastAPI)**
```bash
cd ml
source venv/bin/activate
python -m uvicorn src.api:app --port 8003
```

### Dependencies issue
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database migration error
```bash
cd backend
php artisan migrate:fresh
```

### ML Module Python issues
```bash
cd ml
# Hapus virtual environment
rm -rf venv

# Create fresh virtual environment
python -m venv venv
source venv/bin/activate  # atau venv\Scripts\activate di Windows

# Reinstall dependencies
pip install -r requirements.txt
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Laravel Documentation](https://laravel.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Leaflet Documentation](https://leafletjs.com)

## 📄 Lisensi

Project ini dilindungi di bawah lisensi yang ditentukan oleh institusi UNEJ.

## 👥 Kontribusi

Untuk berkontribusi pada project ini, silakan ikuti guidelines yang sudah ditentukan dan buat pull request dengan deskripsi yang jelas.

---

**Dibuat untuk TIC UNEJ** | Universitas Negeri Jember
