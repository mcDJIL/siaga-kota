<?php

namespace Database\Factories;

use App\Enums\ReportPriority;
use App\Models\ReportCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ReportCategory>
 */
class ReportCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => fake()->unique()->slug(),
            'name' => fake()->words(2, true),
            'icon' => null,
            'default_priority' => fake()->randomElement(ReportPriority::cases())->value,
            'active' => true,
        ];
    }
}
