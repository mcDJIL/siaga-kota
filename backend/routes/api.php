<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Officer\ReportController;
use App\Http\Controllers\Ops\ReportController as OpsReportController;
use App\Http\Controllers\Public\DistrictLookupController;
use App\Http\Controllers\Public\FloodPredictionController;
use App\Http\Controllers\Public\MapController;
use App\Http\Controllers\Public\ReportController as PublicReportController;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function (): void {
    Route::prefix('auth')->controller(AuthController::class)->group(function (): void {
        Route::post('register', 'register')->middleware('throttle:auth');
        Route::post('login', 'login')->middleware('throttle:auth');
        Route::post('forgot-password', 'forgotPassword');
        Route::post('reset-password', 'resetPassword');

        Route::middleware('auth:sanctum')->group(function (): void {
            Route::post('logout', 'logout');
            Route::get('me', 'me');
            Route::patch('me', 'updateMe');
            Route::patch('me/password', 'updatePassword');
        });
    });

    // all authenticated users
    Route::middleware(['auth:sanctum', 'throttle:warga'])
        ->prefix('map')
        ->controller(MapController::class)
        ->group(function (): void {
            Route::get('/points', 'points');
            Route::get('/heatmap', 'heatmap');
        });

    // warga only
    Route::middleware(['auth:sanctum', 'role:warga,sanctum', 'throttle:warga'])
        ->prefix('public')
        ->group(function (): void {
            Route::get('districts', [DistrictLookupController::class, 'index']);
            Route::post('flood-prediction', [FloodPredictionController::class, 'predict']);
            Route::controller(PublicReportController::class)
                ->prefix('reports')
                ->group(function (): void {
                    Route::get('/', 'index');
                    Route::post('/', 'store');
                    Route::get('/{id}', 'show');
                });
            });
                
    Route::middleware(['auth:sanctum', 'role:petugas,sanctum', 'throttle:petugas'])
        ->prefix('ops')
        ->group(function (): void {
            Route::controller(ReportController::class)
                ->prefix('reports')
                ->group(function (): void {
                    Route::get('/', 'index');
                    Route::get('/waste', 'wasteReports');
                    Route::get('/flood', 'floodReports');
                    Route::get('/{id}', 'show');
                    Route::patch('/{id}/emergency', 'toggleEmergency');
                    Route::post('/{id}/handling', 'storeHandling');
                });

            Route::controller(\App\Http\Controllers\Officer\ActivityMapController::class)
                ->prefix('activity-map')
                ->group(function (): void {
                    Route::get('/tasks', 'getActiveTasks');
                    Route::get('/officers', 'getOfficers');
                    Route::get('/officers/{id}', 'getOfficer');
                    Route::post('/tasks/{reportId}/assign', 'assignOfficer');
                    Route::get('/statistics', 'getStatistics');
                });
            Route::controller(OpsReportController::class)
                ->prefix('reports')
                ->group(function (): void {
                    Route::get('/', 'index');
                    Route::get('/{id}', 'show');
                    Route::patch('/{id}/status', 'updateStatus');
                    Route::post('/{id}/attachments', 'uploadHandlingPhotos');
                    Route::post('/{id}/emergency', 'markEmergency');
                    Route::post('/{id}/assign', 'assign');
                });

            Route::get('/operators', [OpsReportController::class, 'operators']);
        });

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
