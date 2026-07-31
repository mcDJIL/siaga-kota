<?php

namespace App\Http\Controllers\Officer;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $reports = Report::query()
            ->selectRaw("*,ST_AsText(location) as location")
            ->with(['category', 'user'])
            ->when($request->filled('status'), fn($q) => $q->where('status', $request->status))
            ->when($request->filled('category'), fn($q) => $q->where('category_id', $request->category))
            ->when($request->filled('search'), function ($q) use ($request) {
                $search = $request->search;
                $q->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('title', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('created_at')
            ->paginate($request->input('per_page', 20));

        return ReportResource::collection($reports);
    }

    /**
     * Get all waste reports (sampah)
     */
    public function wasteReports(Request $request): AnonymousResourceCollection
    {
        $reports = Report::query()
            ->selectRaw("*,ST_AsText(location) as location")
            ->with(['category', 'user'])
            ->whereHas('category', fn($q) => $q->where('slug', 'sampah'))
            ->when($request->filled('status'), fn($q) => $q->where('status', $request->status))
            ->when($request->filled('search'), function ($q) use ($request) {
                $search = $request->search;
                $q->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('title', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('created_at')
            ->paginate($request->input('per_page', 20));

        return ReportResource::collection($reports);
    }

    /**
     * Get all flood reports (banjir)
     */
    public function floodReports(Request $request): AnonymousResourceCollection
    {
        $reports = Report::query()
            ->selectRaw("*,ST_AsText(location) as location")
            ->with(['category', 'user'])
            ->whereHas('category', fn($q) => $q->where('slug', 'banjir'))
            ->when($request->filled('status'), fn($q) => $q->where('status', $request->status))
            ->when($request->filled('search'), function ($q) use ($request) {
                $search = $request->search;
                $q->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('title', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('created_at')
            ->paginate($request->input('per_page', 20));

        return ReportResource::collection($reports);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $report = Report::query()
            ->selectRaw("*,ST_AsText(location) as location")
            ->where('id', $id)
            ->with(['category', 'user', 'assignedOperator', 'statusHistories.actor', 'attachments.uploader'])
            ->firstOrFail();

        return response()->json([
            'data' => new ReportResource($report),
        ]);
    }

    /**
     * Toggle emergency status for a report
     */
    public function toggleEmergency(Request $request, string $id): JsonResponse
    {
        $report = Report::findOrFail($id);
        $report->update([
            'is_emergency' => !$report->is_emergency,
        ]);

        return response()->json([
            'data' => new ReportResource($report->load(['category', 'user', 'assignedOperator', 'statusHistories.actor', 'attachments.uploader'])),
            'message' => $report->is_emergency ? 'Laporan ditandai sebagai darurat.' : 'Laporan ditandai sebagai normal.',
        ]);
    }

    /**
     * Store handling/update report with evidence attachments
     */
    public function storeHandling(Request $request, string $id): JsonResponse
    {
        $report = Report::findOrFail($id);

        $validated = $request->validate([
            'notes' => 'required|string|min:10|max:1000',
            'evidence' => 'array|nullable',
            'evidence.*' => 'image|mimes:jpeg,png,webp|max:5120',
        ], [
            'notes.required' => 'Catatan penanganan wajib diisi.',
            'notes.min' => 'Catatan penanganan minimal 10 karakter.',
            'notes.max' => 'Catatan penanganan maksimal 1000 karakter.',
            'evidence.array' => 'Evidence harus berupa array.',
            'evidence.*.image' => 'File harus berupa gambar.',
            'evidence.*.mimes' => 'Format gambar harus JPG, PNG, atau WebP.',
            'evidence.*.max' => 'Ukuran file maksimal 5MB.',
        ]);

        $oldStatus = $report->status;
        $newStatus = 'selesai';

        $report->update([
            'resolution_note' => $validated['notes'],
            'processed_at' => now(),
            'resolved_at' => now(),
            'status' => $newStatus,
        ]);

        // Create status history record
        \App\Models\ReportStatusHistory::create([
            'report_id' => $report->id,
            'from_status' => $oldStatus,
            'to_status' => $newStatus,
            'actor_id' => $request->user()->id,
            'note' => 'Penanganan selesai dan laporan ditandai selesai.',
        ]);

        if ($request->hasFile('evidence')) {
            foreach ($request->file('evidence') as $file) {
                $path = $file->store('reports/handling', 'public');
                \App\Models\ReportAttachment::create([
                    'report_id' => $report->id,
                    'type' => 'handling_evidence',
                    'path' => $path,
                    'uploaded_by' => $request->user()->id,
                ]);
            }
        }

        return response()->json([
            'data' => new ReportResource($report->refresh()->load(['attachments.uploader', 'statusHistories.actor'])),
            'message' => 'Data penanganan berhasil disimpan.',
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
