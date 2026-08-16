<?php

namespace App\Actions;

use App\Enums\ReportAttachmentType;
use App\Enums\ReportStatus;
use App\Events\ReportCreated;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class CreateReport
{
    public function __construct(
        private readonly GenerateReportCode $generateCode,
    ) {}

    /**
     * @param  array<string, mixed>  $data
     * @param  array<UploadedFile>|null  $photos
     */
    public function execute(array $data, User $user, ?array $photos = null): Report
    {
        return DB::transaction(function () use ($data, $user, $photos): Report {
            $category = ReportCategory::query()->findOrFail($data['category_id']);

            $code = $this->generateCode->execute($category);

            // Tentukan priority dari category default atau severity
            $priority = $category->default_priority;

            // PostGIS Point: POINT(lng lat)
            $locationWKT = sprintf(
                'POINT(%s %s)',
                $data['longitude'],
                $data['latitude']
            );

            $report = Report::query()->create([
                'code' => $code,
                'user_id' => $user->id,
                'category_id' => $category->id,
                'title' => $data['title'],
                'description' => $data['description'],
                'status' => ReportStatus::Menunggu->value,
                'priority' => $priority->value,
                'location' => DB::raw("ST_GeomFromText('{$locationWKT}', 4326)"),
                'address' => $data['address'],
                'waste_type' => $data['waste_type'] ?? null,
                'water_level_cm' => $data['water_level_cm'] ?? null,
                'is_emergency' => false,
                'photo_path' => null,
            ]);

            // Upload semua foto
            if ($photos && count($photos) > 0) {
                // Simpan foto pertama sebagai primary photo
                $firstPhoto = $photos[0];
                $primaryPath = $this->storePhoto($firstPhoto, $report->id);
                $report->update(['photo_path' => $primaryPath]);

                // Simpan foto tambahan sebagai attachments
                if (count($photos) > 1) {
                    foreach (array_slice($photos, 1) as $photo) {
                        $path = $this->storePhoto($photo, $report->id);
                        $report->attachments()->create([
                            'path' => $path,
                            'type' => ReportAttachmentType::Reporter->value,
                            'uploaded_by' => $user->id,
                        ]);
                    }
                }
            }

            // Buat history awal
            ReportStatusHistory::query()->create([
                'report_id' => $report->id,
                'from_status' => null,
                'to_status' => ReportStatus::Menunggu->value,
                'actor_id' => $user->id,
                'note' => 'Laporan dibuat oleh warga.',
                'created_at' => now(),
            ]);

            $report = Report::query()
                ->withLocationText()
                ->with(['category', 'user'])
                ->findOrFail($report->id);

            ReportCreated::dispatch($report);

            return $report;
        });
    }

    private function storePhoto(UploadedFile $photo, string $reportId): string
    {
        // Strip EXIF bisa pakai Intervention Image nanti
        // Untuk M1, langsung upload tanpa processing
        $extension = $photo->extension() ?: 'jpg';
        $filename = sprintf('photo_%s.%s', uniqid(), $extension);

        $path = $photo->storeAs('reports/'.$reportId, basename($filename), 'public');

        if (! is_string($path) || $path === '') {
            throw new RuntimeException('Foto laporan gagal disimpan ke storage.');
        }

        return $path;
    }
}
