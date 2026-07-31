import { useEffect, useState } from 'react'

export function useGeolocation({ watch = false } = {}) {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation tidak tersedia di browser Anda')
      setLoading(false)
      return
    }

    const successCallback = (position) => {
      const { latitude, longitude } = position.coords
      setLocation({
        latitude,
        longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      })
      setError(null)
      setLoading(false)
    }

    const errorCallback = (err) => {
      let errorMessage = 'Gagal mengakses lokasi'

      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMessage = 'Izin akses lokasi ditolak'
          break
        case err.POSITION_UNAVAILABLE:
          errorMessage = 'Informasi lokasi tidak tersedia'
          break
        case err.TIMEOUT:
          errorMessage = 'Timeout mengakses lokasi'
          break
        default:
          errorMessage = err.message || 'Gagal mengakses lokasi'
      }

      setError(errorMessage)
      setLoading(false)
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }

    let watchId = null

    if (watch) {
      watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, options)
    } else {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [watch])

  return { location, error, loading }
}
