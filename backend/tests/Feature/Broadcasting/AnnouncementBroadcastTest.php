<?php

namespace Tests\Feature\Broadcasting;

use App\Enums\AnnouncementAudience;
use App\Enums\AnnouncementStatus;
use App\Enums\UserRole;
use App\Events\AnnouncementPublished;
use App\Models\Announcement;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class AnnouncementBroadcastTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RoleSeeder::class);
    }

    private function admin(): User
    {
        $admin = User::factory()->create([
            'role' => UserRole::Admin->value,
            'active' => true,
        ]);

        $admin->assignRole(UserRole::Admin->value);

        return $admin;
    }

    /**
     * @return array<string, mixed>
     */
    private function payload(string $status): array
    {
        return [
            'title' => 'Peringatan Cuaca Ekstrem',
            'body' => 'Hujan deras diperkirakan terjadi malam ini.',
            'audience' => AnnouncementAudience::Warga->value,
            'status' => $status,
        ];
    }

    public function test_publishing_new_announcement_broadcasts_event(): void
    {
        Event::fake([AnnouncementPublished::class]);

        $this->actingAs($this->admin(), 'sanctum')
            ->postJson('/api/v1/government/announcements', $this->payload(AnnouncementStatus::Published->value))
            ->assertCreated();

        Event::assertDispatched(AnnouncementPublished::class);
    }

    public function test_saving_draft_does_not_broadcast(): void
    {
        Event::fake([AnnouncementPublished::class]);

        $this->actingAs($this->admin(), 'sanctum')
            ->postJson('/api/v1/government/announcements', $this->payload(AnnouncementStatus::Draft->value))
            ->assertCreated();

        Event::assertNotDispatched(AnnouncementPublished::class);
    }

    public function test_publishing_existing_draft_broadcasts_event(): void
    {
        Event::fake([AnnouncementPublished::class]);

        $announcement = Announcement::factory()->create([
            'status' => AnnouncementStatus::Draft->value,
            'published_at' => null,
        ]);

        $this->actingAs($this->admin(), 'sanctum')
            ->postJson("/api/v1/government/announcements/{$announcement->id}/publish")
            ->assertOk();

        Event::assertDispatched(AnnouncementPublished::class);
    }

    public function test_republishing_already_published_announcement_does_not_rebroadcast(): void
    {
        Event::fake([AnnouncementPublished::class]);

        $announcement = Announcement::factory()->create([
            'status' => AnnouncementStatus::Published->value,
            'published_at' => now()->subDay(),
        ]);

        $this->actingAs($this->admin(), 'sanctum')
            ->postJson("/api/v1/government/announcements/{$announcement->id}/publish")
            ->assertOk();

        Event::assertNotDispatched(AnnouncementPublished::class);
    }

    public function test_event_broadcasts_on_announcements_channel(): void
    {
        $announcement = Announcement::factory()->create([
            'status' => AnnouncementStatus::Published->value,
            'published_at' => now(),
        ]);

        $channels = (new AnnouncementPublished($announcement))->broadcastOn();

        $this->assertSame('private-city.announcements', $channels[0]->name);
    }

    public function test_broadcast_payload_excludes_announcement_body(): void
    {
        $announcement = Announcement::factory()->create([
            'status' => AnnouncementStatus::Published->value,
            'published_at' => now(),
        ]);

        $payload = (new AnnouncementPublished($announcement))->broadcastWith();

        $this->assertArrayNotHasKey('body', $payload);
        $this->assertSame($announcement->title, $payload['title']);
    }
}
