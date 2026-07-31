<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Ops\ActivityMapController as OpsActivityMapController;
use App\Http\Controllers\Ops\DashboardController as OpsDashboardController;
use App\Http\Controllers\Ops\NotificationController as OpsNotificationController;
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
            Route::delete('me', 'destroy');
            Route::post('me/avatar', 'uploadAvatar');
            Route::patch('me/password', 'updatePassword');
            Route::post('push/subscribe', 'subscribePush');
            Route::delete('push/subscribe', 'unsubscribePush');
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
            Route::get('/dashboard', [OpsDashboardController::class, 'index']);

            Route::controller(OpsActivityMapController::class)
                ->prefix('activity-map')
                ->group(function (): void {
                    Route::get('/tasks', 'getActiveTasks');
                    Route::get('/officers', 'getOfficers');
                    Route::get('/officers/{id}', 'getOfficer');
                    Route::post('/tasks/{reportId}/assign', 'assignOfficer');
                    Route::get('/statistics', 'getStatistics');
                });

            // Alias sesuai PLAN §6.3: GET /ops/map/tasks
            Route::get('/map/tasks', [OpsActivityMapController::class, 'getActiveTasks']);

            Route::controller(OpsNotificationController::class)
                ->prefix('notifications')
                ->group(function (): void {
                    Route::get('/', 'index');
                    Route::patch('/{id}/read', 'markAsRead');
                    Route::patch('/{id}/confirm', 'confirm');
                    Route::patch('/{id}/hide', 'hide');
                });
            Route::controller(OpsReportController::class)
                ->prefix('reports')
                ->group(function (): void {
                    Route::get('/', 'index');
                    Route::get('/waste', 'wasteReports');
                    Route::get('/flood', 'floodReports');
                    Route::get('/{id}', 'show');
                    Route::get('/{id}/export', 'export');
                    Route::patch('/{id}/status', 'updateStatus');
                    Route::post('/{id}/attachments', 'uploadHandlingPhotos');
                    Route::post('/{id}/handling', 'storeHandling');
                    Route::patch('/{id}/emergency', 'toggleEmergency');
                    Route::post('/{id}/emergency', 'markEmergency');
                    Route::post('/{id}/assign', 'assign');
                });

            Route::get('/operators', [OpsReportController::class, 'operators']);
        });

    Route::middleware(['auth:sanctum', 'role:admin,sanctum', 'throttle:admin'])
        ->prefix('government')
        ->group(function (): void {
            Route::controller(\App\Http\Controllers\Government\DashboardController::class)
                ->prefix('dashboard')
                ->group(function (): void {
                    Route::get('/stats', 'getDashboardStats');
                    Route::get('/trends', 'getMonthlyTrend');
                    Route::get('/reports', 'getRecentReports');
                    Route::get('/departments', 'getDepartmentPerformance');
                    Route::get('/announcements', 'getAnnouncements');
                });

            Route::controller(\App\Http\Controllers\Government\WasteReportController::class)
                ->prefix('waste-reports')
                ->group(function (): void {
                    Route::get('/stats', 'getWasteReportStats');
                    Route::get('/categories', 'getWasteCategoryDistribution');
                    Route::get('/districts', 'getDistrictReportStats');
                    Route::get('/recent', 'getRecentWasteReports');
                });

            Route::controller(\App\Http\Controllers\Government\FloodReportController::class)
                ->prefix('flood-reports')
                ->group(function (): void {
                    Route::get('/stats', 'getFloodReportStats');
                    Route::get('/districts', 'getDistrictFloodDistribution');
                    Route::get('/severity', 'getFloodSeverityDistribution');
                    Route::get('/recent', 'getRecentFloodReports');
                    Route::patch('/{id}/verify', 'verifyReport');
                    Route::patch('/{id}/status', 'updateReportStatus');
                });

            Route::controller(\App\Http\Controllers\Government\ActivityMapController::class)
                ->prefix('activity-map')
                ->group(function (): void {
                    Route::get('/data', 'getMapData');
                    Route::post('/export', 'exportReport');
                    Route::post('/update-district-stats', 'updateDistrictStats');
                });

            Route::controller(\App\Http\Controllers\Government\AIPredictionController::class)
                ->prefix('ai-predictions')
                ->group(function (): void {
                    Route::get('/', 'index');
                });

            Route::controller(\App\Http\Controllers\Government\AnnouncementController::class)
                ->prefix('announcements')
                ->group(function (): void {
                    Route::get('/', 'index');
                    Route::post('/', 'store');
                    Route::get('/{id}', 'show');
                    Route::patch('/{id}', 'update');
                    Route::delete('/{id}', 'destroy');
                    Route::post('/{id}/publish', 'publish');
                    Route::post('/{id}/archive', 'archive');
                    Route::get('/public/get', 'getPublic');
                });

            Route::controller(\App\Http\Controllers\Government\UserManagementController::class)
                ->prefix('users')
                ->group(function (): void {
                    Route::get('/', 'index');
                    Route::post('/', 'store');
                    Route::get('/statistics', 'getStatistics');
                    Route::get('/{id}', 'show');
                    Route::patch('/{id}', 'update');
                    Route::post('/{id}/toggle-status', 'toggleStatus');
                    Route::delete('/{id}', 'destroy');
                });

            Route::get('/departments', [\App\Http\Controllers\Government\DepartmentController::class, 'index']);

            Route::controller(\App\Http\Controllers\Government\ExportDataController::class)
                ->prefix('export-data')
                ->group(function (): void {
                    Route::get('/', 'index');
                    Route::post('/', 'store');
                    Route::get('/{id}/download', 'download');
                });
        });

    // Public announcements endpoint
    Route::controller(\App\Http\Controllers\Government\AnnouncementController::class)
        ->prefix('announcements')
        ->group(function (): void {
            Route::get('/public/get', 'getPublic');
        });

    Route::middleware('throttle:internal')
        ->prefix('internal')
        ->group(function (): void {
            // route internal nanti pakai middleware service token, bukan Sanctum
        });
});
