<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('flood_zones', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->string('base_risk_level')->default('sedang');
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        DB::statement('
            ALTER TABLE flood_zones 
            ADD COLUMN zone geometry(Polygon, 4326) NOT NULL
        ');

        DB::statement('
            CREATE INDEX flood_zones_zone_idx 
            ON flood_zones 
            USING GIST (zone)
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flood_zones');
    }
};
