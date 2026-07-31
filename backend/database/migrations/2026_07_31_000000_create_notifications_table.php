<?php

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
        Schema::create('notifications', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->foreignUlid('report_id')
                ->nullable()
                ->constrained('reports')
                ->onDelete('cascade');
            
            $table->enum('type', ['alert', 'new-report', 'status-update', 'completed'])->default('new-report');
            $table->enum('category', ['peringatan-banjir', 'laporan-baru', 'sistem'])->default('laporan-baru');
            $table->text('title');
            $table->text('description')->nullable();
            $table->enum('priority', ['high', 'medium', 'low'])->default('medium');
            $table->enum('status', ['unread', 'read', 'confirmed', 'completed', 'hidden'])->default('unread');
            
            $table->timestamp('read_at')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('user_id');
            $table->index('report_id');
            $table->index('status');
            $table->index('category');
            $table->index('priority');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
