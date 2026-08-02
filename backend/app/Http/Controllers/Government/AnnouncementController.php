<?php

namespace App\Http\Controllers\Government;

use App\Enums\AnnouncementAudience;
use App\Enums\AnnouncementStatus;
use App\Enums\AnnouncementType;
use App\Events\AnnouncementPublished;
use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AnnouncementController extends Controller
{
    /**
     * @group Admin - Announcements
     *
     * @authenticated
     */
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['nullable', Rule::enum(AnnouncementStatus::class)],
            'audience' => ['nullable', Rule::enum(AnnouncementAudience::class)],
            'search' => ['nullable', 'string', 'max:255'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);

        $announcements = Announcement::query()
            ->with('creator:id,name')
            ->when(
                $validated['status'] ?? null,
                fn (Builder $q, string $status) => $q->where('status', $status),
            )
            ->when(
                $validated['audience'] ?? null,
                fn (Builder $q, string $audience) => $q->forAudience($audience),
            )
            ->when($validated['search'] ?? null, function (Builder $q, string $search): void {
                // Bungkus dalam grup agar tidak membocorkan filter status/audience.
                $q->where(function (Builder $inner) use ($search): void {
                    $inner->where('title', 'ilike', "%{$search}%")
                        ->orWhere('body', 'ilike', "%{$search}%");
                });
            })
            ->latest('created_at')
            ->paginate($validated['per_page'] ?? 10);

        return response()->json([
            'data' => [
                'announcements' => collect($announcements->items())
                    ->map(fn (Announcement $item) => $this->formatAnnouncement($item)),
                'total' => $announcements->total(),
                'per_page' => $announcements->perPage(),
                'current_page' => $announcements->currentPage(),
                'last_page' => $announcements->lastPage(),
            ],
            'message' => 'Pengumuman berhasil diambil.',
        ]);
    }

    /**
     * @group Admin - Announcements
     *
     * @authenticated
     */
    public function show(string $id): JsonResponse
    {
        $announcement = Announcement::query()->with('creator:id,name')->findOrFail($id);

        return response()->json([
            'data' => $this->formatAnnouncement($announcement),
            'message' => 'Detail pengumuman berhasil diambil.',
        ]);
    }

    /**
     * @group Admin - Announcements
     *
     * @authenticated
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'type' => ['nullable', Rule::enum(AnnouncementType::class)],
            'audience' => ['required', Rule::enum(AnnouncementAudience::class)],
            'audience_value' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::enum(AnnouncementStatus::class)],
            'published_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after:published_at'],
        ], [
            'title.required' => 'Judul pengumuman wajib diisi.',
            'body.required' => 'Konten pengumuman wajib diisi.',
            'audience.required' => 'Audiens pengumuman wajib dipilih.',
            'status.required' => 'Status pengumuman wajib dipilih.',
            'expires_at.after' => 'Tanggal kedaluwarsa harus setelah tanggal publikasi.',
        ]);

        $validated['type'] ??= AnnouncementType::Info->value;
        $validated['created_by'] = $request->user()->id;

        if ($validated['status'] === AnnouncementStatus::Published->value) {
            $validated['published_at'] ??= now();
        }

        $announcement = Announcement::query()->create($validated);

        if ($announcement->status === AnnouncementStatus::Published) {
            AnnouncementPublished::dispatch($announcement);
        }

        return response()->json([
            'data' => $this->formatAnnouncement($announcement->load('creator:id,name')),
            'message' => 'Pengumuman berhasil dibuat.',
        ], 201);
    }

    /**
     * @group Admin - Announcements
     *
     * @authenticated
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $announcement = Announcement::query()->findOrFail($id);

        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'body' => ['sometimes', 'required', 'string'],
            'type' => ['nullable', Rule::enum(AnnouncementType::class)],
            'audience' => ['nullable', Rule::enum(AnnouncementAudience::class)],
            'audience_value' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', Rule::enum(AnnouncementStatus::class)],
            'published_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date'],
        ]);

        $isPublishing = ($validated['status'] ?? null) === AnnouncementStatus::Published->value;
        $wasPublished = $announcement->status === AnnouncementStatus::Published;

        if ($isPublishing && ! $announcement->published_at) {
            $validated['published_at'] ??= now();
        }

        $announcement->update($validated);
        $announcement = $announcement->fresh();

        // Siarkan hanya pada transisi menjadi published, bukan setiap penyuntingan
        // pengumuman yang sudah publik.
        if ($isPublishing && ! $wasPublished) {
            AnnouncementPublished::dispatch($announcement);
        }

        return response()->json([
            'data' => $this->formatAnnouncement($announcement->load('creator:id,name')),
            'message' => 'Pengumuman berhasil diperbarui.',
        ]);
    }

    /**
     * @group Admin - Announcements
     *
     * @authenticated
     */
    public function destroy(string $id): JsonResponse
    {
        $announcement = Announcement::query()->findOrFail($id);
        $title = $announcement->title;

        $announcement->delete();

        return response()->json([
            'message' => "Pengumuman \"{$title}\" berhasil dihapus.",
        ]);
    }

    /**
     * @group Admin - Announcements
     *
     * @authenticated
     */
    public function publish(string $id): JsonResponse
    {
        $announcement = Announcement::query()->findOrFail($id);
        $wasPublished = $announcement->status === AnnouncementStatus::Published;

        $announcement->update([
            'status' => AnnouncementStatus::Published->value,
            'published_at' => $announcement->published_at ?? now(),
        ]);

        $announcement = $announcement->fresh();

        if (! $wasPublished) {
            AnnouncementPublished::dispatch($announcement);
        }

        return response()->json([
            'data' => $this->formatAnnouncement($announcement->load('creator:id,name')),
            'message' => 'Pengumuman berhasil dipublikasikan.',
        ]);
    }

    /**
     * @group Admin - Announcements
     *
     * @authenticated
     */
    public function archive(string $id): JsonResponse
    {
        $announcement = Announcement::query()->findOrFail($id);

        $announcement->update([
            'status' => AnnouncementStatus::Archived->value,
        ]);

        return response()->json([
            'data' => $this->formatAnnouncement($announcement->fresh()->load('creator:id,name')),
            'message' => 'Pengumuman berhasil diarsipkan.',
        ]);
    }

    /**
     * Pengumuman publik: hanya yang berstatus `published` dan belum kedaluwarsa.
     *
     * @group Public - Announcements
     *
     * @unauthenticated
     */
    public function getPublic(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'audience' => ['nullable', Rule::enum(AnnouncementAudience::class)],
            'limit' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $announcements = Announcement::query()
            ->published()
            ->when(
                $validated['audience'] ?? null,
                fn (Builder $q, string $audience) => $q->forAudience($audience),
            )
            ->latest('published_at')
            ->limit($validated['limit'] ?? 5)
            ->get();

        return response()->json([
            'data' => [
                'announcements' => $announcements
                    ->map(fn (Announcement $item) => $this->formatAnnouncement($item)),
            ],
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function formatAnnouncement(Announcement $announcement): array
    {
        return [
            'id' => $announcement->id,
            'title' => $announcement->title,
            'body' => $announcement->body,
            'type' => $announcement->type->value,
            'typeLabel' => $announcement->type->label(),
            'audience' => $announcement->audience->value,
            'audienceLabel' => $announcement->audience->label(),
            'audience_value' => $announcement->audience_value,
            'status' => $announcement->status->value,
            'statusLabel' => $announcement->status->label(),
            'published_at' => $announcement->published_at?->toISOString(),
            'expires_at' => $announcement->expires_at?->toISOString(),
            'created_by' => $announcement->relationLoaded('creator') && $announcement->creator
                ? [
                    'id' => $announcement->creator->id,
                    'name' => $announcement->creator->name,
                ]
                : null,
            'created_at' => $announcement->created_at?->toISOString(),
            'updated_at' => $announcement->updated_at?->toISOString(),
        ];
    }
}
