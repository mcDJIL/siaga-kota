<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MapZoneResource extends JsonResource
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
                'type' => 'Polygon',
                'coordinates' => [$this->coordinates],
            ],
            'properties' => [
                'id' => $this->id,
                'name' => $this->name,
                'layer' => 'flood_zone',
                'risk_level' => $this->base_risk_level,
            ],
        ];
    }
}
