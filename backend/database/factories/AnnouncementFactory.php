<?php

namespace Database\Factories;

use App\Enums\AnnouncementAudience;
use App\Enums\AnnouncementStatus;
use App\Enums\AnnouncementType;
use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Announcement>
 */
class AnnouncementFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(6),
            'body' => fake()->paragraph(3),
            'type' => AnnouncementType::Info->value,
            'audience' => AnnouncementAudience::All->value,
            'audience_value' => null,
            'status' => AnnouncementStatus::Draft->value,
            'created_by' => User::factory(),
            'published_at' => null,
            'expires_at' => null,
        ];
    }

    public function draft(): static
    {
        return $this->state(fn (): array => [
            'status' => AnnouncementStatus::Draft->value,
            'published_at' => null,
        ]);
    }

    public function published(): static
    {
        return $this->state(fn (): array => [
            'status' => AnnouncementStatus::Published->value,
            'published_at' => now()->subHour(),
        ]);
    }

    public function archived(): static
    {
        return $this->state(fn (): array => [
            'status' => AnnouncementStatus::Archived->value,
            'published_at' => now()->subMonth(),
        ]);
    }
}
