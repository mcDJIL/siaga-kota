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
                'name' => $this->name,
                'layer' => $this->getLayerType(),
                'address' => $this->address ?? null,
                'capacity' => $this->capacity ?? null,
                'contact' => $this->contact ?? null,
                'type' => $this->type ?? null,
                'status' => $this->status ?? null,
                'category' => $this->when(isset($this->category), fn() => [
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
