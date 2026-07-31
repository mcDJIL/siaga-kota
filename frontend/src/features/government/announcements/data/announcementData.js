// Nilai `value` harus sama dengan enum backend App\Enums\AnnouncementAudience.
export const AUDIENCE_OPTIONS = [
  { value: 'all', label: 'Semua' },
  { value: 'warga', label: 'Warga' },
  { value: 'petugas', label: 'Staf' },
]

// Nilai `value` harus sama dengan enum backend App\Enums\AnnouncementStatus.
export const STATUS_OPTIONS = [
  { value: 'published', label: 'Aktif' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Arsip' },
]

// Nilai `value` harus sama dengan enum backend App\Enums\AnnouncementType.
export const TYPE_OPTIONS = [
  { value: 'info', label: 'Info' },
  { value: 'warning', label: 'Warning' },
  { value: 'weather', label: 'Cuaca' },
]

export const ANNOUNCEMENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
}

export const ANNOUNCEMENT_AUDIENCE = {
  ALL: 'all',
  WARGA: 'warga',
  PETUGAS: 'petugas',
  RW: 'rw',
  ZONE: 'zone',
}
