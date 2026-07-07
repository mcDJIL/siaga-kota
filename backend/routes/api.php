<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function (): void {
    Route::prefix('auth')->controller(AuthController::class)->group(function (): void {
        Route::post('register', 'register');
        Route::post('login', 'login');

        Route::middleware('auth:sanctum')->group(function (): void {
            Route::post('logout', 'logout');
            Route::get('me', 'me');
            Route::patch('me', 'updateMe');
        });
    });

    Route::middleware(['auth:sanctum', 'role:warga'])->prefix('public')->group(function (): void {
        // route warga nanti di langkah fitur berikutnya
    });

    Route::middleware(['auth:sanctum', 'role:petugas'])->prefix('ops')->group(function (): void {
        // route petugas nanti di langkah fitur berikutnya
    });

    Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function (): void {
        // route admin nanti di langkah fitur berikutnya
    });
});
