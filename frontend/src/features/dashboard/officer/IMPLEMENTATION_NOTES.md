# Officer Dashboard - API Integration

## Overview
Dashboard officer sekarang terintegrasi dengan API untuk fetch data report real-time dari backend.

## Architecture

### Hook: `useOfficerDashboardData`
- **Lokasi**: `hooks/useOfficerDashboardData.js`
- **Fungsi**: Fetch reports dari `/api/v1/public/reports` dan transform data untuk berbagai komponen
- **Return**:
  - `reports`: Raw report data dari API
  - `loading`: Status loading
  - `error`: Error message jika ada
  - `statistics`: Aggregated stats (totalWaste, totalFlood, processing, completed)
  - `recentReports`: 5 laporan terbaru (formatted untuk table)
  - `weeklyData`: Data mingguan sampah vs banjir (7 hari terakhir)
  - `mapLocations`: Report locations dengan lat/lng untuk map markers

### Context: `DashboardContext`
- **Lokasi**: `context/DashboardContext.jsx`
- **Fungsi**: Share dashboard data ke semua child components
- **Keuntungan**: Menghindari multiple API calls, data fetched hanya 1x
- **Penggunaan**: Wrap `OfficerDashboardPage` dengan `DashboardProvider`

## Data Flow

```
OfficerDashboardPage (DashboardProvider)
  ├── StatisticsCards (useDashboardContext)
  ├── RecentReportsTable (useDashboardContext)
  ├── ActivityMapCard (useDashboardContext)
  │   └── DashboardMapContainer (useDashboardContext)
  └── WeeklyPerformanceChart (useDashboardContext)
```

## API Integration Details

### Report Structure dari API
```json
{
  "id": "ulid",
  "code": "#W-902",
  "category": {
    "id": "uuid",
    "slug": "sampah|banjir",
    "name": "Sampah|Banjir",
    "icon": "..."
  },
  "title": "Judul laporan",
  "waste_type": "sampah|banjir",
  "status": "menunggu|diverifikasi|diproses|selesai|ditolak",
  "priority": "rendah|sedang|tinggi|mendesak",
  "location": {
    "latitude": -7.2893415,
    "longitude": 112.799326,
    "address": "Jalan XYZ"
  },
  "created_at": "2024-01-01T10:00:00Z",
  ...
}
```

## Komponen yang Diupdate

### 1. StatisticsCards
- Fetch total sampah, total banjir, sedang diproses, selesai
- Tampil di 4 cards statistik

### 2. RecentReportsTable
- Fetch 5 laporan terbaru
- Display: ID, Kategori, Judul, Lokasi, Prioritas, Status, Tanggal

### 3. WeeklyPerformanceChart
- Fetch reports dari 7 hari terakhir
- Group by category (sampah/banjir)
- Display di bar chart

### 4. ActivityMapCard
- Fetch all reports dengan location data
- Tampilkan count di badge ("X AKTIF")
- Pass markers ke DashboardMapContainer

### 5. DashboardMapContainer
- Render markers untuk setiap report dengan lat/lng
- Distinguish antara sampah (circle markers) vs banjir

## Status Mapping
- `menunggu` → "Menunggu" (Pending)
- `diverifikasi` → "Terverifikasi" (Verified)
- `diproses` → "Sedang Diproses" (Processing)
- `selesai` → "Selesai" (Completed)
- `ditolak` → "Ditolak" (Rejected)

## Priority Mapping
- `rendah` → "Rendah" (Low)
- `sedang` → "Sedang" (Medium)
- `tinggi` → "Tinggi" (High)
- `mendesak` → "Mendesak" (Urgent)

## Error Handling
- Jika API call gagal, error di-log dan ditampilkan di console
- UI menampilkan loading state saat fetch
- Empty state jika tidak ada laporan

## Future Improvements
- [ ] Add pagination untuk RecentReportsTable
- [ ] Add filter (status, category, date range)
- [ ] Real-time updates dengan WebSocket/SSE
- [ ] Export laporan to PDF
- [ ] Advanced analytics dashboard
