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
        Schema::table('users', function (Blueprint $table) {
            $table->string('employee_id')->nullable()->after('village_id');
            $table->string('position')->nullable()->after('employee_id');
            $table->foreignUlid('department_id')
                ->nullable()
                ->after('position')
                ->constrained('departments')
                ->nullOnDelete();
            $table->string('avatar_path')->nullable()->after('department_id');

            $table->index('employee_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('department_id');
            $table->dropIndex(['employee_id']);
            $table->dropColumn([
                'employee_id',
                'position',
                'avatar_path',
            ]);
        });
    }
};
