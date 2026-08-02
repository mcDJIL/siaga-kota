<?php

namespace Tests\Feature\Government;

use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FloodReportTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    private ReportCategory $floodCategory;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RoleSeeder::class);

        $this->admin = User::factory()->create([
            'role' => UserRole::Admin->value,
            'active' => true,
        ]);
        $this->admin->assignRole(UserRole::Admin->value);

        $this->floodCategory = ReportCategory::factory()->create(['slug' => 'banjir']);
    }

    private function floodReport(string $status = ReportStatus::Menunggu->value): Report
    {
        return Report::factory()
            ->for($this->floodCategory, 'category')
            ->create(['status' => $status]);
    }

    public function test_admin_can_verify_waiting_flood_report(): void
    {
        $report = $this->floodReport();

        $response = $this->actingAs($this->admin, 'sanctum')
            ->patchJson("/api/v1/government/flood-reports/{$report->id}/verify");

        $response
            ->assertOk()
            ->assertJsonPath('data.status', ReportStatus::Diverifikasi->value);

        $report->refresh();

        $this->assertSame(ReportStatus::Diverifikasi, $report->status);
        $this->assertNotNull($report->accepted_at);
    }

    public function test_verify_records_status_history(): void
    {
        $report = $this->floodReport();

        $this->actingAs($this->admin, 'sanctum')
            ->patchJson("/api/v1/government/flood-reports/{$report->id}/verify")
            ->assertOk();

        $this->assertDatabaseHas('report_status_histories', [
            'report_id' => $report->id,
            'from_status' => ReportStatus::Menunggu->value,
            'to_status' => ReportStatus::Diverifikasi->value,
            'actor_id' => $this->admin->id,
        ]);
    }

    public function test_cannot_verify_report_that_is_not_waiting(): void
    {
        $report = $this->floodReport(ReportStatus::Diproses->value);

        $this->actingAs($this->admin, 'sanctum')
            ->patchJson("/api/v1/government/flood-reports/{$report->id}/verify")
            ->assertUnprocessable()
            ->assertJsonPath('success', false);
    }

    public function test_admin_can_update_flood_report_status(): void
    {
        $report = $this->floodReport(ReportStatus::Diverifikasi->value);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->patchJson("/api/v1/government/flood-reports/{$report->id}/status", [
                'status' => ReportStatus::Selesai->value,
                'note' => 'Genangan sudah surut.',
            ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.status', ReportStatus::Selesai->value);

        $report->refresh();

        $this->assertSame(ReportStatus::Selesai, $report->status);
        $this->assertNotNull($report->resolved_at);
    }

    public function test_status_update_rejects_value_outside_enum(): void
    {
        $report = $this->floodReport();

        $this->actingAs($this->admin, 'sanctum')
            ->patchJson("/api/v1/government/flood-reports/{$report->id}/status", [
                'status' => 'terverifikasi',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['status']);
    }

    public function test_flood_stats_endpoint_returns_expected_shape(): void
    {
        $this->floodReport(ReportStatus::Selesai->value);

        $this->actingAs($this->admin, 'sanctum')
            ->getJson('/api/v1/government/flood-reports/stats')
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'stats' => [
                        '*' => ['id', 'label', 'value', 'icon', 'trend'],
                    ],
                ],
            ]);
    }

    public function test_recent_reports_use_report_code_and_real_status(): void
    {
        $report = $this->floodReport(ReportStatus::Diproses->value);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson('/api/v1/government/flood-reports/recent');

        $response
            ->assertOk()
            ->assertJsonPath('data.reports.0.id', $report->code)
            ->assertJsonPath('data.reports.0.status', ReportStatus::Diproses->value);
    }

    public function test_district_distribution_returns_registered_district_names(): void
    {
        $this->actingAs($this->admin, 'sanctum')
            ->getJson('/api/v1/government/flood-reports/districts')
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'districts' => [
                        '*' => ['district', 'reports'],
                    ],
                ],
            ]);
    }

    public function test_officer_cannot_verify_flood_report(): void
    {
        $officer = User::factory()->create([
            'role' => UserRole::Petugas->value,
            'active' => true,
        ]);
        $officer->assignRole(UserRole::Petugas->value);

        $report = $this->floodReport();

        $this->actingAs($officer, 'sanctum')
            ->patchJson("/api/v1/government/flood-reports/{$report->id}/verify")
            ->assertForbidden();
    }
}
