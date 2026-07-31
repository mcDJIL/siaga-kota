<?php

namespace App\Http\Controllers\Government;

use App\Http\Controllers\Controller;
use App\Models\DataExport;
use App\Models\Report;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ExportDataController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $exports = DataExport::query()
            ->latest()
            ->paginate($validated['per_page'] ?? 10);

        return response()->json([
            'data' => [
                'items' => collect($exports->items())->map(fn(DataExport $export) => $this->formatExport($export)),
                'total' => $exports->total(),
                'per_page' => $exports->perPage(),
                'current_page' => $exports->currentPage(),
                'last_page' => $exports->lastPage(),
            ],
            'message' => 'Riwayat ekspor berhasil diambil.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'data_type' => ['required', Rule::in(['Semua Sektor', 'Analitik Sampah', 'Analitik Banjir', 'Heatmap Aktivitas', 'Prediksi AI', 'Laporan Masyarakat'])],
            'format' => ['required', Rule::in(['PDF', 'Excel', 'CSV'])],
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $rows = $this->buildRows($validated['data_type'], $validated['start_date'], $validated['end_date']);
        $filename = $this->buildFilename($validated['data_type'], $validated['format']);
        $filePath = 'exports/' . $filename;
        $absolutePath = storage_path('app/public/' . $filePath);

        if (!is_dir(dirname($absolutePath))) {
            mkdir(dirname($absolutePath), 0755, true);
        }

        match ($validated['format']) {
            'PDF' => Pdf::loadHTML($this->buildHtml($validated['data_type'], $rows))->setPaper('a4', 'landscape')->save($absolutePath),
            'Excel' => file_put_contents($absolutePath, $this->buildHtml($validated['data_type'], $rows)),
            default => file_put_contents($absolutePath, $this->buildCsv($rows)),
        };

        $export = DataExport::create([
            'user_id' => $request->user()?->id,
            'data_type' => $validated['data_type'],
            'format' => $validated['format'],
            'status' => 'Selesai',
            'file_path' => $filePath,
            'filename' => $filename,
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'row_count' => count($rows),
        ]);

        return response()->json([
            'data' => $this->formatExport($export),
            'message' => 'Ekspor berhasil dibuat.',
        ], 201);
    }

    public function download(string $id)
    {
        $export = DataExport::findOrFail($id);
        $absolutePath = storage_path('app/public/' . $export->file_path);

        abort_unless($export->status === 'Selesai' && is_file($absolutePath), 404);

        return Response::download($absolutePath, $export->filename);
    }

    private function buildRows(string $dataType, string $startDate, string $endDate): array
    {
        $query = Report::query()
            ->with(['category', 'user', 'assignedOperator'])
            ->whereNull('deleted_at')
            ->whereDate('created_at', '>=', $startDate)
            ->whereDate('created_at', '<=', $endDate)
            ->latest('created_at');

        if ($dataType === 'Analitik Sampah') {
            $query->whereHas('category', fn($q) => $q->where('slug', 'sampah'));
        } elseif ($dataType === 'Analitik Banjir') {
            $query->whereHas('category', fn($q) => $q->where('slug', 'banjir'));
        } elseif ($dataType === 'Prediksi AI') {
            $query->where(fn($q) => $q->where('is_emergency', true)->orWhere('water_level_cm', '>', 50));
        }

        return $query->get()->map(function (Report $report) {
            return [
                'Kode' => $report->code,
                'Kategori' => $report->category?->name ?? '-',
                'Judul' => $report->title,
                'Pelapor' => $report->user?->name ?? '-',
                'Petugas' => $report->assignedOperator?->name ?? '-',
                'Status' => $this->enumValue($report->status),
                'Prioritas' => $this->enumValue($report->priority),
                'Alamat' => $report->address,
                'Tinggi Air (cm)' => $report->water_level_cm ?? '-',
                'Darurat' => $report->is_emergency ? 'Ya' : 'Tidak',
                'Tanggal Laporan' => $report->created_at?->format('Y-m-d H:i:s'),
            ];
        })->toArray();
    }

    private function buildCsv(array $rows): string
    {
        $handle = fopen('php://temp', 'r+');
        $headers = array_keys($rows[0] ?? $this->emptyRow());

        fputcsv($handle, $headers);
        foreach ($rows as $row) {
            fputcsv($handle, array_values($row));
        }

        rewind($handle);
        return stream_get_contents($handle);
    }

    private function buildHtml(string $title, array $rows): string
    {
        $headers = array_keys($rows[0] ?? $this->emptyRow());
        $html = '<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:DejaVu Sans,sans-serif;font-size:11px;color:#111827}h1{font-size:20px;margin:0 0 12px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #d1d5db;padding:6px;text-align:left;vertical-align:top}th{background:#f3f4f6}</style></head><body>';
        $html .= '<h1>' . e($title) . '</h1><table><thead><tr>';

        foreach ($headers as $header) {
            $html .= '<th>' . e($header) . '</th>';
        }

        $html .= '</tr></thead><tbody>';

        foreach ($rows as $row) {
            $html .= '<tr>';
            foreach ($headers as $header) {
                $html .= '<td>' . e($row[$header] ?? '-') . '</td>';
            }
            $html .= '</tr>';
        }

        if (empty($rows)) {
            $html .= '<tr><td colspan="' . count($headers) . '">Tidak ada data pada rentang tanggal ini.</td></tr>';
        }

        return $html . '</tbody></table></body></html>';
    }

    private function buildFilename(string $dataType, string $format): string
    {
        $extension = ['PDF' => 'pdf', 'Excel' => 'xls', 'CSV' => 'csv'][$format];

        return Str::slug($dataType) . '-' . now()->format('Y-m-d-His') . '.' . $extension;
    }

    private function emptyRow(): array
    {
        return [
            'Kode' => '-',
            'Kategori' => '-',
            'Judul' => '-',
            'Pelapor' => '-',
            'Petugas' => '-',
            'Status' => '-',
            'Prioritas' => '-',
            'Alamat' => '-',
            'Tinggi Air (cm)' => '-',
            'Darurat' => '-',
            'Tanggal Laporan' => '-',
        ];
    }

    private function enumValue($value): string
    {
        return $value instanceof \BackedEnum ? $value->value : (string) $value;
    }

    private function formatExport(DataExport $export): array
    {
        return [
            'id' => $export->id,
            'dataType' => $export->data_type,
            'format' => $export->format,
            'status' => $export->status,
            'exportedAt' => $export->created_at?->toISOString(),
            'filename' => $export->filename,
            'rowCount' => $export->row_count,
            'downloadUrl' => url('/api/v1/government/export-data/' . $export->id . '/download'),
        ];
    }
}
