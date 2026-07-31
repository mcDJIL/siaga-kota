<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\Report;
use App\Models\User;

class NotificationService
{
    /**
     * Create notification for new report
     */
    public static function createNewReportNotification(Report $report): void
    {
        // Get all officers to notify
        $officers = User::where('role', 'petugas')->get();

        foreach ($officers as $officer) {
            $category = $report->category?->slug === 'banjir' ? 'peringatan-banjir' : 'laporan-baru';
            $priority = $report->priority === 'tinggi' ? 'high' : ($report->priority === 'sedang' ? 'medium' : 'low');

            Notification::create([
                'user_id' => $officer->id,
                'report_id' => $report->id,
                'type' => 'new-report',
                'category' => $category,
                'title' => "Laporan Baru #{$report->code}: {$report->title}",
                'description' => $report->description,
                'priority' => $priority,
                'status' => 'unread',
            ]);
        }
    }

    /**
     * Create notification when report status changes
     */
    public static function createStatusUpdateNotification(Report $report, string $oldStatus, string $newStatus): void
    {
        // Get report submitter/citizen
        $citizen = User::find($report->user_id);
        
        if (!$citizen) {
            return;
        }

        $statusLabels = [
            'menunggu' => 'Menunggu Verifikasi',
            'diverifikasi' => 'Terverifikasi',
            'diproses' => 'Sedang Diproses',
            'selesai' => 'Selesai',
            'ditolak' => 'Ditolak',
        ];

        $statusLabelNew = $statusLabels[$newStatus] ?? $newStatus;
        $categoryLabel = $report->category?->name ?? 'Laporan';

        $type = $newStatus === 'selesai' ? 'completed' : 'status-update';
        $priority = $newStatus === 'selesai' ? 'medium' : ($newStatus === 'ditolak' ? 'high' : 'medium');

        Notification::create([
            'user_id' => $citizen->id,
            'report_id' => $report->id,
            'type' => $type,
            'category' => 'sistem',
            'title' => "Status Laporan #{$report->code} Berubah Menjadi {$statusLabelNew}",
            'description' => "Laporan {$categoryLabel} Anda telah diperbarui status menjadi {$statusLabelNew}.",
            'priority' => $priority,
            'status' => 'unread',
        ]);
    }

    /**
     * Create notification when report is completed
     */
    public static function createCompletionNotification(Report $report): void
    {
        $citizen = User::find($report->user_id);
        
        if (!$citizen) {
            return;
        }

        Notification::create([
            'user_id' => $citizen->id,
            'report_id' => $report->id,
            'type' => 'completed',
            'category' => 'sistem',
            'title' => "Laporan #{$report->code} Telah Diselesaikan",
            'description' => "Terima kasih telah melaporkan. Laporan Anda telah ditangani dan diselesaikan oleh petugas.",
            'priority' => 'low',
            'status' => 'unread',
        ]);
    }

    /**
     * Create alert notification for flood reports
     */
    public static function createFloodAlertNotification(Report $report): void
    {
        if ($report->category?->slug !== 'banjir') {
            return;
        }

        // Get all officers to notify
        $officers = User::where('role', 'petugas')->get();

        $priority = $report->water_level_cm > 100 ? 'high' : 'medium';

        foreach ($officers as $officer) {
            Notification::create([
                'user_id' => $officer->id,
                'report_id' => $report->id,
                'type' => 'alert',
                'category' => 'peringatan-banjir',
                'title' => "Peringatan Banjir: {$report->title} - Level Air: {$report->water_level_cm}cm",
                'description' => $report->description,
                'priority' => $priority,
                'status' => 'unread',
            ]);
        }
    }

    /**
     * Get human readable time difference
     */
    public static function getTimeString($date): string
    {
        if (!$date) {
            return 'Baru saja';
        }

        $now = now();
        $diff = $now->diffInSeconds($date);

        if ($diff < 60) {
            return 'Baru saja';
        }

        $diffMinutes = $now->diffInMinutes($date);
        if ($diffMinutes < 60) {
            return "{$diffMinutes} menit yang lalu";
        }

        $diffHours = $now->diffInHours($date);
        if ($diffHours < 24) {
            return "{$diffHours} jam yang lalu";
        }

        $diffDays = $now->diffInDays($date);
        if ($diffDays < 7) {
            return "{$diffDays} hari yang lalu";
        }

        return $date->format('d M Y');
    }
}
