import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { fetchReports } from '../../../../services/report.service'

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
              avatar: user.avatar || 'https://api.builder.io/api/v1/image/assets/TEMP/a38dc99574d343b750982753e861f0d9993d4540?width=240',
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

  function updateAvatar(nextAvatarUrl) {
    setProfile((current) => ({ ...current, avatar: nextAvatarUrl }))
    toast.success('Foto profil berhasil diperbarui.')
  }

  function saveProfile(values) {
    setProfile((current) => ({ ...current, ...values }))
    toast.success('Profil berhasil diperbarui.')
  }

  function changePassword(oldPassword, newPassword) {
    // TODO: Call API to change password
    toast.success('Password berhasil diperbarui.')
  }

  function deleteAccount() {
    // TODO: Call API to delete account
    localStorage.removeItem('user')
    localStorage.removeItem('siagakota_auth_token')
    window.location.href = '/login'
  }

  return { profile, isLoading, updateAvatar, saveProfile, changePassword, deleteAccount }
}
