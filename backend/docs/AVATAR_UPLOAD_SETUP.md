# Avatar Upload Implementation Guide

## Backend Setup

### 1. Storage Symlink
Avatar upload memerlukan symlink dari `public/storage` ke `storage/app/public` agar file bisa diakses publik.

```bash
php artisan storage:link
```

**Output yang diharapkan:**
```
The [public/storage] directory has been linked.
```

Jika sudah ada symlink:
```bash
rm public/storage
php artisan storage:link
```

### 2. File Permissions
Pastikan directory writable:

```bash
chmod -R 755 storage/app/public
chmod -R 755 storage/app/public/avatars
```

### 3. Environment Config
Verify di `.env`:
```
FILESYSTEM_DISK=public
APP_URL=http://localhost:8000
```

## API Endpoint

### Upload Avatar
**Endpoint:** `PATCH /api/v1/auth/me`

**Request:**
- Content-Type: `multipart/form-data`
- Authorization: `Bearer {token}`

**Form Fields:**
```
- avatar_path: File (image/jpeg, image/png, image/gif, image/webp)
  Max size: 5MB
```

**Example Response (Success):**
```json
{
  "data": {
    "user": {
      "id": "user-123",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "08123456789",
      "role": "petugas",
      "employee_id": "EMP001",
      "position": "Officer",
      "department": {
        "id": "dept-1",
        "name": "Traffic",
        "slug": "traffic",
        "type": "operational"
      },
      "avatar_path": "/storage/avatars/user-123/avatar_1234567890.jpg",
      "settings": {},
      "active": true
    }
  },
  "message": "Profil berhasil diperbarui."
}
```

**Error Response (File too large):**
```json
{
  "message": "The avatar path field must not be greater than 5120 kilobytes."
}
```

## Database

User table already has `avatar_path` column (nullable text):

```php
Schema::table('users', function (Blueprint $table) {
    $table->string('avatar_path')->nullable();
});
```

## Troubleshooting

### Issue: "avatar_path adalah null di database"

**Cause:** File tidak ter-upload ke storage

**Solutions:**

1. **Check storage permissions:**
   ```bash
   ls -la storage/app/public/avatars/
   ```
   Harus memiliki owner yang sesuai dengan web server (www-data, apache, etc)

2. **Check symlink:**
   ```bash
   ls -la public/storage
   ```
   Harus menunjuk ke `storage/app/public`

3. **Check Laravel logs:**
   ```bash
   tail -f storage/logs/laravel.log
   ```

4. **Manual test dengan curl:**
   ```bash
   curl -X PATCH http://localhost:8000/api/v1/auth/me \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -F "avatar_path=@/path/to/image.jpg"
   ```

### Issue: "File validation failed"

Ensure file adalah valid image:
- Format: JPEG, PNG, GIF, WebP
- Size: Max 5MB
- Mimetype: `image/*`

### Issue: "File not accessible from browser"

1. Check symlink creation: `php artisan storage:link`
2. Check .env: `APP_URL=http://localhost:8000`
3. Browser URL harus: `http://localhost:8000/storage/avatars/...`

## Frontend Integration

Avatar upload flow:

1. User select/drop image via ProfileImageUploader
2. Image dikompres client-side
3. File dikirim ke backend via FormData
4. Backend save file dan update avatar_path di database
5. Frontend reload profile data dan tampilkan avatar baru

### Frontend Components:
- `ProfileImageUploader` - Drag & drop / file picker
- `ProfileAvatarCard` - Display profile with avatar
- `useOfficerProfile` hook - Manage API calls

## Testing Avatar Upload

1. **Login sebagai officer**
   ```
   Email: officer@test.com
   Password: password
   ```

2. **Buka profile page:** `/officer/profile`

3. **Upload avatar:**
   - Klik foto profil (question mark icon)
   - Select atau drag image
   - Klik tombol "Simpan Perubahan"

4. **Verify:**
   - Check console untuk logs
   - Check database: `SELECT avatar_path FROM users WHERE email = 'officer@test.com'`
   - Check file system: `ls -la storage/app/public/avatars/`
   - Check browser: Avatar harus tampil dengan benar

## Database Migration (if needed)

Jika avatar_path belum ada di table users:

```php
Schema::table('users', function (Blueprint $table) {
    $table->string('avatar_path')->nullable()->after('position');
});
```

Run: `php artisan migrate`
