<?php

namespace App\Http\Controllers\Ops;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Daftar notifikasi petugas (tab: alert/laporan_baru/sistem/maintenance).
     *
     * @group Ops - Notifications
     * @authenticated
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $notifications = Notification::query()
            ->where('user_id', $user->id)
            ->byCategory($request->query('category'))
            ->byStatus($request->query('status'))
            ->byPriority($request->query('priority'))
            ->with('report.category')
            ->orderByDesc('created_at')
            ->paginate($request->integer('per_page', 20));

        $unreadCount = Notification::query()
            ->where('user_id', $user->id)
            ->where('status', 'unread')
            ->count();

        return response()->json([
            'data' => [
                'notifications' => $notifications->getCollection()->map(fn (Notification $notification) => [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'category' => $notification->category,
                    'title' => $notification->title,
                    'description' => $notification->description,
                    'time' => NotificationService::getTimeString($notification->created_at),
                    'status' => $notification->status,
                    'priority' => $notification->priority,
                    'reportRoute' => $this->resolveReportRoute($notification),
                    'createdAt' => $notification->created_at->toIso8601String(),
                ])->values(),
                'total' => $notifications->total(),
                'page' => $notifications->currentPage(),
                'per_page' => $notifications->perPage(),
                'unread_count' => $unreadCount,
            ],
        ]);
    }

    /**
     * @group Ops - Notifications
     * @authenticated
     */
    public function markAsRead(Request $request, string $id): JsonResponse
    {
        $notification = $this->findOwnedNotification($request, $id);

        $notification->markAsRead();

        return $this->respondWithStatus($notification, 'Notifikasi berhasil ditandai sebagai dibaca.');
    }

    /**
     * @group Ops - Notifications
     * @authenticated
     */
    public function confirm(Request $request, string $id): JsonResponse
    {
        $notification = $this->findOwnedNotification($request, $id);

        $notification->markAsConfirmed();

        return $this->respondWithStatus($notification, 'Notifikasi berhasil dikonfirmasi.');
    }

    /**
     * @group Ops - Notifications
     * @authenticated
     */
    public function hide(Request $request, string $id): JsonResponse
    {
        $notification = $this->findOwnedNotification($request, $id);

        $notification->hide();

        return $this->respondWithStatus($notification, 'Notifikasi berhasil disembunyikan.');
    }

    private function findOwnedNotification(Request $request, string $id): Notification
    {
        return Notification::query()
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();
    }

    private function respondWithStatus(Notification $notification, string $message): JsonResponse
    {
        return response()->json([
            'data' => [
                'notification' => [
                    'id' => $notification->id,
                    'status' => $notification->status,
                ],
            ],
            'message' => $message,
        ]);
    }

    private function resolveReportRoute(Notification $notification): ?string
    {
        if (! $notification->report_id) {
            return null;
        }

        return $notification->report?->category?->slug === 'banjir'
            ? "/officer/reports/flood/{$notification->report_id}"
            : "/officer/reports/waste/{$notification->report_id}";
    }
}
