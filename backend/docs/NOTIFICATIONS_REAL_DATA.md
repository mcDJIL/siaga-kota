# Real Notifications System

## Overview

Sistem notifikasi yang terintegrasi dengan laporan (reports) banjir dan sampah. Notifikasi otomatis dibuat ketika:

1. **Laporan baru dibuat** - Notify semua officers
2. **Status laporan berubah** - Notify report submitter
3. **Laporan diselesaikan** - Notify report submitter dengan badge/reward

## Database Structure

### Notifications Table

```sql
CREATE TABLE notifications (
    id ULID PRIMARY KEY,
    user_id ULID FOREIGN KEY → users.id,
    report_id ULID FOREIGN KEY → reports.id (nullable),
    type ENUM('alert', 'new-report', 'status-update', 'completed'),
    category ENUM('peringatan-banjir', 'laporan-baru', 'sistem'),
    title TEXT,
    description TEXT,
    priority ENUM('high', 'medium', 'low'),
    status ENUM('unread', 'read', 'confirmed', 'completed', 'hidden'),
    read_at TIMESTAMP nullable,
    confirmed_at TIMESTAMP nullable,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP nullable
)
```

## Notification Types

### 1. New Report Notification
- **Type:** `new-report`
- **Category:** `laporan-baru` atau `peringatan-banjir`
- **Triggered:** Saat report baru dibuat
- **Audience:** Semua officers (users dengan role 'petugas')
- **Priority:** Depends on report priority

**Example:**
```
Title: "Laporan Baru #SK-9283: Tumpukan sampah di Jl. Sudirman"
Description: Report description
Category: laporan-baru
Priority: medium
```

### 2. Flood Alert Notification
- **Type:** `alert`
- **Category:** `peringatan-banjir`
- **Triggered:** Saat flood report dibuat dengan water_level_cm > 0
- **Audience:** Semua officers
- **Priority:** `high` jika water_level > 100cm, else `medium`

**Example:**
```
Title: "Peringatan Banjir: Jakarta Timur - Level Air: 120cm"
Priority: high
```

### 3. Status Update Notification
- **Type:** `status-update`
- **Category:** `sistem`
- **Triggered:** Saat status report berubah
- **Audience:** Report submitter (citizen)
- **Priority:** `high` jika ditolak, else `medium`

**Status Changes:**
- menunggu → diverifikasi → diproses → selesai
- Or any → ditolak

**Example:**
```
Title: "Status Laporan #SK-9283 Berubah Menjadi Sedang Diproses"
Description: "Laporan Sampah Anda telah diperbarui status menjadi Sedang Diproses."
Priority: medium
```

### 4. Completion Notification
- **Type:** `completed`
- **Category:** `sistem`
- **Triggered:** Saat status berubah menjadi 'selesai'
- **Audience:** Report submitter (citizen)
- **Priority:** `low`

**Example:**
```
Title: "Laporan #SK-9283 Telah Diselesaikan"
Description: "Terima kasih telah melaporkan. Laporan Anda telah ditangani dan diselesaikan oleh petugas."
Priority: low
```

## Flow Diagram

### Create New Report
```
Citizen submits report
    ↓
Report created in database
    ↓
Report.created() event triggered
    ↓
NotificationService::createNewReportNotification()
    ↓
Notification created for each officer
    ↓
Officer sees "Laporan Baru" in notifications tab
```

### Update Report Status
```
Officer updates report status (e.g., diproses → selesai)
    ↓
Report.updating() event triggered
    ↓
Check if 'status' is dirty
    ↓
NotificationService::createStatusUpdateNotification()
    ↓
Notification created for report submitter
    ↓
If status is 'selesai':
    NotificationService::createCompletionNotification()
    ↓
Citizen sees status update notification
```

## Implementation Details

### NotificationService Methods

```php
// Create notification for new report
NotificationService::createNewReportNotification(Report $report): void

// Create notification when status changes
NotificationService::createStatusUpdateNotification(
    Report $report, 
    string $oldStatus, 
    string $newStatus
): void

// Create completion notification
NotificationService::createCompletionNotification(Report $report): void

// Create flood alert
NotificationService::createFloodAlertNotification(Report $report): void

// Get human readable time
NotificationService::getTimeString($date): string
```

### Notification Model Scopes

```php
// Get only unread notifications
$notifications = Notification::unread()->get();

// Filter by category
$notifications = Notification::byCategory('laporan-baru')->get();

// Filter by status
$notifications = Notification::byStatus('unread')->get();

// Filter by priority
$notifications = Notification::byPriority('high')->get();

// Mark as read
$notification->markAsRead(); // Sets status='read', read_at=now()

// Mark as confirmed
$notification->markAsConfirmed(); // Sets status='confirmed', confirmed_at=now()

// Hide notification
$notification->hide(); // Sets status='hidden'
```

## API Endpoints

### Get Notifications
```bash
GET /api/v1/ops/notifications?category=laporan-baru&status=unread&priority=high&page=1&per_page=20
```

**Response:**
```json
{
  "data": {
    "notifications": [
      {
        "id": "n-abc123",
        "type": "new-report",
        "category": "laporan-baru",
        "title": "Laporan Baru #SK-9283: Tumpukan sampah di Jl. Sudirman",
        "description": "Report description",
        "time": "15 menit yang lalu",
        "status": "unread",
        "priority": "medium",
        "reportRoute": "/officer/reports/waste/report-id",
        "createdAt": "2026-07-31T10:00:00Z"
      }
    ],
    "total": 25,
    "page": 1,
    "per_page": 20,
    "unread_count": 8
  }
}
```

### Mark as Read
```bash
PATCH /api/v1/ops/notifications/{id}/read
```

### Confirm
```bash
PATCH /api/v1/ops/notifications/{id}/confirm
```

### Hide
```bash
PATCH /api/v1/ops/notifications/{id}/hide
```

## Testing the System

### 1. Create a New Report (as Citizen)

```bash
POST /api/v1/public/reports
{
  "category_id": "cat-123",
  "title": "Tumpukan sampah di Jl. Sudirman",
  "description": "Ada sampah menumpuk setinggi 2 meter",
  "location": "POINT(106.8234 -6.2234)",
  "address": "Jl. Sudirman, Jakarta Pusat",
  "photo_path": "path/to/photo.jpg"
}
```

**Expected:**
- Notification created for all officers
- Officer sees new report in "Laporan Baru" tab

### 2. Update Report Status (as Officer)

```bash
PATCH /api/v1/ops/reports/{id}
{
  "status": "diproses",
  "assigned_to": "officer-id"
}
```

**Expected:**
- Notification created for citizen
- Citizen sees status update in their notifications
- Report route links to waste/flood reports page

### 3. Complete Report (as Officer)

```bash
PATCH /api/v1/ops/reports/{id}
{
  "status": "selesai",
  "resolution_note": "Sampah telah dibersihkan"
}
```

**Expected:**
- Notification created: "Laporan #SK-9283 Telah Diselesaikan"
- Citizen receives completion notification
- Citizen can earn badges/rewards

### 4. Create Flood Report (as Citizen)

```bash
POST /api/v1/public/reports
{
  "category_id": "cat-flood",
  "title": "Banjir di Jl. Gatot Subroto",
  "description": "Air sudah menggenangi jalan",
  "water_level_cm": 120,
  "location": "POINT(106.8234 -6.2234)",
  "address": "Jl. Gatot Subroto, Jakarta Selatan"
}
```

**Expected:**
- Notification for new report created (category: laporan-baru)
- Alert notification created (category: peringatan-banjir, priority: high)
- Officers see flood alert immediately

## Database Migration

Run migration to create notifications table:

```bash
php artisan migrate
```

This will create:
- `notifications` table
- Indexes on user_id, report_id, status, category, priority
- Soft delete support

## Future Enhancements

1. **Real-time Notifications**
   - WebSocket integration
   - Pusher broadcasting
   - Live update without page refresh

2. **Notification Preferences**
   - User can customize notification settings
   - Mute specific categories
   - Notification quiet hours

3. **Notification History**
   - Archive old notifications
   - Search/filter notifications
   - Export notification reports

4. **Notification Templates**
   - Customizable notification messages
   - Multi-language support
   - Dynamic variables (reporter name, location, etc)

## Troubleshooting

### Notifications not created

1. Check migration ran: `php artisan migrate`
2. Check Report model has booted() method with event listeners
3. Check NotificationService is imported in Report model
4. Check database logs for errors
5. Verify officers exist in system (role = 'petugas')

### Notifications not showing in API

1. Verify user_id matches authenticated officer
2. Check notification created_at is not in future
3. Verify status is not 'hidden'
4. Check filters are correct (category, status, priority)
5. Check pagination (page, per_page)

### Wrong notification content

1. Verify report data is correct
2. Check report.category relationship loaded
3. Verify NotificationService methods are called correctly
4. Check database values match expected enums
