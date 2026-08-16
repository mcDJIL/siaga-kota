import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { fetchReports, updateProfile, changePassword as changePasswordAPI, deleteAccount as deleteAccountAPI } from '../../../../services/report.service'
import { uploadAvatar } from '../../../../services/auth.service'

export function useProfile() {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user profile dan statistics dari localStorage dan API
  useEffect(() => {
    let mounted = true

    async function loadProfile() {
      try {
        // Get user dari localStorage
        const userData = localStorage.getItem('user')
        if (userData) {
          const user = JSON.parse(userData)
          
          // Fetch laporan untuk statistics
          const res = await fetchReports({ page: 1, perPage: 100 })
          const items = res?.data ?? []
          
          const totalReports = items.length
          const completedReports = items.filter((r) => r.status === 'selesai').length

          if (mounted) {
            setProfile({
              fullName: user.name || 'User',
              email: user.email || '',
              phone: user.phone || '-',
              role: 'Citizen Responder',
              avatar: user.avatar_url || 'https://api.builder.io/api/v1/image/assets/TEMP/a38dc99574d343b750982753e861f0d9993d4540?width=240',
              totalReports,
              completedReports,
              userRank: completedReports >= 20 ? 'Platinum' : completedReports >= 15 ? 'Emas' : completedReports >= 10 ? 'Perak' : 'Pemula',
              totalPoints: totalReports * 100,
            })
            setIsLoading(false)
          }
        } else {
          if (mounted) {
            setProfile({
              fullName: 'User',
              email: '',
              phone: '-',
              role: 'Citizen Responder',
              avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/a38dc99574d343b750982753e861f0d9993d4540?width=240',
              totalReports: 0,
              completedReports: 0,
              userRank: 'Pemula',
              totalPoints: 0,
            })
            setIsLoading(false)
          }
        }
      } catch (err) {
        console.error('Error loading profile:', err)
        if (mounted) setIsLoading(false)
      }
    }

    loadProfile()
    return () => {
      mounted = false
    }
  }, [])

  async function updateAvatar(file) {
    try {
      const response = await uploadAvatar(file)
      const user = response?.data?.user

      if (!user) {
        throw new Error('Data profil setelah upload tidak tersedia.')
      }

      localStorage.setItem('user', JSON.stringify(user))
      setProfile((current) => ({
        ...current,
        fullName: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar_url,
      }))
      toast.success('Foto profil berhasil diperbarui.')
    } catch (err) {
      toast.error(err.message || 'Gagal mengunggah foto profil.')
    }
  }

  async function saveProfile(values) {
    try {
      const data = {
        name: values.fullName,
        phone: values.phone,
      }

      const res = await updateProfile(data)

      if (res?.data?.user) {
        const user = res.data.user
        localStorage.setItem('user', JSON.stringify(user))

        setProfile((current) => ({
          ...current,
          fullName: user.name,
          phone: user.phone,
          email: user.email,
        }))
      }

      toast.success('Profil berhasil diperbarui.')
    } catch (err) {
      toast.error(err.message || 'Gagal memperbarui profil.')
    }
  }

  async function changePassword(oldPassword, newPassword) {
    try {
      await changePasswordAPI(oldPassword, newPassword)
      toast.success('Password berhasil diperbarui.')
    } catch (err) {
      toast.error(err.message || 'Gagal mengubah password.')
    }
  }

  async function deleteAccount() {
    try {
      await deleteAccountAPI()
      localStorage.removeItem('user')
      localStorage.removeItem('siagakota_auth_token')
      window.location.href = '/login'
    } catch (err) {
      toast.error(err.message || 'Gagal menghapus akun.')
    }
  }

  return { profile, isLoading, updateAvatar, saveProfile, changePassword, deleteAccount }
}
