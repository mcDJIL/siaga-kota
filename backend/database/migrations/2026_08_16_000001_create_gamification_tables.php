<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('impact_point_ledger', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->ulid('user_id')->index();
            $table->integer('points');
            $table->string('source')->nullable();
            $table->string('source_id')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('badges', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('icon')->nullable();
            $table->text('description')->nullable();
            $table->integer('tier')->default(1);
            $table->jsonb('criteria')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('user_badges', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->ulid('user_id')->index();
            $table->ulid('badge_id')->index();
            $table->timestamp('earned_at')->nullable();
            $table->unique(['user_id', 'badge_id']);
        });

        Schema::create('rewards', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('cost_points')->default(0);
            $table->integer('stock')->default(0);
            $table->string('image_path')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('reward_redemptions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->ulid('user_id')->index();
            $table->ulid('reward_id')->index();
            $table->integer('cost_points');
            $table->enum('status', ['pending', 'approved', 'rejected', 'fulfilled'])->default('pending');
            $table->timestamp('redeemed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('tree_contributions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->ulid('user_id')->index();
            $table->unsignedInteger('trigger_count')->default(0);
            $table->string('status')->default('pending');
            $table->text('note')->nullable();
            $table->timestamps();
        });

        Schema::create('leaderboard_snapshots', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('scope');
            $table->string('scope_value')->nullable();
            $table->string('period')->nullable();
            $table->jsonb('ranking')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leaderboard_snapshots');
        Schema::dropIfExists('tree_contributions');
        Schema::dropIfExists('reward_redemptions');
        Schema::dropIfExists('rewards');
        Schema::dropIfExists('user_badges');
        Schema::dropIfExists('badges');
        Schema::dropIfExists('impact_point_ledger');
    }
};
