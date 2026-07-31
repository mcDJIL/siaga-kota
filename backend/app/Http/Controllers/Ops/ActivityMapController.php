<?php

namespace App\Http\Controllers\Ops;

use App\Actions\AssignReport;
use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\OfficerResource;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\ValidationException;

class ActivityMapController extends Controller
{
    /**
     * Status laporan yang dianggap tugas aktif pada Peta Aktivitas.
     *
     * @var array<int, string>
     */
    private const ACTIVE_STATUSES = [
        ReportStatus::Menunggu->value,
        ReportStatus::Diverifikasi->value,
        ReportStatus::Diproses->value,
    ];

    /**
     * Tugas aktif untuk ditampilkan di Peta Aktivitas.
     *
     * @group Ops - Activity Map
     * @authenticated
     */
    public function getActiveTasks(Request $request): AnonymousResourceCollection
    {
        $reports = Report::query()
            ->selectRaw('*, ST_AsText(location) as location')
            ->with(['category', 'user', 'assignedOperator'])
            ->whereIn('status', self::ACTIVE_STATUSES)
            ->when(
                $request->filled('status') && $request->status !== 'semua',
                fn (Builder $q) => $q->where('status', $request->status),
            )
            ->when(
                $request->filled('region') && $request->region !== 'semua',
                fn (Builder $q) => $q->where('address', 'ilike', '%'.$request->string('region')->toString().'%'),
            )
            ->when(
                $request->filled('category') && $request->category !== 'semua',
                fn (Builder $q) => $q->whereHas('category', fn ($c) => $c->where('slug', $request->category)),
            )
            ->orderByDesc('created_at')
            ->paginate($request->integer('per_page', 50));

        return ReportResource::collection($reports);
    }

    /**
     * Daftar petugas beserta beban tugas aktifnya.
     *
     * @group Ops - Activity Map
     * @authenticated
     */
    public function getOfficers(Request $request): AnonymousResourceCollection
    {
        $officers = User::query()
            ->whereHas('roles', fn ($q) => $q->where('name', 'petugas'))
            ->where('active', true)
            ->with([
                'department',
                'assignedReports' => fn ($q) => $q->whereIn('status', self::ACTIVE_STATUSES),
            ])
            ->when($request->filled('department'), fn ($q) => $q->where('department_id', $request->department))
            ->orderBy('name')
            ->paginate($request->integer('per_page', 50));

        return OfficerResource::collection($officers);
    }

    /**
     * @group Ops - Activity Map
     * @authenticated
     */
    public function getOfficer(string $id): JsonResponse
    {
        $officer = User::query()
            ->whereHas('roles', fn ($q) => $q->where('name', 'petugas'))
            ->with([
                'department',
                'assignedReports' => fn ($q) => $q->whereIn('status', self::ACTIVE_STATUSES),
            ])
            ->findOrFail($id);

        return response()->json([
            'data' => new OfficerResource($officer),
        ]);
    }

    /**
     * Aksi "Kirim Petugas" — tugaskan laporan ke petugas.
     *
     * Sesuai PLAN Resolved Decision #5, penugasan hanya mengisi `assigned_to`
     * dan TIDAK memaksa status menjadi `diproses`. Perubahan status dilakukan
     * terpisah lewat PATCH /ops/reports/{id}/status agar Impact Points tidak
     * diberikan sebelum petugas benar-benar menindaklanjuti.
     *
     * @group Ops - Activity Map
     * @authenticated
     */
    public function assignOfficer(
        Request $request,
        AssignReport $assignReport,
        string $reportId
    ): JsonResponse {
        $validated = $request->validate([
            'officer_id' => ['required', 'string', 'exists:users,id'],
        ], [
            'officer_id.required' => 'ID petugas wajib diisi.',
            'officer_id.exists' => 'Petugas tidak ditemukan.',
        ]);

        $report = Report::query()->findOrFail($reportId);
        $officer = User::query()->findOrFail($validated['officer_id']);

        if (! $officer->hasRole('petugas')) {
            throw ValidationException::withMessages([
                'officer_id' => 'User bukan merupakan petugas.',
            ]);
        }

        $report = $assignReport->execute($report, $officer);

        return response()->json([
            'data' => new ReportResource($report->load(['category', 'user', 'assignedOperator'])),
            'message' => "Laporan berhasil ditugaskan kepada {$officer->name}.",
        ]);
    }

    /**
     * Statistik ringkas Peta Aktivitas.
     *
     * @group Ops - Activity Map
     * @authenticated
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $totalTasks = Report::query()
            ->whereIn('status', self::ACTIVE_STATUSES)
            ->count();

        // Agregasi di SQL, bukan memuat seluruh laporan ke memori.
        $tasksByCategory = Report::query()
            ->join('report_categories', 'reports.category_id', '=', 'report_categories.id')
            ->whereIn('reports.status', self::ACTIVE_STATUSES)
            ->groupBy('report_categories.slug')
            ->selectRaw('report_categories.slug as slug, count(*) as total')
            ->pluck('total', 'slug');

        $officersCount = User::query()
            ->whereHas('roles', fn ($q) => $q->where('name', 'petugas'))
            ->where('active', true)
            ->count();

        $assignedCount = User::query()
            ->whereHas('roles', fn ($q) => $q->where('name', 'petugas'))
            ->whereHas('assignedReports', fn ($q) => $q->whereIn('status', self::ACTIVE_STATUSES))
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
