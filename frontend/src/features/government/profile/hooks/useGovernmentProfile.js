import { useState } from 'react'
import { toast } from 'sonner'
import { GOVERNMENT_PROFILE_DATA, NOTIFICATION_SETTINGS } from '../data/governmentProfileData'

export function useGovernmentProfile() {
  const [profile, setProfile] = useState(GOVERNMENT_PROFILE_DATA)
  const [notifications, setNotifications] = useState(NOTIFICATION_SETTINGS)
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  function updateProfile(updates) {
    setProfile((current) => ({ ...current, ...updates }))
    toast.success('Profil berhasil diperbarui.')
  }

  function updatePhoto(nextAvatar) {
    setProfile((current) => ({ ...current, avatar: nextAvatar }))
    setIsPhotoModalOpen(false)
    toast.success('Foto profil berhasil diperbarui.')
  }

  function toggleNotification(id) {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
    toast.success('Preferensi notifikasi diperbarui.')
  }

  function changePassword() {
    setIsPasswordModalOpen(false)
    toast.success('Password berhasil diperbarui.')
  }

  return {
    profile,
    updateProfile,
    updatePhoto,
    notifications,
    toggleNotification,
    isPhotoModalOpen,
    onOpenPhotoModal: () => setIsPhotoModalOpen(true),
    onClosePhotoModal: () => setIsPhotoModalOpen(false),
    isPasswordModalOpen,
    onOpenPasswordModal: () => setIsPasswordModalOpen(true),
    onClosePasswordModal: () => setIsPasswordModalOpen(false),
    changePassword,
  }
}
