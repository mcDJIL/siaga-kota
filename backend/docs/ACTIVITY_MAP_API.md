# Activity Map API Documentation

## Overview
Endpoints untuk mengelola aktivitas laporan (tasks) dan petugas di halaman Activity Map. Semua endpoint memerlukan autentikasi dengan role `petugas`.

## Base URL
```
GET/POST /api/v1/ops/activity-map
```

## Authentication
Semua endpoint memerlukan header:
```
Authorization: Bearer {token}
```

## Endpoints

### 1. Get Active Tasks
Mengambil daftar laporan aktif untuk ditampilkan di map dengan filtering.

**Endpoint:** `GET /api/v1/ops/activity-map/tasks`

**Query Parameters:**
- `page` (integer, optional): Halaman (default: 1)
- `per_page` (integer, optional): Jumlah item per halaman (default: 50)
- `region` (string, optional): Filter berdasarkan region/lokasi
- `status` (string, optional): Filter berdasarkan status laporan
- `category` (string, optional): Filter berdasarkan kategori (sampah/banjir)

**Status Values:**
- `menunggu` - Menunggu verifikasi
- `diverifikasi` - Sudah terverifikasi
- `ditugaskan` - Sudah ditugaskan ke petugas
- `diproses` - Sedang diproses
- `selesai` - Selesai
- `ditolak` - Ditolak

**Response Success (200):**
```json
{
  "data": [
    {
      "id": "report-id",
      "code": "FL-2091",
      "category": {
        "id": "cat-id",
        "slug": "banjir",
        "name": "Banjir",
        "icon": "flood"
      },
      "title": "Tanggul Jebol - Jl. Sudirman",
      "description": "Laporan warga mengenai rembesan air...",
      "status": "ditugaskan",
      "status_label": "Ditugaskan",
      "priority": "mendesak",
      "priority_label": "Mendesak",
      "location": {
        "latitude": -6.2241,
        "longitude": 106.8225,
        "address": "Kec. Setiabudi, Jaksel"
      },
      "is_emergency": true,
      "water_level_cm": 45,
      "reporter": {
        "id": "user-id",
        "name": "Budi"
      },
      "assigned_operator": {
        "id": "officer-id",
        "name": "Andi Wijaya",
        "employee_id": "EMP001"
      },
      "created_at": "2026-07-30T10:00:00Z",
      "updated_at": "2026-07-30T10:30:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 50,
    "total": 12,
    "last_page": 1
  }
}
```

### 2. Get Officers
Mengambil daftar petugas aktif untuk assignment.

**Endpoint:** `GET /api/v1/ops/activity-map/officers`

**Query Parameters:**
- `page` (integer, optional): Halaman (default: 1)
- `per_page` (integer, optional): Jumlah item per halaman (default: 50)
- `department` (string, optional): Filter berdasarkan ID department

**Officer Status Values:**
- `tersedia` - Petugas tersedia (tidak ada tugas aktif)
- `bertugas` - Petugas sedang bertugas (ada tugas aktif)
- `tidak-aktif` - Petugas tidak aktif

**Response Success (200):**
```json
{
  "data": [
    {
      "id": "officer-id",
      "name": "Andi Wijaya",
      "email": "andi@example.com",
      "phone": "081234567890",
      "position": "Petugas Lapangan",
      "avatar_path": "avatars/andi.jpg",
      "latitude": -6.2145,
      "longitude": 106.8398,
      "department": {
        "id": "dept-id",
        "name": "Dinas Kebersihan",
        "slug": "kebersihan"
      },
      "active": true,
      "assigned_reports_count": 1,
      "current_task": {
        "id": "report-id",
        "code": "FL-2091",
        "title": "Tanggul Jebol - Jl. Sudirman",
        "status": "diproses"
      },
      "status": "bertugas",
      "last_login_at": "2026-07-30T08:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 50,
    "total": 24,
    "last_page": 1
  }
}
```

### 3. Get Officer Detail
Mengambil detail petugas termasuk daftar laporan yang ditugaskan.

**Endpoint:** `GET /api/v1/ops/activity-map/officers/{id}`

**Path Parameters:**
- `id` (string, required): ID petugas

**Response Success (200):**
```json
{
  "data": {
    "id": "officer-id",
    "name": "Andi Wijaya",
    "email": "andi@example.com",
    "phone": "081234567890",
    "position": "Petugas Lapangan",
    "avatar_path": "avatars/andi.jpg",
    "latitude": -6.2145,
    "longitude": 106.8398,
    "department": {
      "id": "dept-id",
      "name": "Dinas Kebersihan",
      "slug": "kebersihan"
    },
    "active": true,
    "assigned_reports_count": 2,
    "current_task": {
      "id": "report-id",
      "code": "FL-2091",
      "title": "Tanggul Jebol - Jl. Sudirman",
      "status": "diproses"
    },
    "status": "bertugas",
    "last_login_at": "2026-07-30T08:00:00Z"
  }
}
```

### 4. Assign Officer to Report
Menugaskan petugas ke laporan.

**Endpoint:** `POST /api/v1/ops/activity-map/tasks/{reportId}/assign`

**Path Parameters:**
- `reportId` (string, required): ID laporan

**Request Body:**
```json
{
  "officer_id": "officer-id"
}
```

**Response Success (200):**
```json
{
  "data": {
    "id": "report-id",
    "code": "FL-2091",
    "title": "Tanggul Jebol - Jl. Sudirman",
    "status": "ditugaskan",
    "assigned_operator": {
      "id": "officer-id",
      "name": "Andi Wijaya",
      "employee_id": "EMP001"
    },
    "accepted_at": "2026-07-30T10:30:00Z"
  },
  "message": "Laporan berhasil ditugaskan kepada Andi Wijaya."
}
```

**Response Error (400/422):**
```json
{
  "message": "ID petugas wajib diisi.",
  "errors": {
    "officer_id": ["ID petugas wajib diisi."]
  }
}
```

### 5. Get Statistics
Mengambil statistik aktivitas map.

**Endpoint:** `GET /api/v1/ops/activity-map/statistics`

**Response Success (200):**
```json
{
  "data": {
    "total_tasks": 12,
    "tasks_by_category": {
      "banjir": 8,
      "sampah": 4
    },
    "total_officers": 24,
    "assigned_officers": 12,
    "available_officers": 12
  }
}
```

## Error Responses

### 404 Not Found
```json
{
  "message": "Laporan tidak ditemukan."
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "message": "Forbidden"
}
```

### 422 Validation Error
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "officer_id": ["User bukan merupakan petugas."]
  }
}
```

## Implementation Notes

### Location Data
Koordinat lokasi diambil dari field PostGIS `location` pada tabel reports dan field `latitude`/`longitude` pada tabel users.

### Status Transitions
Ketika mengassign officer ke report:
- Status report berubah dari `menunggu` → `ditugaskan`
- Timestamp `accepted_at` diset ke waktu sekarang
- ReportStatusHistory entry dibuat dengan catatan assignment

### Pagination
Semua endpoint list mengembalikan data dengan pagination:
- Default `per_page`: 50
- Max `per_page`: 100
- Response include `meta` object dengan `current_page`, `per_page`, `total`, `last_page`

### Filtering
Semua filter bersifat optional dan dapat dikombinasikan.

### Performance Optimization
- Menggunakan eager loading dengan `->with()` untuk menghindari N+1 queries
- Query menggunakan index pada kolom `status`, `category_id`, `created_at`, `location`
- Spatial index pada kolom geometry `location`

## Frontend Integration

### Hooks
Lihat file `frontend/src/features/dashboard/officer/hooks/useActivityMapData.js` untuk custom hooks:
- `useActivityMapTasks()` - Fetch dan manage tasks
- `useActivityMapOfficers()` - Fetch dan manage officers
- `useAssignOfficer()` - Handle officer assignment dengan error handling

### Services
Lihat file `frontend/src/services/officer.service.js` untuk API client functions:
- `fetchActiveTasks()`
- `fetchActivityMapOfficers()`
- `fetchActivityMapOfficer()`
- `assignOfficerToReport()`
- `fetchActivityMapStatistics()`
