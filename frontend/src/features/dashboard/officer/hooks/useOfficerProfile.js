import { useState, useEffect } from 'react'
import { me, updateProfile, updatePassword, uploadAvatar, logout } from '../../../../services/auth.service'

export function useOfficerProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await me()
      setProfile(data.data)
    } catch (err) {
      setError(err.message || 'Gagal memuat profil')
      console.error('Error fetching profile:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleUpdateProfile = async (updateData) => {
    try {
      setLoading(true)
      setError(null)
      const data = await updateProfile(updateData)
      setProfile(data.data)
      return { success: true, data: data.data }
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
      setProfile(data.data)
      return { success: true, data: data.data }
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
      // Clear token akan di-handle di komponen
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
    fetchProfile,
    updateProfile: handleUpdateProfile,
    updatePassword: handleUpdatePassword,
    uploadAvatar: handleUploadAvatar,
    logout: handleLogout,
  }
}
