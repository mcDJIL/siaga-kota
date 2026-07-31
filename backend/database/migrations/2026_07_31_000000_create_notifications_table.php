<?php

use App\Enums\NotificationCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table): void {
            $table->ulid('id')->primary();

            $table->foreignUlid('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignUlid('report_id')
                ->nullable()
                ->constrained('reports')
                ->cascadeOnDelete();

            $table->enum('type', ['alert', 'new-report', 'status-update', 'completed'])
                ->default('new-report');

            // Kategori kanonik sesuai PLAN §6.6.
            $table->enum('category', array_column(NotificationCategory::cases(), 'value'))
                ->default(NotificationCategory::LaporanBaru->value);

            $table->text('title');
            $table->text('description')->nullable();
            $table->enum('priority', ['high', 'medium', 'low'])->default('medium');
            $table->enum('status', ['unread', 'read', 'confirmed', 'completed', 'hidden'])
                ->default('unread');

            $table->timestamp('read_at')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('report_id');
            $table->index('category');
            $table->index('priority');
            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
