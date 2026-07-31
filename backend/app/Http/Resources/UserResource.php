<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role,
            'rw' => $this->rw,
            'rt' => $this->rt,
            'village_id' => $this->village_id,
            'employee_id' => $this->employee_id,
            'position' => $this->position,
            'department' => $this->whenLoaded('department', fn() => [
                'id' => $this->department->id,
                'name' => $this->department->name,
                'slug' => $this->department->slug,
                'type' => $this->department->type->value,
            ]),
            'avatar_path' => $this->avatar_path ? url("storage/{$this->avatar_path}") : null,
            'settings' => $this->settings,
            'active' => $this->active,
        ];
    }
}
