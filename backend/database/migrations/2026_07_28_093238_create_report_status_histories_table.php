<?php

use App\Enums\ReportStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('report_status_histories', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->foreignUlid('report_id')
                ->constrained('reports')
                ->cascadeOnDelete();

            $table->enum('from_status', array_column(ReportStatus::cases(), 'value'))
                ->nullable();

            $table->enum('to_status', array_column(ReportStatus::cases(), 'value'));

            $table->foreignUlid('actor_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->text('note')->nullable();

            $table->timestamps();

            $table->index('report_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_status_histories');
    }
};
