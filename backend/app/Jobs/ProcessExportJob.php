<?php

namespace App\Jobs;

use App\Enums\ExportDataType;
use App\Enums\ExportFormat;
use App\Models\ExportJob;
use App\Models\Report;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

/**
 * Memproses job ekspor data secara asinkron sesuai PLAN §5.8.
 */
class ProcessExportJob implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $timeout = 300;

    /**
     * @return array<int, int>
     */
    public function backoff(): array
    {
        return [10, 30, 60];
    }

    public function __construct(public readonly string $exportJobId) {}

    public function handle(): void
    {
        $exportJob = ExportJob::query()->find($this->exportJobId);

        if (! $exportJob) {
            return;
        }

        $rows = $this->buildRows($exportJob);
        $filename = $this->buildFilename($exportJob);
        $filePath = "exports/{$filename}";

        $contents = match ($exportJob->format) {
            ExportFormat::Pdf => Pdf::loadHTML($this->buildHtml($exportJob, $rows))
                ->setPaper('a4', 'landscape')
                ->output(),
            ExportFormat::Excel => $this->buildHtml($exportJob, $rows),
            ExportFormat::Csv => $this->buildCsv($rows),
        };

        Storage::disk('public')->put($filePath, $contents);

        $exportJob->markAsCompleted($filePath, $filename, count($rows));
    }

    public function failed(?Throwable $exception): void
    {
        $exportJob = ExportJob::query()->find($this->exportJobId);

        $exportJob?->markAsFailed(
            $exception?->getMessage() ?? 'Ekspor gagal tanpa keterangan.',
        );

        Log::error('Export job gagal diproses.', [
            'export_job_id' => $this->exportJobId,
            'error' => $exception?->getMessage(),
        ]);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function buildRows(ExportJob $exportJob): array
    {
        return Report::query()
            ->with(['category', 'user', 'assignedOperator'])
            ->when(
                $exportJob->date_from,
                fn (Builder $q) => $q->whereDate('created_at', '>=', $exportJob->date_from),
            )
            ->when(
                $exportJob->date_to,
                fn (Builder $q) => $q->whereDate('created_at', '<=', $exportJob->date_to),
            )
            ->when(
                $exportJob->data_type === ExportDataType::Waste,
                fn (Builder $q) => $q->whereHas('category', fn ($c) => $c->where('slug', 'sampah')),
            )
            ->when(
                $exportJob->data_type === ExportDataType::Flood,
                fn (Builder $q) => $q->whereHas('category', fn ($c) => $c->where('slug', 'banjir')),
            )
            ->latest('created_at')
            ->get()
            ->map(fn (Report $report) => [
                'Kode' => $report->code,
                'Kategori' => $report->category?->name ?? '-',
                'Judul' => $report->title,
                'Pelapor' => $report->user?->name ?? '-',
                'Petugas' => $report->assignedOperator?->name ?? '-',
                'Status' => $report->status->value,
                'Prioritas' => $report->priority->value,
                'Alamat' => $report->address,
                'Tinggi Air (cm)' => $report->water_level_cm ?? '-',
                'Darurat' => $report->is_emergency ? 'Ya' : 'Tidak',
                'Tanggal Laporan' => $report->created_at?->format('Y-m-d H:i:s'),
            ])
            ->all();
    }

    /**
     * @param  array<int, array<string, mixed>>  $rows
     */
    private function buildCsv(array $rows): string
    {
        $handle = fopen('php://temp', 'r+');
        $headers = array_keys($rows[0] ?? $this->emptyRow());

        fputcsv($handle, $headers);

        foreach ($rows as $row) {
            fputcsv($handle, array_values($row));
        }

        rewind($handle);
        $contents = stream_get_contents($handle);
        fclose($handle);

        return $contents;
    }

    /**
     * @param  array<int, array<string, mixed>>  $rows
     */
    private function buildHtml(ExportJob $exportJob, array $rows): string
    {
        $headers = array_keys($rows[0] ?? $this->emptyRow());
        $title = $exportJob->data_type->label();

        $html = '<!doctype html><html><head><meta charset="utf-8"><style>'
            .'body{font-family:DejaVu Sans,sans-serif;font-size:11px;color:#111827}'
            .'h1{font-size:20px;margin:0 0 12px}'
            .'table{width:100%;border-collapse:collapse}'
            .'th,td{border:1px solid #d1d5db;padding:6px;text-align:left;vertical-align:top}'
            .'th{background:#f3f4f6}'
            .'</style></head><body>';

        $html .= '<h1>'.e($title).'</h1><table><thead><tr>';

        foreach ($headers as $header) {
            $html .= '<th>'.e($header).'</th>';
        }

        $html .= '</tr></thead><tbody>';

        foreach ($rows as $row) {
            $html .= '<tr>';

            foreach ($headers as $header) {
                $html .= '<td>'.e($row[$header] ?? '-').'</td>';
            }

            $html .= '</tr>';
        }

        if ($rows === []) {
            $html .= '<tr><td colspan="'.count($headers).'">Tidak ada data pada rentang tanggal ini.</td></tr>';
        }

        return $html.'</tbody></table></body></html>';
    }

    private function buildFilename(ExportJob $exportJob): string
    {
        return Str::slug($exportJob->data_type->label())
            .'-'.now()->format('Y-m-d-His')
            .'.'.$exportJob->format->extension();
    }

    /**
     * @return array<string, string>
     */
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
}
