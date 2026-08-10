<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Minishlink\WebPush\VAPID;

class GenerateVapidKeys extends Command
{
    protected $signature = 'webpush:vapid';

    protected $description = 'Buat sepasang kunci VAPID untuk Web Push';

    public function handle(): int
    {
        if (config('webpush.vapid.public_key') && ! $this->option('no-interaction')) {
            $this->warn('Kunci VAPID sudah terisi di konfigurasi.');
            $this->line('Mengganti kunci akan membuat SELURUH langganan push yang ada tidak valid.');

            if (! $this->confirm('Tetap buat kunci baru?', false)) {
                return self::SUCCESS;
            }
        }

        $keys = VAPID::createVapidKeys();

        $this->newLine();
        $this->info('Kunci VAPID berhasil dibuat. Salin ke berkas .env:');
        $this->newLine();
        $this->line('VAPID_SUBJECT='.config('app.url'));
        $this->line('VAPID_PUBLIC_KEY='.$keys['publicKey']);
        $this->line('VAPID_PRIVATE_KEY='.$keys['privateKey']);
        $this->newLine();
        $this->comment('Kunci publik juga perlu dipakai frontend saat mendaftarkan langganan push.');
        $this->comment('Kunci privat bersifat rahasia dan tidak boleh dibagikan ke klien.');

        return self::SUCCESS;
    }
}
