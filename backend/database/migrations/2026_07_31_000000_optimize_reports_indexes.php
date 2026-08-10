<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            // Composite index untuk query dengan category filter + date range + status
            $table->index(['category_id', 'created_at', 'status']);

            // Index untuk accepted_at yang digunakan di response time calculation
            $table->index(['accepted_at']);

            // Index untuk soft deletes
            $table->index(['deleted_at']);
        });
    }

    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropIndex(['category_id', 'created_at', 'status']);
            $table->dropIndex(['accepted_at']);
            $table->dropIndex(['deleted_at']);
        });
    }
};
