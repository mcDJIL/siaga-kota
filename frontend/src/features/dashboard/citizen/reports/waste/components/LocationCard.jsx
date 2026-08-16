import { useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { LocationPickerMap } from '../../../../shared/map/LocationPickerMap'
import { MapControlButton } from '../../../../shared/map/MapControlButton'
import { useLocationPicker } from '../../../../shared/map/hooks/useLocationPicker'

const DEFAULT_POSITION = { lat: -8.1724, lng: 113.7006 }

function GpsIcon(props) {
  return (
    <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.4625 16.425V14.925C5.9 14.75 4.55937 14.1031 3.44062 12.9844C2.32188 11.8656 1.675 10.525 1.5 8.9625H0V7.4625H1.5C1.675 5.9 2.32188 4.55937 3.44062 3.44062C4.55937 2.32188 5.9 1.675 7.4625 1.5V0H8.9625V1.5C10.525 1.675 11.8656 2.32188 12.9844 3.44062C14.1031 4.55937 14.75 5.9 14.925 7.4625H16.425V8.9625H14.925C14.75 10.525 14.1031 11.8656 12.9844 12.9844C11.8656 14.1031 10.525 14.75 8.9625 14.925V16.425H7.4625ZM8.2125 13.4625C9.6625 13.4625 10.9 12.95 11.925 11.925C12.95 10.9 13.4625 9.6625 13.4625 8.2125C13.4625 6.7625 12.95 5.525 11.925 4.5C10.9 3.475 9.6625 2.9625 8.2125 2.9625C6.7625 2.9625 5.525 3.475 4.5 4.5C3.475 5.525 2.9625 6.7625 2.9625 8.2125C2.9625 9.6625 3.475 10.9 4.5 11.925C5.525 12.95 6.7625 13.4625 8.2125 13.4625ZM8.2125 11.2125C7.3875 11.2125 6.68125 10.9187 6.09375 10.3313C5.50625 9.74375 5.2125 9.0375 5.2125 8.2125C5.2125 7.3875 5.50625 6.68125 6.09375 6.09375C6.68125 5.50625 7.3875 5.2125 8.2125 5.2125C9.0375 5.2125 9.74375 5.50625 10.3313 6.09375C10.9187 6.68125 11.2125 7.3875 11.2125 8.2125C11.2125 9.0375 10.9187 9.74375 10.3313 10.3313C9.74375 10.9187 9.0375 11.2125 8.2125 11.2125ZM8.2125 9.7125C8.625 9.7125 8.97813 9.56563 9.27188 9.27188C9.56563 8.97813 9.7125 8.625 9.7125 8.2125C9.7125 7.8 9.56563 7.44687 9.27188 7.15312C8.97813 6.85938 8.625 6.7125 8.2125 6.7125C7.8 6.7125 7.44687 6.85938 7.15312 7.15312C6.85938 7.44687 6.7125 7.8 6.7125 8.2125C6.7125 8.625 6.85938 8.97813 7.15312 9.27188C7.44687 9.56563 7.8 9.7125 8.2125 9.7125Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function LocationCard() {
  const { setValue } = useFormContext()

  const { position, address, isLocating, setPosition, locate } = useLocationPicker({
    initialPosition: DEFAULT_POSITION,
    initialAddress: 'Jember, Jawa Timur',
    onChange: (next, newAddress) => {
      setValue('latitude', next.lat, { shouldValidate: true })
      setValue('longitude', next.lng, { shouldValidate: true })
      if (newAddress) {
        setValue('address', newAddress, { shouldValidate: true })
      }
    },
  })

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-4 rounded-2xl border border-[#F1F5F9] bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-semibold text-text-body">Lokasi Kejadian</h3>
        <MapControlButton
          icon={GpsIcon}
          label="GPS"
          onClick={locate}
          disabled={isLocating}
          className="text-[#006D40]"
        />
      </div>

      <div className="relative h-[257px] overflow-hidden rounded-xl border border-[#F1F5F9]">
        <LocationPickerMap position={position} onChange={setPosition} className="h-full w-full z-0" />

        <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-1 rounded-lg border border-white/50 bg-white/90 px-3 py-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] backdrop-blur-sm">
          <MapPin className="h-3 w-3 shrink-0 text-navy" aria-hidden="true" />
          <span className="text-xs font-bold text-navy">{address}</span>
        </div>
      </div>

      <p className="text-[11px] leading-[17.88px] text-text-muted italic">
        Geser penanda merah di peta untuk akurasi lokasi pembuangan sampah yang tepat.
      </p>
    </motion.section>
  )
}
