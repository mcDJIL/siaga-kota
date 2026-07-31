# Officer Notifications API

## Overview

API untuk mengelola notifikasi officer dengan dukungan filtering, status tracking, dan pagination.

## Endpoints

### 1. Get All Notifications

**Endpoint:** `GET /api/v1/ops/notifications`

**Authentication:** Required (Bearer Token)

**Query Parameters:**
- `category` (optional): Filter by category
  - Values: `semua`, `peringatan-banjir`, `laporan-baru`, `sistem`, `maintenance`
  - Default: `semua`
  
- `status` (optional): Filter by read status
  - Values: `semua`, `unread`, `read`, `confirmed`
  - Default: `semua`
  
- `priority` (optional): Filter by priority
  - Values: `semua`, `high`, `medium`, `low`
  - Default: `semua`
  
- `page` (optional): Page number
  - Default: `1`
  
- `per_page` (optional): Items per page
  - Default: `20`

**Example Request:**
```bash
curl -X GET "http://localhost:8000/api/v1/ops/notifications?category=laporan-baru&status=unread&priority=high&page=1&per_page=20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (Success):**
```json
{
  "data": {
    "notifications": [
      {
        "id": "n-1",
        "type": "alert",
        "category": "peringatan-banjir",
        "title": "Peringatan: Level air di Pintu Air Manggarai mencapai Siaga 2...",
        "time": "2 menit yang lalu",
        "status": "unread",
        "priority": "high",
        "reportRoute": "/officer/reports/flood/FL-2201",
        "createdAt": "2026-07-31T10:00:00Z"
      },
      {
        "id": "n-2",
        "type": "new-report",
        "category": "laporan-baru",
        "title": "Laporan Baru #SK-9283: Tumpukan sampah di Jl. Sudirman...",
        "time": "15 menit yang lalu",
        "status": "unread",
        "priority": "medium",
        "reportRoute": "/officer/reports/waste/SK-9283",
        "createdAt": "2026-07-31T09:45:00Z"
      }
    ],
    "total": 25,
    "page": 1,
    "per_page": 20,
    "unread_count": 8
  }
}
```

### 2. Mark Notification as Read

**Endpoint:** `PATCH /api/v1/ops/notifications/{id}/read`

**Authentication:** Required (Bearer Token)

**URL Parameters:**
- `id` (required): Notification ID

**Example Request:**
```bash
curl -X PATCH "http://localhost:8000/api/v1/ops/notifications/n-1/read" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (Success):**
```json
{
  "data": {
    "notification": {
      "id": "n-1",
      "status": "read"
    }
  },
  "message": "Notifikasi berhasil ditandai sebagai dibaca."
}
```

### 3. Confirm Notification

**Endpoint:** `PATCH /api/v1/ops/notifications/{id}/confirm`

**Authentication:** Required (Bearer Token)

**URL Parameters:**
- `id` (required): Notification ID

**Example Request:**
```bash
curl -X PATCH "http://localhost:8000/api/v1/ops/notifications/n-2/confirm" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (Success):**
```json
{
  "data": {
    "notification": {
      "id": "n-2",
      "status": "confirmed"
    }
  },
  "message": "Notifikasi berhasil dikonfirmasi."
}
```

### 4. Hide Notification

**Endpoint:** `PATCH /api/v1/ops/notifications/{id}/hide`

**Authentication:** Required (Bearer Token)

**URL Parameters:**
- `id` (required): Notification ID

**Example Request:**
```bash
curl -X PATCH "http://localhost:8000/api/v1/ops/notifications/n-3/hide" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (Success):**
```json
{
  "data": {
    "notification": {
      "id": "n-3",
      "status": "hidden"
    }
  },
  "message": "Notifikasi berhasil disembunyikan."
}
```

## Notification Object

```typescript
{
  id: string                    // Unique identifier
  type: string                  // Type: 'alert', 'new-report', 'system', 'maintenance'
  category: string              // Category: 'peringatan-banjir', 'laporan-baru', 'sistem', 'maintenance'
  title: string                 // Notification title/message
  time: string                  // Human-readable time (e.g., "2 menit yang lalu")
  status: string                // Status: 'unread', 'read', 'confirmed', 'completed', 'hidden'
  priority: string              // Priority: 'high', 'medium', 'low'
  reportRoute?: string          // Optional route to view related report
  createdAt: ISO8601            // Timestamp
}
```

## Filters

### Category Filter
- **peringatan-banjir** - Flood warnings
- **laporan-baru** - New reports submitted by citizens
- **sistem** - System notifications (report completion, status changes)
- **maintenance** - Maintenance schedules and alerts

### Status Filter
- **unread** - Not yet read by officer
- **read** - Read but not yet confirmed
- **confirmed** - Confirmed by officer
- **completed** - Action completed
- **hidden** - Hidden by officer

### Priority Filter
- **high** - High priority (requires immediate action)
- **medium** - Medium priority (normal handling)
- **low** - Low priority (informational)

## Frontend Integration

### Hook Usage

```javascript
import { useOfficerNotifications } from './hooks/useOfficerNotifications'

function OfficerNotificationPage() {
  const {
    notifications,      // Array of notifications
    loading,           // Loading state
    error,             // Error message
    page,              // Current page
    hasMore,           // Has more notifications to load
    filters,           // Current filters { category, status, priority }
    unreadCount,       // Count of unread notifications
    setPage,           // Update page
    updateFilters,     // Update filters (auto-reset to page 1)
    markAsRead,        // Mark notification as read
    confirm,           // Confirm notification
    hide,              // Hide notification
  } = useOfficerNotifications()
}
```

### Service Usage

```javascript
import { 
  fetchNotifications, 
  markNotificationAsRead,
  confirmNotification,
  hideNotification 
} from './services/notification.service'

// Fetch notifications
const response = await fetchNotifications({
  category: 'laporan-baru',
  status: 'unread',
  priority: 'high',
  page: 1,
  perPage: 20
})

// Update status
await markNotificationAsRead('n-1')
await confirmNotification('n-2')
await hideNotification('n-3')
```

## Testing

### 1. Login as Officer
```bash
Email: officer@test.com
Password: password
```

### 2. Navigate to Notifications
Go to `/officer/notifications`

### 3. Test Features
- **Tab filtering**: Switch between Semua, Peringatan Banjir, Laporan Baru, Sistem, Maintenance
- **Status filtering**: Filter by Belum Dibaca, Sudah Dibaca
- **Priority filtering**: Filter by Tinggi, Sedang, Rendah
- **Pagination**: Click "Load More" to fetch next page
- **Actions**: Mark read, confirm, hide notifications
- **Navigation**: Click notification to view related report

### 4. Mock Data
Currently using mock data in NotificationController. Will integrate with database later.

## Future Enhancements

1. **Real Database Integration**
   - Create Notification model
   - Store in database with officer_id FK
   - Timestamps for created_at, read_at, confirmed_at

2. **Real-time Updates**
   - WebSocket integration for new notifications
   - Pusher integration
   - Notification broadcasting

3. **Advanced Filtering**
   - Date range filtering
   - Assignee filtering
   - Report status filtering

4. **Notification Preferences**
   - User notification settings
   - Category preferences
   - Priority preferences

## Error Handling

All endpoints return standard error responses:

```json
{
  "message": "Error description"
}
```

Common status codes:
- `200` - Success
- `400` - Bad request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `500` - Server error
