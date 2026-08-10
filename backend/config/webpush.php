<?php

return [

    /*
    |--------------------------------------------------------------------------
    | VAPID Keys
    |--------------------------------------------------------------------------
    |
    | Kunci VAPID mengidentifikasi server ini ke push service (FCM, Mozilla,
    | dsb). Buat sekali dengan `php artisan webpush:vapid`, lalu simpan hasilnya
    | di .env. Kunci privat TIDAK BOLEH dibagikan ke frontend.
    |
    */

    'vapid' => [
        'subject' => env('VAPID_SUBJECT', env('APP_URL', 'http://localhost')),
        'public_key' => env('VAPID_PUBLIC_KEY'),
        'private_key' => env('VAPID_PRIVATE_KEY'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Opsi Pengiriman
    |--------------------------------------------------------------------------
    |
    | TTL menentukan berapa lama push service menahan notifikasi bila perangkat
    | sedang offline. Urgency dan topic mengikuti Web Push Protocol; `topic`
    | membuat notifikasi baru menggantikan yang lama alih-alih menumpuk.
    |
    */

    'ttl' => env('WEBPUSH_TTL', 3600),

    'urgency' => env('WEBPUSH_URGENCY', 'normal'),

    /*
    |--------------------------------------------------------------------------
    | Ukuran Batch
    |--------------------------------------------------------------------------
    |
    | Jumlah langganan yang diproses per chunk saat mengirim notifikasi massal,
    | sesuai PLAN §8 (chunk 1000).
    |
    */

    'batch_size' => env('WEBPUSH_BATCH_SIZE', 1000),

];
