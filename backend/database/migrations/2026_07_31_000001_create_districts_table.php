<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('districts', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->integer('waste_reports_count')->default(0);
            $table->integer('flood_reports_count')->default(0);
            $table->integer('ai_predictions_count')->default(0);
            $table->integer('risk_score')->default(0);
            $table->enum('status', ['critical', 'monitor', 'safe'])->default('safe');
            $table->text('action_required')->nullable();
            $table->timestamps();

            $table->index('slug');
            $table->index('status');
            $table->index('risk_score');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('districts');
    }
};
