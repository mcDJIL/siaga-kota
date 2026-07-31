<?php

use App\Enums\AnnouncementAudience;
use App\Enums\AnnouncementStatus;
use App\Enums\AnnouncementType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('announcements', function (Blueprint $table): void {
            $table->ulid('id')->primary();
            $table->string('title');
            $table->text('body');

            $table->enum('type', array_column(AnnouncementType::cases(), 'value'))
                ->default(AnnouncementType::Info->value);

            $table->enum('audience', array_column(AnnouncementAudience::cases(), 'value'))
                ->default(AnnouncementAudience::All->value);

            // Nilai target untuk audience `rw` atau `zone`, mis. nomor RW / id zona.
            $table->string('audience_value')->nullable();

            $table->enum('status', array_column(AnnouncementStatus::cases(), 'value'))
                ->default(AnnouncementStatus::Draft->value);

            $table->foreignUlid('created_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->timestamp('published_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('status');
            $table->index('audience');
            $table->index('published_at');
            $table->index('expires_at');
            $table->index(['status', 'published_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
