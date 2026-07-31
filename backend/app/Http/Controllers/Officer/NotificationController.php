<?php

namespace App\Http\Controllers\Officer;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Services\NotificationService;
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

        // Build query
        $query = Notification::where('user_id', $user->id)
            ->byCategory($category)
            ->byStatus($status)
            ->byPriority($priority)
            ->orderByDesc('created_at');

        // Get total count
        $total = $query->count();

        // Paginate
        $notifications = $query
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->with('report')
            ->get()
            ->map(function ($notification) {
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'category' => $notification->category,
                    'title' => $notification->title,
                    'description' => $notification->description,
                    'time' => NotificationService::getTimeString($notification->created_at),
                    'status' => $notification->status,
                    'priority' => $notification->priority,
                    'reportRoute' => $notification->report_id 
                        ? ($notification->report?->category?->slug === 'banjir'
                            ? "/officer/reports/flood/{$notification->report_id}"
                            : "/officer/reports/waste/{$notification->report_id}")
                        : null,
                    'createdAt' => $notification->created_at->toIso8601String(),
                ];
            });

        // Get unread count
        $unreadCount = Notification::where('user_id', $user->id)
            ->where('status', 'unread')
            ->count();

        return response()->json([
            'data' => [
                'notifications' => $notifications->values(),
                'total' => $total,
                'page' => $page,
                'per_page' => $perPage,
                'unread_count' => $unreadCount,
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
        $notification = Notification::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $notification->markAsRead();

        return response()->json([
            'data' => [
                'notification' => [
                    'id' => $notification->id,
                    'status' => $notification->status,
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
        $notification = Notification::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $notification->markAsConfirmed();

        return response()->json([
            'data' => [
                'notification' => [
                    'id' => $notification->id,
                    'status' => $notification->status,
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
        $notification = Notification::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $notification->hide();

        return response()->json([
            'data' => [
                'notification' => [
                    'id' => $notification->id,
                    'status' => $notification->status,
                ],
            ],
            'message' => 'Notifikasi berhasil disembunyikan.',
        ]);
    }
}
