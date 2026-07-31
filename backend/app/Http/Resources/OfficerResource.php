<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfficerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $assignedReports = $this->whenLoaded('assignedReports', fn() => $this->assignedReports()
            ->whereIn('status', ['ditugaskan', 'diproses'])
            ->pluck('id')
            ->toArray(), []);

        $currentTask = $this->whenLoaded('assignedReports', fn() => $this->assignedReports()
            ->whereIn('status', ['ditugaskan', 'diproses'])
            ->first(), null);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'position' => $this->position,
            'avatar_path' => $this->avatar_path,
            'latitude' => $this->latitude ?? -6.2088,
            'longitude' => $this->longitude ?? 106.8456,
            'department' => $this->whenLoaded('department', fn() => [
                'id' => $this->department->id,
                'name' => $this->department->name,
                'slug' => $this->department->slug,
            ]),
            'active' => $this->active,
            'assigned_reports_count' => count($assignedReports),
            'current_task' => $currentTask ? [
                'id' => $currentTask->id,
                'code' => $currentTask->code,
                'title' => $currentTask->title,
                'status' => $currentTask->status->value,
            ] : null,
            'status' => $this->getOfficerStatus(),
            'last_login_at' => $this->last_login_at?->toIso8601String(),
        ];
    }

    private function getOfficerStatus(): string
    {
        if (! $this->active) {
            return 'tidak-aktif';
        }

        // Check if assignedReports relationship is loaded
        if ($this->relationLoaded('assignedReports')) {
            $assignedCount = $this->assignedReports()
                ->whereIn('status', ['diproses'])
                ->count();
            return $assignedCount > 0 ? 'bertugas' : 'tersedia';
        }

        // Fallback: assume tersedia if not loaded
        return 'tersedia';
    }
}
