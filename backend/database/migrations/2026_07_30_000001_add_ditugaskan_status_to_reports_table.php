<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * This migration is no longer needed as the ditugaskan status was removed.
     * The system uses diverifikasi and diproses statuses instead.
     */
    public function up(): void
    {
        // Migration skipped - ditugaskan status is not needed
        // Reports flow: menunggu -> diverifikasi -> diproses (when assigned) -> selesai
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No action needed
    }
};
