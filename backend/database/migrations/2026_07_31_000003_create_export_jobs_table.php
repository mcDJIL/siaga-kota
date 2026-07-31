<?php

use App\Enums\ExportDataType;
use App\Enums\ExportFormat;
use App\Enums\ExportStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('export_jobs', function (Blueprint $table): void {
            $table->ulid('id')->primary();

            $table->foreignUlid('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->enum('data_type', array_column(ExportDataType::cases(), 'value'));
            $table->enum('format', array_column(ExportFormat::cases(), 'value'));

            $table->date('date_from')->nullable();
            $table->date('date_to')->nullable();

            // Filter tambahan yang dipakai saat membangun dataset.
            $table->jsonb('filters')->nullable();

            $table->enum('status', array_column(ExportStatus::cases(), 'value'))
                ->default(ExportStatus::Processing->value);

            $table->string('file_path')->nullable();
            $table->string('filename')->nullable();
            $table->unsignedInteger('row_count')->default(0);
            $table->text('error')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();

            $table->index('user_id');
            $table->index('expires_at');
            $table->index(['status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('export_jobs');
    }
};
