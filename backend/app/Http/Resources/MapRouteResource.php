<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MapRouteResource extends JsonResource
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
                'type' => 'LineString',
                'coordinates' => $this->coordinates,
            ],
            'properties' => [
                'id' => $this->id,
                'name' => $this->name,
                'layer' => 'evacuation_route',
                'description' => $this->description,
            ],
        ];
    }
}
