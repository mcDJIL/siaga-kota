import { MapPin } from 'lucide-react'

/**
 * Placeholder for the future React Leaflet location picker.
 * Disabled until map-based location selection is implemented.
 */
export function LocationPicker() {
  return (
    <button
      type="button"
      disabled
      aria-label="Pilih lokasi di peta (segera hadir)"
      className="flex h-32 w-full cursor-not-allowed flex-col items-center justify-center gap-2 rounded-lg bg-bg-soft text-badge-neutral"
    >
      <MapPin size={18} aria-hidden="true" />
      <span className="text-sm">Pilih lokasi di peta (segera hadir)</span>
    </button>
  )
}
