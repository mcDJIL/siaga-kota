<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Otorisasi channel privat Reverb sesuai PLAN §8. Callback mengembalikan
| true bila pengguna berhak mendengarkan channel tersebut.
|
*/

/**
 * Notifikasi personal: perubahan status laporan milik sendiri,
 * penugasan laporan, dan notifikasi in-app lain.
 */
Broadcast::channel('user.{userId}', function (User $user, string $userId): bool {
    return $user->id === $userId;
});

/**
 * Feed laporan kota untuk petugas dan admin: laporan baru,
 * perubahan status, penanda darurat.
 */
Broadcast::channel('city.reports', function (User $user): bool {
    return $user->hasAnyRole(['petugas', 'admin']);
});

/**
 * Penugasan laporan ke petugas tertentu.
 */
Broadcast::channel('ops.{userId}.assignments', function (User $user, string $userId): bool {
    return $user->id === $userId && $user->hasRole('petugas');
});

/**
 * Peringatan risiko banjir untuk seluruh pengguna terautentikasi.
 */
Broadcast::channel('city.flood', function (User $user): bool {
    return $user->active;
});

/**
 * Pengumuman yang baru dipublikasikan, untuk seluruh pengguna aktif.
 */
Broadcast::channel('city.announcements', function (User $user): bool {
    return $user->active;
});
