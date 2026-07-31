<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Snapshot metrik Horizon. Tanpa ini dashboard metrik Horizon tetap kosong.
Schedule::command('horizon:snapshot')
    ->everyFiveMinutes()
    ->onOneServer();
