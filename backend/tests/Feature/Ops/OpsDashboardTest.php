<?php

namespace Tests\Feature\Ops;

use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OpsDashboardTest extends TestCase
{
    use RefreshDatabase;

    private function officer(): User
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'role' => UserRole::Petugas->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Petugas->value);

        return $user;
    }

    public function test_officer_can_view_dashboard(): void
    {
        $officer = $this->officer();

        $response = $this
            ->actingAs($officer, 'sanctum')
            ->getJson('/api/v1/ops/dashboard');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'summary' => [
                        'total',
                        'menunggu',
                        'diverifikasi',
                        'diproses',
                        'selesai',
                        'ditolak',
                        'darurat',
                    ],
                    'by_category',
                    'weekly_performance',
                    'recent_reports',
                ],
            ]);
    }

    public function test_dashboard_summary_counts_reports_by_status(): void
    {
        $officer = $this->officer();
        $category = ReportCategory::factory()->create(['slug' => 'sampah']);

        Report::factory()->count(2)->for($category, 'category')->create([
            'status' => ReportStatus::Menunggu->value,
            'is_emergency' => false,
        ]);

        Report::factory()->for($category, 'category')->create([
            'status' => ReportStatus::Selesai->value,
            'is_emergency' => true,
        ]);

        $response = $this
            ->actingAs($officer, 'sanctum')
            ->getJson('/api/v1/ops/dashboard');

        $response
            ->assertOk()
            ->assertJsonPath('data.summary.total', 3)
            ->assertJsonPath('data.summary.menunggu', 2)
            ->assertJsonPath('data.summary.selesai', 1)
            ->assertJsonPath('data.summary.darurat', 1)
            ->assertJsonPath('data.by_category.sampah', 3);
    }

    public function test_dashboard_weekly_performance_covers_seven_days(): void
    {
        $officer = $this->officer();

        $response = $this
            ->actingAs($officer, 'sanctum')
            ->getJson('/api/v1/ops/dashboard');

        $response->assertOk();

        $this->assertCount(7, $response->json('data.weekly_performance'));
        $this->assertSame(
            now()->toDateString(),
            $response->json('data.weekly_performance.6.date'),
        );
    }

    public function test_citizen_cannot_view_ops_dashboard(): void
    {
        $this->seed(RoleSeeder::class);

        $citizen = User::factory()->create([
            'role' => UserRole::Warga->value,
            'active' => true,
        ]);
        $citizen->assignRole(UserRole::Warga->value);

        $this->actingAs($citizen, 'sanctum')
            ->getJson('/api/v1/ops/dashboard')
            ->assertForbidden();
    }

    public function test_guest_cannot_view_ops_dashboard(): void
    {
        $this->getJson('/api/v1/ops/dashboard')->assertUnauthorized();
    }

    public function test_officer_can_export_report_as_pdf(): void
    {
        $officer = $this->officer();
        $report = Report::factory()->create();

        $response = $this
            ->actingAs($officer, 'sanctum')
            ->get("/api/v1/ops/reports/{$report->id}/export");

        $response
            ->assertOk()
            ->assertHeader('content-type', 'application/pdf');

        $this->assertStringStartsWith('%PDF', $response->getContent());
    }

    public function test_export_returns_404_for_unknown_report(): void
    {
        $officer = $this->officer();

        $this->actingAs($officer, 'sanctum')
            ->getJson('/api/v1/ops/reports/01jz00000000000000000000/export')
            ->assertNotFound();
    }

    public function test_officer_can_view_map_tasks(): void
    {
        $officer = $this->officer();
        $category = ReportCategory::factory()->create(['slug' => 'banjir']);

        Report::factory()->for($category, 'category')->create([
            'status' => ReportStatus::Diproses->value,
        ]);

        Report::factory()->for($category, 'category')->create([
            'status' => ReportStatus::Selesai->value,
        ]);

        $response = $this
            ->actingAs($officer, 'sanctum')
            ->getJson('/api/v1/ops/map/tasks');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data');
    }
}
