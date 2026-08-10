# M4 — Realtime (Reverb) & Web Push: Panduan Integrasi Frontend

Dokumen ini menjelaskan cara menyambungkan frontend ke fitur realtime dan notifikasi
push yang sudah tersedia di backend.

Ada **dua sistem berbeda** di sini, dan penting untuk tidak menyamakannya:

| | Reverb (WebSocket) | Web Push (VAPID) |
|---|---|---|
| Aplikasi **terbuka** | ✅ | ✅ |
| Aplikasi **tertutup** | ❌ | ✅ |
| Butuh service worker | Tidak | Ya |
| Butuh izin browser | Tidak | Ya |
| Dipakai untuk | Update dashboard, tabel, peta | Peringatan banjir |

Aturan praktisnya: **Reverb** untuk memperbarui UI yang sedang dilihat pengguna,
**Web Push** untuk peringatan penting yang harus sampai walau aplikasi ditutup.

---

## Bagian 1 — Reverb (WebSocket)

### 1.1 Pasang dependensi

```bash
npm install laravel-echo pusher-js
```

Reverb kompatibel dengan protokol Pusher, jadi `pusher-js` tetap dipakai sebagai driver.

### 1.2 Variabel environment frontend

Tambahkan ke `.env` **frontend** (bukan backend):

```env
VITE_REVERB_APP_KEY=siagakota-key
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

Nilai di atas untuk development. Nilainya harus sama dengan `REVERB_APP_KEY`,
`REVERB_HOST`, `REVERB_PORT`, dan `REVERB_SCHEME` di `.env` backend.

Untuk produksi nanti berubah menjadi domain publik dan `https`:

```env
VITE_REVERB_HOST=ws.siagakota.id
VITE_REVERB_PORT=443
VITE_REVERB_SCHEME=https
```

### 1.3 Inisialisasi Echo

Buat `src/lib/echo.js`:

```js
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const AUTH_TOKEN_KEY = 'siagakota_auth_token'

export function createEcho() {
  const token = window.localStorage.getItem(AUTH_TOKEN_KEY)

  if (!token) {
    return null
  }

  return new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: Number(import.meta.env.VITE_REVERB_PORT ?? 8080),
    wssPort: Number(import.meta.env.VITE_REVERB_PORT ?? 443),
    forceTLS: import.meta.env.VITE_REVERB_SCHEME === 'https',
    enabledTransports: ['ws', 'wss'],

    // PENTING: endpoint otorisasi ada di /api/broadcasting/auth,
    // bukan /broadcasting/auth (default Echo).
    authEndpoint: `${API_BASE_URL}/api/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  })
}
```

**Dua hal yang sering bikin gagal:**

1. `authEndpoint` harus `/api/broadcasting/auth`. Backend memindahkannya ke grup
   `api` karena frontend dan backend beda domain sehingga memakai Bearer token,
   bukan session cookie.
2. Header `Authorization` wajib diisi. Tanpa itu semua channel privat ditolak `401`.

### 1.4 Daftar channel

Semua channel bersifat **private**. Di Echo gunakan `.private('nama')` — Echo
otomatis menambahkan prefix `private-`, jadi jangan tulis prefiksnya sendiri.

| Channel | Siapa yang boleh | Isi |
|---|---|---|
| `user.{userId}` | Pemilik ID itu saja | Notifikasi personal |
| `city.reports` | `petugas` dan `admin` | Feed laporan kota |
| `ops.{userId}.assignments` | Petugas ybs saja | Penugasan laporan |
| `city.flood` | Semua user aktif | Update risiko banjir |
| `city.announcements` | Semua user aktif | Pengumuman baru |

Jika role tidak sesuai, backend membalas `403` dan Echo memicu error subscription.

### 1.5 Daftar event & payload

Nama event memakai `broadcastAs`, sehingga di Echo **wajib diawali titik**:
`.listen('.report.created', ...)`. Tanpa titik, Echo akan mencari nama kelas PHP
lengkap dan tidak akan cocok.

#### `.report.created` → `city.reports`

Laporan baru dibuat warga.

```json
{
  "id": "01k2xy...",
  "code": "SK-2026-001",
  "title": "Sampah menumpuk di pinggir jalan",
  "status": "menunggu",
  "priority": "sedang",
  "category": "sampah",
  "address": "Jl. Sumbersari No. 10",
  "is_emergency": false,
  "created_at": "2026-08-10T14:23:00+07:00"
}
```

#### `.report.status-changed` → `city.reports` **dan** `user.{pelapor}`

Status laporan berubah. Dikirim ke dua channel sekaligus: feed kota (agar tabel
petugas/admin ikut berubah) dan channel personal pelapor (agar warga tahu progres).

```json
{
  "id": "01k2xy...",
  "code": "SK-2026-001",
  "title": "Sampah menumpuk di pinggir jalan",
  "from_status": "menunggu",
  "to_status": "diproses",
  "resolution_note": null,
  "updated_at": "2026-08-10T15:00:00+07:00"
}
```

#### `.report.assigned` → `ops.{petugas}.assignments` **dan** `city.reports`

Laporan ditugaskan ke petugas.

```json
{
  "id": "01k2xy...",
  "code": "FLD-2026-012",
  "title": "Genangan di depan pasar",
  "status": "diverifikasi",
  "priority": "tinggi",
  "category": "banjir",
  "address": "Jl. Gajah Mada",
  "assigned_to": "01k2ab..."
}
```

Catatan: penugasan **tidak** mengubah status laporan. Perubahan status adalah aksi
terpisah, sesuai keputusan di PLAN agar poin warga tidak diberikan terlalu dini.

#### `.report.marked-emergency` → `city.reports`

Laporan ditandai darurat. Hanya dikirim saat **menjadi** darurat, tidak saat dibatalkan.

```json
{
  "id": "01k2xy...",
  "code": "FLD-2026-012",
  "title": "Genangan di depan pasar",
  "is_emergency": true,
  "priority": "mendesak"
}
```

#### `.flood.risk-updated` → `city.flood`

Prediksi risiko banjir diperbarui.

```json
{
  "zones": [
    { "name": "Zona Sumbersari", "risk_level": "tinggi", "risk_index": 88 }
  ],
  "generated_at": "2026-08-10T12:00:00+07:00"
}
```

`risk_level` bernilai `tinggi`, `sedang`, atau `rendah`.

#### `.announcement.published` → `city.announcements`

Pengumuman dipublikasikan. Draft **tidak** disiarkan, dan menerbitkan ulang
pengumuman yang sudah publik juga tidak menyiarkan lagi.

```json
{
  "id": "01k2xy...",
  "title": "Peringatan Cuaca Ekstrem",
  "type": "warning",
  "audience": "warga",
  "audience_value": null,
  "published_at": "2026-08-10T09:00:00+07:00",
  "expires_at": null
}
```

`type`: `info` | `warning` | `weather`.
`audience`: `all` | `warga` | `petugas` | `rw` | `zone`.

### 1.6 Contoh pemakaian

Dashboard petugas:

```js
import { useEffect } from 'react'
import { createEcho } from '../lib/echo'

export function useReportFeed(onReportCreated, onStatusChanged) {
  useEffect(() => {
    const echo = createEcho()

    if (!echo) return

    const channel = echo.private('city.reports')

    channel.listen('.report.created', onReportCreated)
    channel.listen('.report.status-changed', onStatusChanged)

    return () => {
      channel.stopListening('.report.created')
      channel.stopListening('.report.status-changed')
      echo.leave('city.reports')
      echo.disconnect()
    }
  }, [onReportCreated, onStatusChanged])
}
```

Notifikasi personal warga:

```js
const echo = createEcho()

echo.private(`user.${currentUser.id}`)
  .listen('.report.status-changed', (payload) => {
    toast.info(`Laporan ${payload.code} kini berstatus ${payload.to_status}`)
  })
```

**Selalu panggil `echo.leave()` dan `echo.disconnect()` saat unmount.** Tanpa itu
koneksi menumpuk setiap kali komponen di-render ulang.

### 1.7 Payload sengaja ringkas

Event tidak memuat `description`, `body`, atau relasi lengkap. Ini disengaja agar
lalu lintas WebSocket tetap kecil. Pola yang disarankan:

1. Terima event realtime.
2. Perbarui baris di tabel/daftar dengan data ringkas tersebut, **atau**
3. Panggil endpoint REST detail bila pengguna membuka halaman detail.

---

## Bagian 2 — Web Push (VAPID)

### 2.1 Prasyarat

- Halaman harus dilayani lewat **HTTPS** (kecuali `localhost` yang dikecualikan browser).
- Butuh **service worker**.
- Butuh **izin notifikasi** dari pengguna.
- Backend harus punya kunci VAPID. Bila belum, minta backend menjalankan
  `php artisan webpush:vapid` lalu menaruh hasilnya di `.env`.

Tambahkan kunci publiknya ke `.env` frontend:

```env
VITE_VAPID_PUBLIC_KEY=BPMElpsjKhI4QwWhJzJRyLVn96ABG2sm...
```

Hanya kunci **publik** yang boleh masuk frontend. Kunci privat tetap di backend.

### 2.2 Service worker

Buat `public/sw.js`:

```js
self.addEventListener('push', (event) => {
  if (!event.data) return

  const payload = event.data.json()

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      // tag sama membuat notifikasi baru MENGGANTIKAN yang lama,
      // sehingga peringatan tidak menumpuk di perangkat.
      tag: payload.tag,
      data: { url: payload.url },
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const url = event.notification.data?.url ?? '/'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      // Fokuskan tab yang sudah terbuka bila ada.
      for (const client of list) {
        if (client.url.includes(url) && 'focus' in client) {
          return client.focus()
        }
      }
      return clients.openWindow(url)
    })
  )
})
```

### 2.3 Mendaftarkan langganan

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const AUTH_TOKEN_KEY = 'siagakota_auth_token'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = window.atob(base64)
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)))
}

export async function subscribeToPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new Error('Browser tidak mendukung notifikasi push.')
  }

  const permission = await Notification.requestPermission()

  if (permission !== 'granted') {
    throw new Error('Izin notifikasi ditolak.')
  }

  const registration = await navigator.serviceWorker.register('/sw.js')

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      import.meta.env.VITE_VAPID_PUBLIC_KEY
    ),
  })

  const token = window.localStorage.getItem(AUTH_TOKEN_KEY)
  const json = subscription.toJSON()

  const response = await fetch(`${API_BASE_URL}/api/v1/auth/push/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      endpoint: json.endpoint,
      keys: {
        p256dh: json.keys.p256dh,
        auth: json.keys.auth,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('Gagal mendaftarkan langganan notifikasi.')
  }

  return response.json()
}
```

### 2.4 Endpoint backend

#### `POST /api/v1/auth/push/subscribe`

Butuh Bearer token.

Body:

```json
{
  "endpoint": "https://fcm.googleapis.com/fcm/send/xxxxx",
  "keys": {
    "p256dh": "BNcRdreALRFXTkOO...",
    "auth": "tBHItJI5svbpez7KI4CCXg=="
  },
  "content_encoding": "aes128gcm"
}
```

`content_encoding` opsional, default `aes128gcm`.

Response `201`:

```json
{
  "data": { "id": "01k2xy...", "endpoint": "https://fcm.googleapis.com/..." },
  "message": "Langganan notifikasi berhasil didaftarkan."
}
```

Endpoint bersifat **idempoten**. Mendaftarkan endpoint yang sama berulang kali
tidak menghasilkan duplikat, jadi aman dipanggil setiap kali aplikasi dibuka.

#### `DELETE /api/v1/auth/push/subscribe`

Menghapus satu perangkat:

```json
{ "endpoint": "https://fcm.googleapis.com/fcm/send/xxxxx" }
```

Menghapus **semua** perangkat pengguna: kirim tanpa body. Berguna saat logout atau
saat pengguna mematikan seluruh notifikasi.

Response `200`:

```json
{ "data": { "deleted": 2 }, "message": "Langganan notifikasi berhasil dihentikan." }
```

### 2.5 Bentuk payload push yang diterima

```json
{
  "title": "Peringatan Banjir: Risiko Tinggi",
  "body": "Risiko banjir tinggi terdeteksi di Zona Sumbersari. Segera lakukan tindakan pencegahan.",
  "url": "/warga/prediksi",
  "tag": "flood-alert",
  "risk_index": 88
}
```

Saat ini push hanya dikirim untuk **peringatan banjir risiko tinggi**. Risiko sedang
dan rendah tidak memicu push, hanya update lewat Reverb.

### 2.6 Preferensi pengguna

Backend menghormati `settings.notif.critical_flood` pada profil pengguna. Bila
bernilai `false`, pengguna tidak menerima push banjir meski langganannya terdaftar.
Nilai default adalah `true`.

Untuk mengubahnya, kirim lewat `PATCH /api/v1/auth/me`:

```json
{
  "settings": {
    "notif": { "critical_flood": false }
  }
}
```

---

## Bagian 3 — Menjalankan & menguji

### 3.1 Server Reverb

Backend menjalankan Reverb sebagai container terpisah:

```bash
docker compose -f compose-dev.yaml up -d reverb
```

Verifikasi:

```bash
docker compose -f compose-dev.yaml logs reverb
# Harus muncul: INFO  Starting server on 0.0.0.0:8080
```

Port `8080` sudah dipublikasikan ke host, jadi browser bisa mengaksesnya lewat
`ws://localhost:8080`.

### 3.2 Memicu event untuk pengujian

Cara termudah adalah lewat aksi nyata di aplikasi:

| Event | Cara memicu |
|---|---|
| `.report.created` | Warga membuat laporan baru |
| `.report.status-changed` | Petugas mengubah status laporan |
| `.report.assigned` | Petugas menugaskan laporan |
| `.report.marked-emergency` | Petugas menandai laporan darurat |
| `.announcement.published` | Admin mempublikasikan pengumuman |

### 3.3 Checklist saat bermasalah

**Koneksi WebSocket gagal**
- Container `reverb` berjalan? Cek `docker compose ps`
- `VITE_REVERB_APP_KEY` sama persis dengan `REVERB_APP_KEY` backend?
- Di produksi, `VITE_REVERB_SCHEME` harus `https`. Halaman HTTPS tidak boleh
  membuka koneksi `ws://` — browser memblokirnya sebagai mixed content.

**Subscribe channel ditolak 403**
- Role pengguna sesuai? `city.reports` hanya untuk `petugas` dan `admin`.
- Untuk `user.{id}`, ID harus milik pengguna yang sedang login.

**Subscribe channel ditolak 401**
- Header `Authorization` belum terpasang di konfigurasi `auth.headers` Echo.
- `authEndpoint` masih `/broadcasting/auth`; seharusnya `/api/broadcasting/auth`.

**Event tidak sampai padahal koneksi hijau**
- Nama event kurang titik di depan. Harus `.report.created`, bukan `report.created`.
- Nama channel diberi prefix ganda. Tulis `city.reports`, bukan `private-city.reports`.

**Push tidak muncul**
- Kunci VAPID di backend masih kosong. Backend akan melewati pengiriman dan
  mencatat peringatan di log, tanpa melempar error.
- Halaman bukan HTTPS dan bukan `localhost`.
- Izin notifikasi ditolak, atau diblokir permanen di pengaturan browser.

---

## Bagian 4 — Status & batasan

**Sudah siap di backend:**
- 5 channel privat dengan otorisasi berbasis peran
- 6 event broadcast
- Endpoint langganan push (subscribe & unsubscribe)
- Pengiriman push massal via queue, dengan penghapusan otomatis langganan mati

**Belum ada dan perlu dikerjakan frontend:**
- Instalasi `laravel-echo` dan `pusher-js`
- Service worker (`public/sw.js`)
- UI izin notifikasi
- Pemanggilan `subscribeToPush()` setelah login

**Belum terverifikasi ujung-ke-ujung:**

Backend sudah diuji sampai lapisan pengiriman, dan koneksi WebSocket ke Reverb
sudah dibuktikan berhasil (handshake, subscribe channel, dan penerimaan event).
Namun **pengiriman push ke perangkat nyata lewat FCM/Mozilla belum pernah diuji**,
karena membutuhkan browser sungguhan dengan service worker aktif. Pengujian itu
perlu dilakukan bersama saat frontend sudah siap.
