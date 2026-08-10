<?php

namespace App\Services;

use App\Enums\NotificationCategory;
use App\Enums\ReportPriority;
use App\Enums\ReportStatus;
use App\Models\Notification;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class NotificationService
{
    /**
     * Label status untuk ditampilkan di notifikasi, selaras PLAN §6.6.
     *
     * @var array<string, string>
     */
    private const STATUS_LABELS = [
        'menunggu' => 'Menunggu Verifikasi',
        'diverifikasi' => 'Terverifikasi',
        'diproses' => 'Sedang Diproses',
        'selesai' => 'Selesai',
        'ditolak' => 'Ditolak',
    ];

    /**
     * Notifikasi laporan baru untuk seluruh petugas aktif.
     */
    public static function createNewReportNotification(Report $report): void
    {
        $officers = self::activeOfficers();

        if ($officers->isEmpty()) {
            return;
        }

        $isFlood = $report->category?->slug === 'banjir';

        self::insertMany($officers, [
            'report_id' => $report->id,
            'type' => 'new-report',
            'category' => $isFlood
                ? NotificationCategory::Alert->value
                : NotificationCategory::LaporanBaru->value,
            'title' => "Laporan Baru #{$report->code}: {$report->title}",
            'description' => $report->description,
            'priority' => self::mapPriority($report),
        ]);
    }

    /**
     * Notifikasi ke pelapor saat status laporannya berubah.
     */
    public static function createStatusUpdateNotification(Report $report, ?string $oldStatus, string $newStatus): void
    {
        if (! $report->user_id) {
            return;
        }

        $statusLabel = self::STATUS_LABELS[$newStatus] ?? $newStatus;
        $categoryLabel = $report->category?->name ?? 'Laporan';
        $isDone = $newStatus === ReportStatus::Selesai->value;

        Notification::query()->create([
            'user_id' => $report->user_id,
            'report_id' => $report->id,
            'type' => $isDone ? 'completed' : 'status-update',
            'category' => NotificationCategory::Sistem->value,
            'title' => "Status Laporan #{$report->code} Berubah Menjadi {$statusLabel}",
            'description' => "Laporan {$categoryLabel} Anda telah diperbarui status menjadi {$statusLabel}.",
            'priority' => $newStatus === ReportStatus::Ditolak->value ? 'high' : 'medium',
            'status' => 'unread',
        ]);
    }

    /**
     * Notifikasi ke pelapor saat laporan dinyatakan selesai.
     */
    public static function createCompletionNotification(Report $report): void
    {
        if (! $report->user_id) {
            return;
        }

        Notification::query()->create([
            'user_id' => $report->user_id,
            'report_id' => $report->id,
            'type' => 'completed',
            'category' => NotificationCategory::Sistem->value,
            'title' => "Laporan #{$report->code} Telah Diselesaikan",
            'description' => 'Terima kasih telah melaporkan. Laporan Anda telah ditangani dan diselesaikan oleh petugas.',
            'priority' => 'low',
            'status' => 'unread',
        ]);
    }

    /**
     * Peringatan banjir untuk seluruh petugas aktif.
     */
    public static function createFloodAlertNotification(Report $report): void
    {
        if ($report->category?->slug !== 'banjir') {
            return;
        }

        $officers = self::activeOfficers();

        if ($officers->isEmpty()) {
            return;
        }

        self::insertMany($officers, [
            'report_id' => $report->id,
            'type' => 'alert',
            'category' => NotificationCategory::Alert->value,
            'title' => "Peringatan Banjir: {$report->title} - Level Air: {$report->water_level_cm}cm",
            'description' => $report->description,
            'priority' => ($report->water_level_cm ?? 0) > 100 ? 'high' : 'medium',
        ]);
    }

    public static function getTimeString($date): string
    {
        if (! $date) {
            return 'Baru saja';
        }

        $now = now();

        if ($now->diffInSeconds($date) < 60) {
            return 'Baru saja';
        }

        if (($minutes = $now->diffInMinutes($date)) < 60) {
            return "{$minutes} menit yang lalu";
        }

        if (($hours = $now->diffInHours($date)) < 24) {
            return "{$hours} jam yang lalu";
        }

        if (($days = $now->diffInDays($date)) < 7) {
            return "{$days} hari yang lalu";
        }

        return $date->format('d M Y');
    }

    /**
     * Petugas aktif berdasarkan role Spatie (sumber kebenaran RBAC).
     *
     * @return Collection<int, User>
     */
    private static function activeOfficers(): Collection
    {
        return User::query()
            ->whereHas('roles', fn ($q) => $q->where('name', 'petugas'))
            ->where('active', true)
            ->get(['id']);
    }

    /**
     * Sisipkan satu notifikasi untuk banyak penerima dalam satu query.
     *
     * @param  Collection<int, User>  $recipients
     * @param  array<string, mixed>  $payload
     */
    private static function insertMany(Collection $recipients, array $payload): void
    {
        $now = now();

        $rows = $recipients->map(fn (User $user) => [
            'id' => (string) str()->ulid(),
            'user_id' => $user->id,
            'status' => 'unread',
            'created_at' => $now,
            'updated_at' => $now,
            ...$payload,
        ])->all();

        DB::table('notifications')->insert($rows);
    }

    private static function mapPriority(Report $report): string
    {
        return match ($report->priority) {
            ReportPriority::Mendesak, ReportPriority::Tinggi => 'high',
            ReportPriority::Sedang => 'medium',
            default => 'low',
        };
    }
}
