import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Input } from '../../../../../components/ui/Input'
import { FloodDescriptionField } from './FloodDescriptionField'
import { AgreementCheckbox } from './AgreementCheckbox'
import { PhotoDropzone } from '../../../shared/components/PhotoDropzone'
import { LocationSearchInput } from '../../../shared/components/LocationSearchInput'
import { LocationPickerMap } from '../../../shared/components/LocationPickerMap'
import { FloodStatisticsPanel } from '../../../shared/components/FloodStatisticsPanel'
import { FloodInfoSidebar } from '../../../shared/components/FloodInfoSidebar'
import { SubmitReportButton } from '../../../shared/components/SubmitReportButton'
import { useLocationPicker } from '../../../shared/hooks/useLocationPicker'
import { useFloodMarkers } from '../../../shared/hooks/useFloodMarkers'
import { MapControlButton } from '../../../../dashboard/shared/map/MapControlButton'
import { fetchReports } from '../../../../../services/report.service'

const DEFAULT_POSITION = { lat: -6.2088, lng: 106.8229 }
const DEFAULT_ADDRESS = 'Jl. Jendral Sudirman No. 12, Jakarta Selatan'

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

export function FloodReportForm() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  const [floodReports, setFloodReports] = useState([])
  const [floodStatistics, setFloodStatistics] = useState([])

  const { position, address, isLocating, setPosition, locate } = useLocationPicker({
    initialPosition: DEFAULT_POSITION,
    initialAddress: DEFAULT_ADDRESS,
    onChange: (next) => {
      setValue('latitude', next.lat, { shouldValidate: true })
      setValue('longitude', next.lng, { shouldValidate: true })
    },
  })

  const { selectedId, selectMarker } = useFloodMarkers(floodReports)

  useEffect(() => {
    setValue('address', address, { shouldValidate: true })
  }, [address, setValue])

  useEffect(() => {
    let mounted = true

    async function loadFloodData() {
      try {
        const res = await fetchReports({ page: 1, perPage: 100 })
        const items = res?.data ?? []

        const floodMarkers = items
          .filter((r) => (r.category?.slug === 'banjir' || r.water_level_cm) && (r.location?.latitude || r.latitude) && (r.location?.longitude || r.longitude))
          .map((r) => ({
            id: r.id,
            position: { lat: Number(r.location?.latitude || r.latitude), lng: Number(r.location?.longitude || r.longitude) },
            areaName: r.location?.address || r.address || 'Lokasi Banjir',
            waterHeightCm: r.water_level_cm || 0,
            severity: r.priority === 'tinggi' ? 'high' : r.priority === 'sedang' ? 'medium' : 'low',
          }))

        // Statistik dari semua laporan (tidak hanya yang di-filter untuk marker)
        const totalReports = items.length
        const activeFloodMarkers = floodMarkers.length
        const criticalReports = items.filter((r) => r.priority === 'tinggi').length

        const stats = [
          { label: 'Total Laporan', value: totalReports },
          { label: 'Sedang Diproses', value: activeFloodMarkers },
          { label: 'Kritis', value: criticalReports },
        ]

        if (mounted) {
          setFloodReports(floodMarkers)
          setFloodStatistics(stats)
        }
      } catch {
        // Keep empty on error
      }
    }

    loadFloodData()

    return () => {
      mounted = false
    }
  }, [])

  const handleSearchSelect = (item) => {
    setPosition({ lat: item.lat, lng: item.lng })
    setValue('address', item.address, { shouldValidate: true })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-6 rounded-2xl border border-[#DCE9FF] bg-bg-soft p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] sm:p-10"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium tracking-[0.14px] text-text-body">
          Judul Laporan
        </label>
        <Input
          id="title"
          placeholder="Contoh: Genangan air setinggi lutut di Jl. Sudirman"
          error={errors.title}
          className="rounded-lg bg-bg-blue-soft py-[18px]"
          {...register('title')}
        />
        {errors.title && <p className="text-sm text-[#BA1A1A]">{errors.title.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="water_level_cm" className="text-sm font-medium tracking-[0.14px] text-text-body">
          Ketinggian Air (cm)
        </label>
        <Input
          id="water_level_cm"
          type="number"
          placeholder="Contoh: 150"
          error={errors.water_level_cm}
          className="rounded-lg bg-bg-blue-soft py-[18px]"
          {...register('water_level_cm')}
        />
        {errors.water_level_cm && <p className="text-sm text-[#BA1A1A]">{errors.water_level_cm.message}</p>}
      </div>

      <Controller
        name="images"
        control={control}
        render={({ field }) => <PhotoDropzone value={field.value} onChange={field.onChange} />}
      />
      {errors.images && <p className="text-sm text-[#BA1A1A]">{errors.images.message}</p>}

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium tracking-[0.14px] text-text-body">Lokasi Kejadian</label>
          <MapControlButton icon={GpsIcon} label="Gunakan GPS" onClick={locate} disabled={isLocating} className="text-navy" />
        </div>

        <LocationSearchInput onSelect={handleSearchSelect} />

        <div className="relative h-64 overflow-hidden rounded-xl border border-border-muted/30">
          <LocationPickerMap
            position={position}
            onChange={setPosition}
            floodMarkers={floodReports}
            selectedMarkerId={selectedId}
            onSelectMarker={selectMarker}
            className="h-full w-full"
          />

          <div className="pointer-events-none absolute inset-0 z-[400] hidden items-start justify-between p-3 lg:flex">
            <FloodStatisticsPanel
              statistics={{
                todayReports: floodStatistics[0]?.value || floodReports.length || 0,
                activeFloodPoints: floodStatistics[1]?.value || floodReports.length || 0,
                alertStatus: (floodStatistics[2]?.value || 0) > 0 ? 'KRITIS' : 'NORMAL',
              }}
            />
            <FloodInfoSidebar markers={floodReports} selectedId={selectedId} onSelect={selectMarker} />
          </div>

          <div className="pointer-events-none absolute right-3 bottom-3 left-3 z-[400] flex items-center gap-2 rounded-lg bg-white/90 p-3 shadow-md backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-navy" aria-hidden="true" />
            <span className="truncate text-sm text-text-body">{address}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:hidden">
          <FloodStatisticsPanel
            statistics={{
              todayReports: floodStatistics[0]?.value || floodReports.length || 0,
              activeFloodPoints: floodStatistics[1]?.value || floodReports.length || 0,
              alertStatus: (floodStatistics[2]?.value || 0) > 0 ? 'KRITIS' : 'NORMAL',
            }}
          />
          <FloodInfoSidebar markers={floodReports} selectedId={selectedId} onSelect={selectMarker} />
        </div>
        {errors.address && <p className="text-sm text-[#BA1A1A]">{errors.address.message}</p>}
      </div>

      <FloodDescriptionField />

      <div className="flex flex-col items-start justify-between gap-6 pt-2 sm:flex-row sm:items-center">
        <AgreementCheckbox />
        <SubmitReportButton label="Kirim Laporan" />
      </div>
    </motion.div>
  )
}
