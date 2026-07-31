import { useState, useEffect } from 'react'
import { me, updateProfile, updatePassword, uploadAvatar, logout } from '../../../../services/auth.service'

export function useOfficerProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function fetchProfile() {
      try {
        setLoading(true)
        setError(null)
        const response = await me()
        if (mounted) {
          const userData = response?.data?.user || response?.data
          setProfile(userData)
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Gagal memuat profil')
          console.error('Error fetching profile:', err)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchProfile()

    return () => {
      mounted = false
    }
  }, [])

  const handleUpdateProfile = async (updateData) => {
    try {
      setLoading(true)
      setError(null)
      const data = await updateProfile(updateData)
      const userData = data?.data?.user || data?.data
      if (userData) {
        setProfile(userData)
      }
      return { success: true, data: userData }
    } catch (err) {
      const message = err.message || 'Gagal memperbarui profil'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (passwordData) => {
    try {
      setLoading(true)
      setError(null)
      const data = await updatePassword(passwordData)
      return { success: true, data }
    } catch (err) {
      const message = err.message || 'Gagal memperbarui kata sandi'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleUploadAvatar = async (file) => {
    try {
      setLoading(true)
      setError(null)
      const data = await uploadAvatar(file)
      const userData = data?.data?.user || data?.data
      if (userData) {
        setProfile(userData)
      }
      return { success: true, data: userData }
    } catch (err) {
      const message = err.message || 'Gagal mengunggah foto profil'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      setError(null)
      await logout()
      return { success: true }
    } catch (err) {
      const message = err.message || 'Gagal logout'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile: handleUpdateProfile,
    updatePassword: handleUpdatePassword,
    uploadAvatar: handleUploadAvatar,
    logout: handleLogout,
  }
}
