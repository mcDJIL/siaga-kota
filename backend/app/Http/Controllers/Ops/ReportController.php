<?php

namespace App\Http\Controllers\Ops;

use App\Actions\AssignReport;
use App\Actions\UpdateReportStatus;
use App\Enums\ReportAttachmentType;
use App\Enums\ReportPriority;
use App\Enums\ReportStatus;
use App\Events\ReportMarkedEmergency;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHandlingRequest;
use App\Http\Requests\UpdateReportStatusRequest;
use App\Http\Requests\UploadHandlingPhotosRequest;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use App\Models\ReportAttachment;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ReportController extends Controller
{
    /**
     * @group Ops - Reports
     *
     * @authenticated
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        // Petugas lihat laporan di wilayah kerja (simplified: semua laporan)
        // TODO: filter berdasarkan operator_regions
        $reports = $this->baseReportQuery($request)
            ->when($request->filled('category'), fn ($q) => $q->where('category_id', $request->category))
            ->when($request->filled('emergency'), fn ($q) => $q->where('is_emergency', true))
            ->orderByDesc('priority')
            ->orderByDesc('created_at')
            ->paginate($request->integer('per_page', 20));

        return ReportResource::collection($reports);
    }

    /**
     * Laporan kategori sampah untuk halaman "Laporan Sampah" petugas.
     *
     * @group Ops - Reports
     *
     * @authenticated
     */
    public function wasteReports(Request $request): AnonymousResourceCollection
    {
        return ReportResource::collection(
            $this->reportsByCategorySlug($request, 'sampah'),
        );
    }

    /**
     * Laporan kategori banjir untuk halaman "Laporan Insiden Banjir" petugas.
     *
     * @group Ops - Reports
     *
     * @authenticated
     */
    public function floodReports(Request $request): AnonymousResourceCollection
    {
        return ReportResource::collection(
            $this->reportsByCategorySlug($request, 'banjir'),
        );
    }

    /**
     * @group Ops - Reports
     *
     * @authenticated
     */
    public function show(string $id): JsonResponse
    {
        $report = Report::query()
            ->with(['category', 'user', 'assignedOperator', 'statusHistories.actor', 'attachments.uploader'])
            ->findOrFail($id);

        return response()->json([
            'data' => new ReportResource($report),
        ]);
    }

    /**
     * @group Ops - Reports
     *
     * @authenticated
     */
    public function updateStatus(
        UpdateReportStatusRequest $request,
        UpdateReportStatus $updateStatus,
        string $id
    ): JsonResponse {
        $report = Report::query()->findOrFail($id);

        $data = $request->validated();

        $report = $updateStatus->execute(
            $report,
            $data['status'],
            $request->user(),
            $data['note'] ?? null
        );

        return response()->json([
            'data' => new ReportResource($report),
            'message' => 'Status laporan berhasil diperbarui.',
        ]);
    }

    /**
     * @group Ops - Reports
     *
     * @authenticated
     */
    public function uploadHandlingPhotos(
        UploadHandlingPhotosRequest $request,
        string $id
    ): JsonResponse {
        $report = Report::query()->findOrFail($id);

        $photos = $request->file('photos');

        foreach ($photos as $photo) {
            $path = $photo->store("reports/{$report->id}/handling", 'public');

            ReportAttachment::query()->create([
                'report_id' => $report->id,
                'path' => $path,
                'type' => ReportAttachmentType::Handling->value,
                'uploaded_by' => $request->user()->id,
            ]);
        }

        return response()->json([
            'message' => 'Foto bukti penanganan berhasil diunggah.',
            'data' => [
                'count' => count($photos),
            ],
        ]);
    }

    /**
     * @group Ops - Reports
     *
     * @authenticated
     */
    public function markEmergency(Request $request, string $id): JsonResponse
    {
        $report = Report::query()->findOrFail($id);

        $report->update([
            'is_emergency' => true,
            'priority' => ReportPriority::Mendesak->value,
        ]);

        $report = $report->fresh()->load(['category', 'user', 'assignedOperator']);

        ReportMarkedEmergency::dispatch($report);

        return response()->json([
            'data' => new ReportResource($report),
            'message' => 'Laporan berhasil ditandai sebagai darurat.',
        ]);
    }

    /**
     * @group Ops - Reports
     *
     * @authenticated
     */
    public function assign(Request $request, AssignReport $assignReport, string $id): JsonResponse
    {
        $request->validate([
            'operator_id' => ['required', 'string', 'exists:users,id'],
        ]);

        $report = Report::query()->findOrFail($id);
        $operator = User::query()->findOrFail($request->operator_id);

        $report = $assignReport->execute($report, $operator);

        return response()->json([
            'data' => new ReportResource($report),
            'message' => 'Laporan berhasil ditugaskan.',
        ]);
    }

    /**
     * Aksi "Tandai Darurat" — toggle status darurat laporan.
     *
     * @group Ops - Reports
     *
     * @authenticated
     */
    public function toggleEmergency(Request $request, string $id): JsonResponse
    {
        $report = Report::query()->findOrFail($id);

        $isEmergency = ! $report->is_emergency;

        $report->update([
            'is_emergency' => $isEmergency,
            'priority' => $isEmergency
                ? ReportPriority::Mendesak->value
                : $report->category->default_priority->value,
        ]);

        $report = $report->fresh()->load(['category', 'user', 'assignedOperator']);

        if ($isEmergency) {
            ReportMarkedEmergency::dispatch($report);
        }

        return response()->json([
            'data' => new ReportResource($report),
            'message' => $isEmergency
                ? 'Laporan berhasil ditandai sebagai darurat.'
                : 'Tanda darurat pada laporan berhasil dibatalkan.',
        ]);
    }

    /**
     * Simpan catatan penanganan + foto bukti, lalu tutup laporan sebagai selesai.
     *
     * @group Ops - Reports
     *
     * @authenticated
     */
    public function storeHandling(
        StoreHandlingRequest $request,
        UpdateReportStatus $updateStatus,
        string $id
    ): JsonResponse {
        $report = Report::query()->findOrFail($id);

        $data = $request->validated();

        $report->update([
            'resolution_note' => $data['notes'],
        ]);

        $report = $updateStatus->execute(
            $report,
            ReportStatus::Selesai->value,
            $request->user(),
            $data['notes'],
        );

        foreach ($request->file('evidence', []) as $photo) {
            ReportAttachment::query()->create([
                'report_id' => $report->id,
                'path' => $photo->store("reports/{$report->id}/handling", 'public'),
                'type' => ReportAttachmentType::Handling->value,
                'uploaded_by' => $request->user()->id,
            ]);
        }

        $report = $report->fresh()->load([
            'category',
            'user',
            'assignedOperator',
            'statusHistories.actor',
            'attachments.uploader',
        ]);

        return response()->json([
            'data' => new ReportResource($report),
            'message' => 'Data penanganan berhasil disimpan.',
        ]);
    }

    /**
     * Cetak/Unduh Laporan dalam format PDF sesuai PLAN §6.3.
     *
     * @group Ops - Reports
     *
     * @authenticated
     */
    public function export(string $id): Response
    {
        $report = Report::query()
            ->with(['category', 'user', 'assignedOperator', 'statusHistories.actor', 'attachments'])
            ->findOrFail($id);

        $pdf = Pdf::loadView('pdf.report', [
            'report' => $report,
            'statusLabels' => [
                ReportStatus::Menunggu->value => 'Menunggu Verifikasi',
                ReportStatus::Diverifikasi->value => 'Terverifikasi',
                ReportStatus::Diproses->value => 'Sedang Diproses',
                ReportStatus::Selesai->value => 'Selesai',
                ReportStatus::Ditolak->value => 'Ditolak',
            ],
        ])->setPaper('a4');

        return $pdf->download("laporan-{$report->code}.pdf");
    }

    /**
     * @group Ops - Reports
     *
     * @authenticated
     */
    public function operators(Request $request): JsonResponse
    {
        $operators = User::query()
            ->whereHas('roles', fn ($q) => $q->where('name', 'petugas'))
            ->where('active', true)
            ->with('department')
            ->select(['id', 'name', 'employee_id', 'position', 'department_id'])
            ->get();

        return response()->json([
            'data' => $operators->map(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'employee_id' => $user->employee_id,
                'position' => $user->position,
                'department' => $user->department ? [
                    'id' => $user->department->id,
                    'name' => $user->department->name,
                ] : null,
            ]),
        ]);
    }

    /**
     * Query dasar laporan untuk petugas, termasuk filter status & pencarian
     * berdasarkan kode atau judul laporan.
     */
    private function baseReportQuery(Request $request): Builder
    {
        return Report::query()
            ->with(['category', 'user', 'assignedOperator'])
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->status))
            ->when($request->filled('search'), function (Builder $query) use ($request): void {
                $search = $request->string('search')->toString();

                $query->where(function (Builder $inner) use ($search): void {
                    $inner->where('code', 'ilike', "%{$search}%")
                        ->orWhere('title', 'ilike', "%{$search}%");
                });
            });
    }

    /**
     * Ambil laporan terpaginasi untuk satu slug kategori.
     *
     * @return LengthAwarePaginator<int, Report>
     */
    private function reportsByCategorySlug(Request $request, string $slug): LengthAwarePaginator
    {
        return $this->baseReportQuery($request)
            ->whereHas('category', fn ($q) => $q->where('slug', $slug))
            ->orderByDesc('created_at')
            ->paginate($request->integer('per_page', 20));
    }
}
