<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'category' => [
                'id' => $this->category->id,
                'slug' => $this->category->slug,
                'name' => $this->category->name,
                'icon' => $this->category->icon,
            ],
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status->value,
            'status_label' => $this->getStatusLabel(),
            'priority' => $this->priority->value,
            'priority_label' => $this->getPriorityLabel(),
            'waste_type' => $this->waste_type?->value,
            'water_level_cm' => $this->water_level_cm,
            'is_emergency' => $this->is_emergency,
            'location' => $this->parseLocationForResponse($this->location),
            'photo_url' => $this->photo_path ? url("storage/{$this->photo_path}") : null,
            'reporter' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ],
            'assigned_operator' => $this->whenLoaded('assignedOperator', fn() => [
                'id' => $this->assignedOperator->id,
                'name' => $this->assignedOperator->name,
                'employee_id' => $this->assignedOperator->employee_id,
            ]),
            'status_histories' => $this->whenLoaded(
                'statusHistories',
                fn() =>
                $this->statusHistories->map(fn($history) => [
                    'from_status' => $history->from_status?->value,
                    'to_status' => $history->to_status->value,
                    'note' => $history->note,
                    'actor' => $history->actor ? [
                        'id' => $history->actor->id,
                        'name' => $history->actor->name,
                    ] : null,
                    'created_at' => $history->created_at,
                ])
            ),
            'attachments' => $this->whenLoaded(
                'attachments',
                fn() =>
                $this->attachments->map(fn($attachment) => [
                    'id' => $attachment->id,
                    'type' => $attachment->type->value,
                    'url' => url("storage/{$attachment->path}"),
                    'uploaded_by' => $attachment->uploader ? [
                        'id' => $attachment->uploader->id,
                        'name' => $attachment->uploader->name,
                    ] : null,
                    'created_at' => $attachment->created_at,
                ])
            ),
            'accepted_at' => $this->accepted_at,
            'processed_at' => $this->processed_at,
            'resolved_at' => $this->resolved_at,
            'resolution_note' => $this->resolution_note,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    private function parseLocationForResponse($location)
    {
        if (! $location) {
            return null;
        }

        $location = (string) $location;

        // Terima format "POINT(lng lat)" maupun "POINT (lng lat)".
        if (preg_match('/POINT\s*\(([^ ]+)\s+([^ ]+)\)/', $location, $matches)) {
            $lng = (float) $matches[1];
            $lat = (float) $matches[2];

            if ($lng === 0.0 && $lat === 0.0) {
                return null;
            }

            return [
                'latitude' => $lat,
                'longitude' => $lng,
                'address' => $this->address,
            ];
        }

        return null;
    }

    private function getStatusLabel(): string
    {
        return match ($this->status->value) {
            'menunggu' => 'Menunggu',
            'diverifikasi' => 'Terverifikasi',
            'diproses' => 'Sedang Diproses',
            'selesai' => 'Selesai',
            'ditolak' => 'Ditolak',
            default => $this->status->value,
        };
    }

    private function getPriorityLabel(): string
    {
        return match ($this->priority->value) {
            'rendah' => 'Rendah',
            'sedang' => 'Sedang',
            'tinggi' => 'Tinggi',
            'mendesak' => 'Mendesak',
            default => $this->priority->value,
        };
    }
}
