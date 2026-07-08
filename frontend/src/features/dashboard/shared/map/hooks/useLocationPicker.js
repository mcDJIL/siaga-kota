import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export function useLocationPicker({ initialPosition, initialAddress = 'Jl. Thamrin No. 12, Menteng', onChange }) {
  const [position, setPositionState] = useState(initialPosition)
  const [address, setAddress] = useState(initialAddress)
  const [isLocating, setIsLocating] = useState(false)

  const setPosition = useCallback(
    (next) => {
      setPositionState(next)
      setAddress(`Lokasi terpilih (${next.lat.toFixed(5)}, ${next.lng.toFixed(5)})`)
      onChange?.(next)
    },
    [onChange]
  )

  const locate = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error('Gagal mendapatkan lokasi.')
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (result) => {
        setPosition({ lat: result.coords.latitude, lng: result.coords.longitude })
        setIsLocating(false)
      },
      () => {
        toast.error('Gagal mendapatkan lokasi.')
        setIsLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [setPosition])

  return { position, address, isLocating, setPosition, locate }
}
