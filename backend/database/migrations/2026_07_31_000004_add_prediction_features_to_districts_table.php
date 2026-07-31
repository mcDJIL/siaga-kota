<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('districts', function (Blueprint $table) {
            $table->decimal('elevation', 8, 2)->default(80)->after('longitude');
            $table->decimal('river_distance', 10, 2)->default(500)->after('elevation');
            $table->unsignedInteger('population_density')->default(4000)->after('river_distance');
            $table->decimal('drainage_score', 4, 2)->default(0.70)->after('population_density');
        });
    }

    public function down(): void
    {
        Schema::table('districts', function (Blueprint $table) {
            $table->dropColumn([
                'elevation',
                'river_distance',
                'population_density',
                'drainage_score',
            ]);
        });
    }
};
