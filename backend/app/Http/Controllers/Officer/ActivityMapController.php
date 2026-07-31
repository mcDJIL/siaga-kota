<?php

namespace App\Http\Controllers\Officer;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportResource;
use App\Http\Resources\OfficerResource;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\ValidationException;

class ActivityMapController extends Controller
{
    /**
     * Get active tasks for activity map
     */
    public function getActiveTasks(Request $request): AnonymousResourceCollection
    {
        $query = Report::query()
            ->selectRaw("*,ST_AsText(location) as location")
            ->with(['category', 'user', 'assignedOperator'])
            ->whereIn('status', ['menunggu', 'diproses', 'terverifikasi'])
            ->orderByDesc('created_at');

        // Filter by region if provided
        if ($request->filled('region') && $request->region !== 'semua') {
            $query->where('address', 'like', "%{$request->region}%");
        }

        // Filter by status if provided
        if ($request->filled('status') && $request->status !== 'semua') {
            $query->where('status', $request->status);
        }

        // Filter by category if provided
        if ($request->filled('category') && $request->category !== '') {
            $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        }

        $reports = $query->paginate($request->input('per_page', 50));

        return ReportResource::collection($reports);
    }

    /**
     * Get officers with role petugas
     */
    public function getOfficers(Request $request): AnonymousResourceCollection
    {
        $officers = User::query()
            ->whereHas('roles', fn($q) => $q->where('name', 'petugas'))
            ->with(['department', 'assignedReports' => function($q) {
                $q->whereIn('status', ['diproses']);
            }])
            ->where('active', true)
            ->when($request->filled('department'), fn($q) => $q->where('department_id', $request->department))
            ->orderBy('name')
            ->paginate($request->input('per_page', 50));

        return OfficerResource::collection($officers);
    }

    /**
     * Get officer by ID
     */
    public function getOfficer(string $id): JsonResponse
    {
        $officer = User::query()
            ->whereHas('roles', fn($q) => $q->where('name', 'petugas'))
            ->with(['department', 'assignedReports'])
            ->findOrFail($id);

        return response()->json([
            'data' => new OfficerResource($officer),
        ]);
    }

    /**
     * Assign officer to report
     */
    public function assignOfficer(Request $request, string $reportId): JsonResponse
    {
        $validated = $request->validate([
            'officer_id' => 'required|exists:users,id',
        ], [
            'officer_id.required' => 'ID petugas wajib diisi.',
            'officer_id.exists' => 'Petugas tidak ditemukan.',
        ]);

        $report = Report::findOrFail($reportId);
        $officer = User::findOrFail($validated['officer_id']);

        // Verify officer has petugas role
        if (! $officer->hasRole('petugas')) {
            throw ValidationException::withMessages([
                'officer_id' => 'User bukan merupakan petugas.',
            ]);
        }

        $oldStatus = $report->status;
        $report->update([
            'assigned_to' => $officer->id,
            'status' => 'diproses',
            'accepted_at' => now(),
            'processed_at' => now(),
        ]);

        // Create status history
        \App\Models\ReportStatusHistory::create([
            'report_id' => $report->id,
            'from_status' => $oldStatus,
            'to_status' => 'diproses',
            'actor_id' => $request->user()->id,
            'note' => "Laporan ditugaskan kepada {$officer->name} dan mulai diproses.",
        ]);

        return response()->json([
            'data' => new ReportResource($report->load(['category', 'user', 'assignedOperator'])),
            'message' => "Laporan berhasil ditugaskan kepada {$officer->name} dan status berubah ke Diproses.",
        ]);
    }

    /**
     * Get statistics for activity map
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $activeStatuses = ['diverifikasi', 'diproses'];
        $totalTasks = Report::whereIn('status', $activeStatuses)->count();
        $tasksByCategory = Report::query()
            ->whereIn('status', $activeStatuses)
            ->with('category')
            ->get()
            ->groupBy('category.slug')
            ->map(fn($group) => $group->count());

        $officersCount = User::query()
            ->whereHas('roles', fn($q) => $q->where('name', 'petugas'))
            ->where('active', true)
            ->count();

        $assignedCount = User::query()
            ->whereHas('roles', fn($q) => $q->where('name', 'petugas'))
            ->whereHas('assignedReports', fn($q) => $q->whereIn('status', $activeStatuses))
            ->where('active', true)
            ->count();

        return response()->json([
            'data' => [
                'total_tasks' => $totalTasks,
                'tasks_by_category' => $tasksByCategory,
                'total_officers' => $officersCount,
                'assigned_officers' => $assignedCount,
                'available_officers' => $officersCount - $assignedCount,
            ],
        ]);
    }
}
