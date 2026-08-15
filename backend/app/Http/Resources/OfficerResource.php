<?php

namespace App\Http\Resources;

use App\Enums\ReportStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfficerResource extends JsonResource
{
    /**
     * Status laporan yang dianggap sebagai penugasan aktif petugas.
     *
     * @var array<int, string>
     */
    private const ACTIVE_STATUSES = [
        ReportStatus::Diverifikasi->value,
        ReportStatus::Ditugaskan->value,
        ReportStatus::Diproses->value,
    ];

    /**
     * Transform the resource into an array.
     *
     * PII (email/phone) tidak diekspos sesuai PLAN §7.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $activeReports = $this->relationLoaded('assignedReports')
            ? $this->assignedReports->whereIn('status.value', self::ACTIVE_STATUSES)
            : null;

        $currentTask = $activeReports?->first();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'employee_id' => $this->employee_id,
            'position' => $this->position,
            'avatar_path' => $this->avatar_path ? url("storage/{$this->avatar_path}") : null,
            'department' => $this->whenLoaded('department', fn () => [
                'id' => $this->department->id,
                'name' => $this->department->name,
                'slug' => $this->department->slug,
            ]),
            'active' => $this->active,
            'assigned_reports_count' => $activeReports?->count() ?? 0,
            'current_task' => $currentTask ? [
                'id' => $currentTask->id,
                'code' => $currentTask->code,
                'title' => $currentTask->title,
                'status' => $currentTask->status->value,
            ] : null,
            'status' => $this->resolveOfficerStatus($activeReports?->count() ?? 0),
            'last_login_at' => $this->last_login_at?->toIso8601String(),
        ];
    }

    private function resolveOfficerStatus(int $activeReportCount): string
    {
        if (! $this->active) {
            return 'tidak-aktif';
        }

        return $activeReportCount > 0 ? 'bertugas' : 'tersedia';
    }
}
