<?php

namespace Database\Factories;

use App\Enums\ReportPriority;
use App\Enums\ReportStatus;
use App\Enums\WasteType;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends Factory<Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $lat = fake()->latitude(-8.5, -7.5);  // Jember area roughly
        $lng = fake()->longitude(113.0, 114.0);

        return [
            'code' => 'RPT-'.fake()->unique()->numerify('####'),
            'user_id' => User::factory(),
            'category_id' => ReportCategory::factory(),
            'waste_type' => fake()->optional()->randomElement(WasteType::cases())?->value,
            'title' => fake()->sentence(6),
            'description' => fake()->paragraph(3),
            'status' => fake()->randomElement(ReportStatus::cases())->value,
            'priority' => fake()->randomElement(ReportPriority::cases())->value,
            'location' => DB::raw("ST_GeomFromText('POINT({$lng} {$lat})', 4326)"),
            'address' => fake()->address(),
            'water_level_cm' => fake()->optional()->numberBetween(10, 200),
            'is_emergency' => fake()->boolean(10),
            'photo_path' => null,
            'assigned_to' => null,
        ];
    }

    public function menunggu(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ReportStatus::Menunggu->value,
        ]);
    }

    public function diproses(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ReportStatus::Diproses->value,
            'processed_at' => now(),
        ]);
    }

    public function selesai(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ReportStatus::Selesai->value,
            'processed_at' => now()->subDays(2),
            'resolved_at' => now(),
            'resolution_note' => fake()->sentence(),
        ]);
    }
}
