<?php

namespace App\Actions;

use App\Enums\ReportPriority;
use App\Enums\ReportStatus;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CreateReport
{
  public function __construct(
    private readonly GenerateReportCode $generateCode,
  ) {}

  /**
   * @param  array<string, mixed>  $data
   * @param  User  $user
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

      // Upload foto utama (foto pertama)
      if ($photos && count($photos) > 0) {
        $firstPhoto = $photos[0];
        $path = $this->storePhoto($firstPhoto, $report->id);
        $report->update(['photo_path' => $path]);
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

      return $report->fresh()->load(['category', 'user']);
    });
  }

  private function storePhoto(UploadedFile $photo, string $reportId): string
  {
    // Strip EXIF bisa pakai Intervention Image nanti
    // Untuk M1, langsung upload tanpa processing
    $filename = sprintf(
      'reports/%s/%s.%s',
      $reportId,
      uniqid('photo_'),
      $photo->getClientOriginalExtension()
    );

    $path = $photo->storeAs('reports/' . $reportId, basename($filename), 'public');

    return $path;
  }
}
