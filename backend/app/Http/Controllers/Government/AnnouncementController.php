<?php

namespace App\Http\Controllers\Government;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AnnouncementController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['nullable', Rule::in('Draft', 'Aktif', 'Arsip')],
            'target' => ['nullable', Rule::in('Semua', 'Warga', 'Petugas', 'Pemerintah')],
            'search' => 'nullable|string|max:255',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = Announcement::query()->latest('created_at');

        if ($validated['status'] ?? null) {
            $query->where('status', $validated['status']);
        }

        if ($validated['target'] ?? null) {
            $query->forTarget($validated['target']);
        }

        if ($validated['search'] ?? null) {
            $query->where('title', 'like', "%{$validated['search']}%")
                ->orWhere('body', 'like', "%{$validated['search']}%");
        }

        $announcements = $query->paginate($validated['per_page'] ?? 10);

        return response()->json([
            'data' => [
                'announcements' => $announcements->items(),
                'total' => $announcements->total(),
                'per_page' => $announcements->per_page(),
                'current_page' => $announcements->current_page(),
                'last_page' => $announcements->last_page(),
            ],
            'message' => 'Pengumuman berhasil diambil.',
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $announcement = Announcement::findOrFail($id);

        return response()->json([
            'data' => $announcement,
            'message' => 'Detail pengumuman berhasil diambil.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'target' => ['required', Rule::in('Semua', 'Warga', 'Petugas', 'Pemerintah')],
            'status' => ['required', Rule::in('Draft', 'Aktif', 'Arsip')],
        ], [
            'title.required' => 'Judul pengumuman wajib diisi.',
            'body.required' => 'Konten pengumuman wajib diisi.',
            'target.required' => 'Target pengumuman wajib dipilih.',
            'status.required' => 'Status pengumuman wajib dipilih.',
        ]);

        $validated['created_by'] = $request->user()->id;

        if ($validated['status'] === 'Aktif') {
            $validated['published_at'] = now();
        }

        $announcement = Announcement::create($validated);

        return response()->json([
            'data' => $announcement,
            'message' => 'Pengumuman berhasil dibuat.',
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $announcement = Announcement::findOrFail($id);

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'body' => 'nullable|string',
            'target' => ['nullable', Rule::in('Semua', 'Warga', 'Petugas', 'Pemerintah')],
            'status' => ['nullable', Rule::in('Draft', 'Aktif', 'Arsip')],
        ]);

        // If status changes to Aktif and not yet published, set published_at
        if (($validated['status'] ?? null) === 'Aktif' && !$announcement->published_at) {
            $validated['published_at'] = now();
        }

        $announcement->update($validated);

        return response()->json([
            'data' => $announcement,
            'message' => 'Pengumuman berhasil diperbarui.',
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $announcement = Announcement::findOrFail($id);
        $title = $announcement->title;
        $announcement->delete();

        return response()->json([
            'message' => "Pengumuman \"{$title}\" berhasil dihapus.",
        ]);
    }

    public function publish(Request $request, string $id): JsonResponse
    {
        $announcement = Announcement::findOrFail($id);

        $announcement->update([
            'status' => 'Aktif',
            'published_at' => now(),
        ]);

        return response()->json([
            'data' => $announcement,
            'message' => 'Pengumuman berhasil dipublikasikan.',
        ]);
    }

    public function archive(Request $request, string $id): JsonResponse
    {
        $announcement = Announcement::findOrFail($id);

        $announcement->update([
            'status' => 'Arsip',
        ]);

        return response()->json([
            'data' => $announcement,
            'message' => 'Pengumuman berhasil diarsipkan.',
        ]);
    }

    public function getPublic(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'target' => ['nullable', Rule::in('Semua', 'Warga', 'Petugas', 'Pemerintah')],
            'limit' => 'nullable|integer|min:1|max:50',
        ]);

        $query = Announcement::active()->published()->latest('published_at');

        if ($validated['target'] ?? null) {
            $query->forTarget($validated['target']);
        }

        $announcements = $query->limit($validated['limit'] ?? 5)->get();

        return response()->json([
            'data' => [
                'announcements' => $announcements,
            ],
        ]);
    }
}
