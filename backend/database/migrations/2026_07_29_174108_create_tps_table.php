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
        Schema::create('tps', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->string('address');
            $table->string('type')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        DB::statement('
            ALTER TABLE tps 
            ADD COLUMN location geometry(Point, 4326) NOT NULL
        ');

        DB::statement('
            CREATE INDEX tps_location_idx 
            ON tps 
            USING GIST (location)
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tps');
    }
};
