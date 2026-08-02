<?php

namespace Tests\Feature\Broadcasting;

use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Events\ReportAssigned;
use App\Events\ReportCreated;
use App\Events\ReportMarkedEmergency;
use App\Events\ReportStatusChanged;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class ReportBroadcastTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array<int, string>
     */
    private function channelNames(object $event): array
    {
        return collect($event->broadcastOn())
            ->map(fn (PrivateChannel $channel) => (string) $channel)
            ->all();
    }

    public function test_report_created_broadcasts_on_city_reports_channel(): void
    {
        $category = ReportCategory::factory()->create(['slug' => 'sampah']);
        $report = Report::factory()->for($category, 'category')->create();

        $event = new ReportCreated($report);

        $this->assertSame('report.created', $event->broadcastAs());
        $this->assertSame(['private-city.reports'], $this->channelNames($event));

        $payload = $event->broadcastWith();

        $this->assertSame($report->code, $payload['code']);
        $this->assertSame('sampah', $payload['category']);
        $this->assertArrayNotHasKey('description', $payload);
    }

    public function test_status_changed_broadcasts_to_reporter_and_city_feed(): void
    {
        $reporter = User::factory()->create();
        $report = Report::factory()->for($reporter, 'user')->create();

        $event = new ReportStatusChanged(
            $report,
            ReportStatus::Menunggu->value,
            ReportStatus::Diproses->value,
        );

        $channels = $this->channelNames($event);

        $this->assertContains('private-city.reports', $channels);
        $this->assertContains("private-user.{$reporter->id}", $channels);
        $this->assertSame('report.status-changed', $event->broadcastAs());

        $payload = $event->broadcastWith();

        $this->assertSame(ReportStatus::Menunggu->value, $payload['from_status']);
        $this->assertSame(ReportStatus::Diproses->value, $payload['to_status']);
    }

    public function test_report_assigned_broadcasts_to_operator_assignment_channel(): void
    {
        $operator = User::factory()->create();
        $report = Report::factory()->create(['assigned_to' => $operator->id]);

        $event = new ReportAssigned($report, $operator->id);

        $channels = $this->channelNames($event);

        $this->assertContains("private-ops.{$operator->id}.assignments", $channels);
        $this->assertContains('private-city.reports', $channels);
        $this->assertSame($operator->id, $event->broadcastWith()['assigned_to']);
    }

    public function test_marked_emergency_broadcasts_on_city_reports_channel(): void
    {
        $report = Report::factory()->create(['is_emergency' => true]);

        $event = new ReportMarkedEmergency($report);

        $this->assertSame(['private-city.reports'], $this->channelNames($event));
        $this->assertTrue($event->broadcastWith()['is_emergency']);
    }

    public function test_creating_report_dispatches_report_created_event(): void
    {
        $this->seed(RoleSeeder::class);
        $this->travelTo(now());

        $citizen = User::factory()->create([
            'role' => UserRole::Warga->value,
            'active' => true,
        ]);
        $citizen->assignRole(UserRole::Warga->value);

        $category = ReportCategory::factory()->create(['slug' => 'sampah']);

        Event::fake([ReportCreated::class]);

        $this->actingAs($citizen, 'sanctum')
            ->postJson('/api/v1/public/reports', [
                'category_id' => $category->id,
                'title' => 'Sampah menumpuk di pinggir jalan',
                'description' => 'Sudah tiga hari belum diangkut petugas.',
                'address' => 'Jl. Sumbersari No. 10',
                'latitude' => -8.1706,
                'longitude' => 113.7004,
            ])
            ->assertCreated();

        Event::assertDispatched(ReportCreated::class);
    }

    public function test_updating_status_dispatches_status_changed_event(): void
    {
        $this->seed(RoleSeeder::class);

        $officer = User::factory()->create([
            'role' => UserRole::Petugas->value,
            'active' => true,
        ]);
        $officer->assignRole(UserRole::Petugas->value);

        $report = Report::factory()->create([
            'status' => ReportStatus::Menunggu->value,
        ]);

        Event::fake([ReportStatusChanged::class]);

        $this->actingAs($officer, 'sanctum')
            ->patchJson("/api/v1/ops/reports/{$report->id}/status", [
                'status' => ReportStatus::Diproses->value,
                'note' => 'Tim sudah dikirim ke lokasi.',
            ])
            ->assertOk();

        Event::assertDispatched(
            ReportStatusChanged::class,
            fn (ReportStatusChanged $event) => $event->toStatus === ReportStatus::Diproses->value
                && $event->fromStatus === ReportStatus::Menunggu->value,
        );
    }

    public function test_assigning_report_dispatches_report_assigned_event(): void
    {
        $this->seed(RoleSeeder::class);

        $officer = User::factory()->create([
            'role' => UserRole::Petugas->value,
            'active' => true,
        ]);
        $officer->assignRole(UserRole::Petugas->value);

        $target = User::factory()->create([
            'role' => UserRole::Petugas->value,
            'active' => true,
        ]);
        $target->assignRole(UserRole::Petugas->value);

        $report = Report::factory()->create();

        Event::fake([ReportAssigned::class]);

        $this->actingAs($officer, 'sanctum')
            ->postJson("/api/v1/ops/reports/{$report->id}/assign", [
                'operator_id' => $target->id,
            ])
            ->assertOk();

        Event::assertDispatched(
            ReportAssigned::class,
            fn (ReportAssigned $event) => $event->operatorId === $target->id,
        );
    }

    public function test_marking_emergency_dispatches_event(): void
    {
        $this->seed(RoleSeeder::class);

        $officer = User::factory()->create([
            'role' => UserRole::Petugas->value,
            'active' => true,
        ]);
        $officer->assignRole(UserRole::Petugas->value);

        $report = Report::factory()->create(['is_emergency' => false]);

        Event::fake([ReportMarkedEmergency::class]);

        $this->actingAs($officer, 'sanctum')
            ->patchJson("/api/v1/ops/reports/{$report->id}/emergency")
            ->assertOk();

        Event::assertDispatched(ReportMarkedEmergency::class);
    }

    public function test_unmarking_emergency_does_not_dispatch_event(): void
    {
        $this->seed(RoleSeeder::class);

        $officer = User::factory()->create([
            'role' => UserRole::Petugas->value,
            'active' => true,
        ]);
        $officer->assignRole(UserRole::Petugas->value);

        $report = Report::factory()->create(['is_emergency' => true]);

        Event::fake([ReportMarkedEmergency::class]);

        $this->actingAs($officer, 'sanctum')
            ->patchJson("/api/v1/ops/reports/{$report->id}/emergency")
            ->assertOk();

        Event::assertNotDispatched(ReportMarkedEmergency::class);
    }
}
