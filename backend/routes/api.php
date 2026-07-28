<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function (): void {
    Route::prefix('auth')->controller(AuthController::class)->group(function (): void {
        Route::post('register', 'register')->middleware('throttle:auth');
        Route::post('login', 'login')->middleware('throttle:auth');

        Route::middleware('auth:sanctum')->group(function (): void {
            Route::post('logout', 'logout');
            Route::get('me', 'me');
            Route::patch('me', 'updateMe');
        });
    });

    Route::middleware(['auth:sanctum', 'role:warga,sanctum', 'throttle:warga'])
        ->prefix('public')
        ->group(function (): void {
            Route::controller(\App\Http\Controllers\Public\ReportController::class)
                ->prefix('reports')
                ->group(function (): void {
                    Route::get('/', 'index');
                    Route::post('/', 'store');
                    Route::get('/{id}', 'show');
                });
        });

    Route::middleware(['auth:sanctum', 'role:petugas,sanctum', 'throttle:petugas'])
        ->prefix('ops')
        ->group(function (): void {});

    Route::middleware(['auth:sanctum', 'role:admin,sanctum', 'throttle:admin'])
        ->prefix('admin')
        ->group(function (): void {
            // route admin nanti di langkah fitur berikutnya
        });

    Route::middleware('throttle:internal')
        ->prefix('internal')
        ->group(function (): void {
            // route internal nanti pakai middleware service token, bukan Sanctum
        });
});
