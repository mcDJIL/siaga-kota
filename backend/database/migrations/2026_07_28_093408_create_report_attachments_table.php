<?php

use App\Enums\ReportAttachmentType;
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
        Schema::create('report_attachments', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->foreignUlid('report_id')
                ->constrained('reports')
                ->cascadeOnDelete();

            $table->string('path');

            $table->enum('type', array_column(ReportAttachmentType::cases(), 'value'))
                ->default(ReportAttachmentType::Reporter->value);

            $table->foreignUlid('uploaded_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();

            $table->index('report_id');
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_attachments');
    }
};
