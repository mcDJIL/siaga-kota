<?php

namespace App\Http\Controllers\Officer;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * @group Officer Notifications
     * @authenticated
     * Get all notifications for authenticated officer with filtering
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        // Get query parameters
        $category = $request->query('category');
        $status = $request->query('status');
        $priority = $request->query('priority');
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 20);

        // For now, return mock data (will integrate with real notifications later)
        $notifications = $this->getMockNotifications($user->id);

        // Apply filters
        if ($category && $category !== 'semua') {
            $notifications = array_filter($notifications, function ($n) use ($category) {
                return $n['category'] === $category;
            });
        }

        if ($status && $status !== 'semua') {
            $notifications = array_filter($notifications, function ($n) use ($status) {
                return $n['status'] === $status;
            });
        }

        if ($priority && $priority !== 'semua') {
            $notifications = array_filter($notifications, function ($n) use ($priority) {
                return $n['priority'] === $priority;
            });
        }

        // Pagination
        $total = count($notifications);
        $notifications = array_slice($notifications, ($page - 1) * $perPage, $perPage);

        return response()->json([
            'data' => [
                'notifications' => array_values($notifications),
                'total' => $total,
                'page' => $page,
                'per_page' => $perPage,
                'unread_count' => $this->getUnreadCount($user->id),
            ],
        ]);
    }

    /**
     * @group Officer Notifications
     * @authenticated
     * Mark notification as read
     */
    public function markAsRead(Request $request, string $id): JsonResponse
    {
        // Mock update - in production, update notification in database
        return response()->json([
            'data' => [
                'notification' => [
                    'id' => $id,
                    'status' => 'read',
                ],
            ],
            'message' => 'Notifikasi berhasil ditandai sebagai dibaca.',
        ]);
    }

    /**
     * @group Officer Notifications
     * @authenticated
     * Mark notification as confirmed
     */
    public function confirm(Request $request, string $id): JsonResponse
    {
        return response()->json([
            'data' => [
                'notification' => [
                    'id' => $id,
                    'status' => 'confirmed',
                ],
            ],
            'message' => 'Notifikasi berhasil dikonfirmasi.',
        ]);
    }

    /**
     * @group Officer Notifications
     * @authenticated
     * Hide notification
     */
    public function hide(Request $request, string $id): JsonResponse
    {
        return response()->json([
            'data' => [
                'notification' => [
                    'id' => $id,
                    'status' => 'hidden',
                ],
            ],
            'message' => 'Notifikasi berhasil disembunyikan.',
        ]);
    }

    /**
     * Get mock notifications for testing
     */
    private function getMockNotifications(string $userId): array
    {
        return [
            [
                'id' => 'n-1',
                'type' => 'alert',
                'category' => 'peringatan-banjir',
                'title' => 'Peringatan: Level air di Pintu Air Manggarai mencapai Siaga 2. Segera koordinasi tim lapangan.',
                'time' => '2 menit yang lalu',
                'status' => 'unread',
                'priority' => 'high',
                'reportRoute' => '/officer/reports/flood/FL-2201',
                'createdAt' => now()->subMinutes(2),
            ],
            [
                'id' => 'n-2',
                'type' => 'new-report',
                'category' => 'laporan-baru',
                'title' => 'Laporan Baru #SK-9283: Tumpukan sampah di Jl. Sudirman telah masuk. Butuh verifikasi petugas.',
                'time' => '15 menit yang lalu',
                'status' => 'unread',
                'priority' => 'medium',
                'reportRoute' => '/officer/reports/waste/SK-9283',
                'createdAt' => now()->subMinutes(15),
            ],
            [
                'id' => 'n-3',
                'type' => 'system',
                'category' => 'sistem',
                'title' => 'Laporan #SK-8821 telah berhasil diselesaikan oleh Petugas Ahmad.',
                'time' => '1 jam yang lalu',
                'status' => 'read',
                'priority' => 'low',
                'reportRoute' => '/officer/reports/waste/SK-8821',
                'createdAt' => now()->subHours(1),
            ],
            [
                'id' => 'n-4',
                'type' => 'maintenance',
                'category' => 'maintenance',
                'title' => 'Jadwal pemeliharaan sensor drainase wilayah Jakarta Pusat besok pukul 08:00 WIB.',
                'time' => '3 jam yang lalu',
                'status' => 'read',
                'priority' => 'medium',
                'createdAt' => now()->subHours(3),
            ],
            [
                'id' => 'n-5',
                'type' => 'new-report',
                'category' => 'laporan-baru',
                'title' => 'Laporan Baru #SK-9270: Sampah menumpuk di area Tebet Barat. Butuh verifikasi petugas.',
                'time' => '5 jam yang lalu',
                'status' => 'unread',
                'priority' => 'medium',
                'reportRoute' => '/officer/reports/waste/SK-9270',
                'createdAt' => now()->subHours(5),
            ],
            [
                'id' => 'n-6',
                'type' => 'alert',
                'category' => 'peringatan-banjir',
                'title' => 'Peringatan: Level air di Kali Ciliwung mencapai Siaga 3. Evakuasi warga sekitar bantaran.',
                'time' => '6 jam yang lalu',
                'status' => 'unread',
                'priority' => 'high',
                'reportRoute' => '/officer/reports/flood/FL-2198',
                'createdAt' => now()->subHours(6),
            ],
            [
                'id' => 'n-7',
                'type' => 'system',
                'category' => 'sistem',
                'title' => 'Laporan #SK-8790 telah berhasil diselesaikan oleh Petugas Rina.',
                'time' => '8 jam yang lalu',
                'status' => 'read',
                'priority' => 'low',
                'reportRoute' => '/officer/reports/waste/SK-8790',
                'createdAt' => now()->subHours(8),
            ],
        ];
    }

    /**
     * Get unread notification count
     */
    private function getUnreadCount(string $userId): int
    {
        return count(array_filter($this->getMockNotifications($userId), function ($n) {
            return $n['status'] === 'unread';
        }));
    }
}
