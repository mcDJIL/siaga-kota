import { useState } from 'react'
import { toast } from 'sonner'

export function useProfile(initialProfile) {
  const [profile, setProfile] = useState(initialProfile)

  function updateAvatar(nextAvatarUrl) {
    setProfile((current) => ({ ...current, avatar: nextAvatarUrl }))
    toast.success('Foto profil berhasil diperbarui.')
  }

  function saveProfile(values) {
    setProfile((current) => ({ ...current, ...values }))
    toast.success('Profil berhasil diperbarui.')
  }

  function changePassword() {
    toast.success('Password berhasil diperbarui.')
  }

  function deleteAccount() {
    toast.success('Akun berhasil dihapus (dummy).')
  }

  return { profile, updateAvatar, saveProfile, changePassword, deleteAccount }
}
