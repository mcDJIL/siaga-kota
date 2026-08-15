<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MapPointResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'Feature',
            'geometry' => [
                'type' => 'Point',
                'coordinates' => [$this->longitude, $this->latitude],
            ],
            'properties' => [
                'id' => $this->id,
                'name' => $this->name ?? $this->title ?? null,
                'title' => $this->title ?? $this->name ?? null,
                'description' => $this->description ?? null,
                'layer' => $this->getLayerType(),
                'address' => $this->address ?? null,
                'capacity' => $this->capacity ?? null,
                'contact' => $this->contact ?? null,
                'type' => $this->type ?? null,
                'status' => $this->status instanceof \BackedEnum ? $this->status->value : $this->status ?? null,
                'status_label' => $this->status_label ?? null,
                'priority' => $this->priority instanceof \BackedEnum ? $this->priority->value : $this->priority ?? null,
                'water_level_cm' => $this->water_level_cm ?? null,
                'created_at' => $this->created_at,
                'category' => $this->when(isset($this->category), fn () => [
                    'slug' => $this->category->slug,
                    'name' => $this->category->name,
                    'icon' => $this->category->icon,
                ]),
                'code' => $this->code ?? null,
            ],
        ];
    }

    private function getLayerType(): string
    {
        return match (class_basename($this->resource)) {
            'WasteBank' => 'waste_bank',
            'Tps' => 'tps',
            'Report' => 'report',
            default => 'unknown',
        };
    }
}
