<?php

use App\Enums\ReportPriority;
use App\Enums\ReportStatus;
use App\Enums\WasteType;
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
        Schema::create('reports', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('code')->unique();

            $table->foreignUlid('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignUlid('category_id')
                ->constrained('report_categories')
                ->restrictOnDelete();

            $table->enum('waste_type', array_column(WasteType::cases(), 'value'))
                ->nullable();

            $table->string('title');
            $table->text('description');

            $table->enum('status', array_column(ReportStatus::cases(), 'value'))
                ->default(ReportStatus::Menunggu->value);

            $table->enum('priority', array_column(ReportPriority::cases(), 'value'))
                ->default(ReportPriority::Sedang->value);

            // PostGIS Point geometry (SRID 4326 = WGS84)
            // Untuk sekarang pakai raw SQL karena postgis-enhanced belum terpasang
            $table->string('address');
            $table->integer('water_level_cm')->nullable();
            $table->boolean('is_emergency')->default(false);

            $table->string('photo_path')->nullable();

            $table->foreignUlid('assigned_to')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->text('resolution_note')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'created_at']);
            $table->index('code');
            $table->index('category_id');
            $table->index('user_id');
            $table->index('assigned_to');
        });

        // Tambahkan kolom geometry Point setelah address dengan raw SQL
        DB::statement("
            ALTER TABLE reports 
            ADD COLUMN location geometry(Point, 4326) NOT NULL
        ");

        // Buat spatial index untuk kolom location
        DB::statement("
            CREATE INDEX reports_location_idx 
            ON reports 
            USING GIST (location)
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
