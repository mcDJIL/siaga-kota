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
        Schema::create('waste_banks', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->string('address');
            $table->integer('capacity')->nullable();
            $table->string('contact')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        DB::statement("
            ALTER TABLE waste_banks 
            ADD COLUMN location geometry(Point, 4326) NOT NULL
        ");

        DB::statement("
            CREATE INDEX waste_banks_location_idx 
            ON waste_banks 
            USING GIST (location)
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('waste_banks');
    }
};
