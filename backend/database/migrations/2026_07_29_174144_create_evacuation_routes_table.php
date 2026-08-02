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
        Schema::create('evacuation_routes', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->text('description')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        DB::statement('
            ALTER TABLE evacuation_routes 
            ADD COLUMN path geometry(LineString, 4326) NOT NULL
        ');

        DB::statement('
            CREATE INDEX evacuation_routes_path_idx 
            ON evacuation_routes 
            USING GIST (path)
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evacuation_routes');
    }
};
