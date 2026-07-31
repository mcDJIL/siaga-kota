import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  getGovernmentProfile,
  updateGovernmentProfile,
  uploadProfilePhoto,
  changePassword as changePasswordApi,
} from '../../../../services/government-profile.service'
import { NOTIFICATION_SETTINGS } from '../data/governmentProfileData'

export function useGovernmentProfile() {
  const [profile, setProfile] = useState({})
  const [notifications, setNotifications] = useState(NOTIFICATION_SETTINGS)
  const [isLoading, setIsLoading] = useState(true)
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  useEffect(() => {
    loadProfileData()
  }, [])

  async function loadProfileData() {
    try {
      setIsLoading(true)
      const profileData = await getGovernmentProfile()
      setProfile(profileData)
    } catch (error) {
      console.error('Error loading profile:', error)
      toast.error(error.message || 'Gagal memuat profil')
    } finally {
      setIsLoading(false)
    }
  }

  async function updateProfile(updates) {
    try {
      setIsSaving(true)
      await updateGovernmentProfile(updates)
      setProfile((current) => ({ ...current, ...updates }))
      toast.success('Profil berhasil diperbarui.')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error(error.message || 'Gagal memperbarui profil')
    } finally {
      setIsSaving(false)
    }
  }

  async function updatePhoto(file) {
    try {
      setIsUploadingPhoto(true)
      const updatedProfile = await uploadProfilePhoto(file)
      setProfile((current) => ({
        ...current,
        avatar_path: updatedProfile.avatar_path || updatedProfile.avatar || current.avatar_path
      }))
      setIsPhotoModalOpen(false)
      toast.success('Foto profil berhasil diperbarui.')
    } catch (error) {
      console.error('Error uploading photo:', error)
      toast.error(error.message || 'Gagal mengunggah foto')
    } finally {
      setIsUploadingPhoto(false)
    }
  }

  async function toggleNotification(id) {
    // Toggle notification status in local state only (no API for this yet)
    const notification = notifications.find((item) => item.id === id)
    if (!notification) return

    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
    toast.success('Preferensi notifikasi diperbarui.')
  }

  async function changePassword(currentPassword, newPassword) {
    try {
      setIsChangingPassword(true)
      await changePasswordApi(currentPassword, newPassword)
      setIsPasswordModalOpen(false)
      toast.success('Kata sandi berhasil diperbarui.')
    } catch (error) {
      console.error('Error changing password:', error)
      toast.error(error.message || 'Gagal mengubah kata sandi')
      throw error
    } finally {
      setIsChangingPassword(false)
    }
  }

  return {
    profile,
    notifications,
    isLoading,
    isSaving,
    isUploadingPhoto,
    isChangingPassword,
    updateProfile,
    updatePhoto,
    toggleNotification,
    changePassword,
    isPhotoModalOpen,
    onOpenPhotoModal: () => setIsPhotoModalOpen(true),
    onClosePhotoModal: () => setIsPhotoModalOpen(false),
    isPasswordModalOpen,
    onOpenPasswordModal: () => setIsPasswordModalOpen(true),
    onClosePasswordModal: () => setIsPasswordModalOpen(false),
  }
}
