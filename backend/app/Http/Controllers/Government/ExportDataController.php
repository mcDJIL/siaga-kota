<?php

namespace App\Http\Controllers\Government;

use App\Enums\ExportDataType;
use App\Enums\ExportFormat;
use App\Enums\ExportStatus;
use App\Http\Controllers\Controller;
use App\Jobs\ProcessExportJob;
use App\Models\ExportJob;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportDataController extends Controller
{
    /**
     * Riwayat ekspor sesuai UI "Ekspor Data & Laporan".
     *
     * @group Admin - Exports
     * @authenticated
     */
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);

        $exports = ExportJob::query()
            ->latest()
            ->paginate($validated['per_page'] ?? 10);

        return response()->json([
            'data' => [
                'items' => collect($exports->items())
                    ->map(fn (ExportJob $export) => $this->formatExport($export)),
                'total' => $exports->total(),
                'per_page' => $exports->perPage(),
                'current_page' => $exports->currentPage(),
                'last_page' => $exports->lastPage(),
            ],
            'message' => 'Riwayat ekspor berhasil diambil.',
        ]);
    }

    /**
     * Buat job ekspor asinkron. Berkas diproses di queue sesuai PLAN §5.8.
     *
     * @group Admin - Exports
     * @authenticated
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'data_type' => ['required', Rule::enum(ExportDataType::class)],
            'format' => ['required', Rule::enum(ExportFormat::class)],
            'date_from' => ['required', 'date'],
            'date_to' => ['required', 'date', 'after_or_equal:date_from'],
            'filters' => ['nullable', 'array'],
        ], [
            'data_type.required' => 'Jenis data wajib dipilih.',
            'format.required' => 'Format ekspor wajib dipilih.',
            'date_from.required' => 'Tanggal mulai wajib diisi.',
            'date_to.required' => 'Tanggal akhir wajib diisi.',
            'date_to.after_or_equal' => 'Tanggal akhir tidak boleh sebelum tanggal mulai.',
        ]);

        $export = ExportJob::query()->create([
            'user_id' => $request->user()?->id,
            'data_type' => $validated['data_type'],
            'format' => $validated['format'],
            'date_from' => $validated['date_from'],
            'date_to' => $validated['date_to'],
            'filters' => $validated['filters'] ?? null,
            'status' => ExportStatus::Processing->value,
        ]);

        ProcessExportJob::dispatch($export->id);

        return response()->json([
            'data' => $this->formatExport($export),
            'message' => 'Ekspor sedang diproses. Silakan cek riwayat ekspor.',
        ], 202);
    }

    /**
     * @group Admin - Exports
     * @authenticated
     */
    public function download(string $id): StreamedResponse
    {
        $export = ExportJob::query()->findOrFail($id);

        abort_unless($export->isDownloadable(), 404, 'Berkas ekspor tidak tersedia.');
        abort_unless(Storage::disk('public')->exists($export->file_path), 404, 'Berkas ekspor tidak ditemukan.');

        return Storage::disk('public')->download($export->file_path, $export->filename);
    }

    /**
     * @return array<string, mixed>
     */
    private function formatExport(ExportJob $export): array
    {
        return [
            'id' => $export->id,
            'dataType' => $export->data_type->value,
            'dataTypeLabel' => $export->data_type->label(),
            'format' => $export->format->value,
            'formatLabel' => $export->format->label(),
            'status' => $export->status->value,
            'statusLabel' => $export->status->label(),
            'dateFrom' => $export->date_from?->toDateString(),
            'dateTo' => $export->date_to?->toDateString(),
            'exportedAt' => $export->created_at?->toISOString(),
            'expiresAt' => $export->expires_at?->toISOString(),
            'filename' => $export->filename,
            'rowCount' => $export->row_count,
            'error' => $export->error,
            'downloadUrl' => $export->isDownloadable()
                ? url("/api/v1/government/export-data/{$export->id}/download")
                : null,
        ];
    }
}
