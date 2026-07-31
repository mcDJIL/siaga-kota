import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ProfileAvatarCard } from '../../shared/profile/components/ProfileAvatarCard'
import { SecurityCard } from '../../shared/profile/components/SecurityCard'
import { ProfileForm } from '../../shared/profile/components/ProfileForm'
import { NotificationPreferenceCard } from '../../shared/profile/components/NotificationPreferenceCard'
import { ChangePasswordModal } from '../../shared/profile/components/ChangePasswordModal'
import { LogoutDialog } from '../../shared/profile/components/LogoutDialog'
import { ProfileToast } from '../../shared/profile/components/ProfileToast'
import { useOfficerProfile } from '../hooks/useOfficerProfile'
import { clearAuthToken } from '../../../../services/auth.service'
import { NOTIFICATION_PREFERENCES } from '../data/profileData'

export function OfficerProfilePage() {
  const navigate = useNavigate()
  const formRef = useRef(null)

  const { profile, loading, updateProfile, updatePassword, uploadAvatar, logout } = useOfficerProfile()
  const [preferences, setPreferences] = useState(NOTIFICATION_PREFERENCES)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (message) => {
    toast.success(message)
  }

  const showErrorToast = (message) => {
    toast.error(message)
  }

  const handleSaveProfile = async (data) => {
    try {
      setIsSubmitting(true)
      // Only send name, phone, position (not email)
      const updateData = {
        name: data.fullName,
        phone: data.phone,
      }
      await updateProfile(updateData)
      showToast('Perubahan profil berhasil disimpan.')
    } catch (err) {
      showErrorToast(err.message || 'Gagal menyimpan perubahan profil')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveClick = () => {
    formRef.current?.requestSubmit()
  }

  const handleTogglePreference = (id) => {
    setPreferences((current) =>
      current.map((preference) => (preference.id === id ? { ...preference, enabled: !preference.enabled } : preference))
    )
  }

  const handleChangePassword = async (data) => {
    try {
      setIsSubmitting(true)
      await updatePassword({
        current_password: data.currentPassword,
        password: data.newPassword,
        password_confirmation: data.confirmPassword,
      })
      setIsPasswordModalOpen(false)
      showToast('Kata sandi berhasil diperbarui.')
    } catch (err) {
      showErrorToast(err.message || 'Gagal memperbarui kata sandi')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAvatarChange = async (file) => {
    try {
      setIsSubmitting(true)
      if (file) {
        await uploadAvatar(file)
        showToast('Foto profil berhasil diperbarui.')
      }
    } catch (err) {
      showErrorToast(err.message || 'Gagal mengunggah foto profil')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmLogout = async () => {
    try {
      setIsSubmitting(true)
      await logout()
      clearAuthToken()
      setIsLogoutDialogOpen(false)
      showToast('Berhasil logout.')
      navigate('/login')
    } catch (err) {
      showErrorToast(err.message || 'Gagal logout')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-text-muted">Memuat profil...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-red-600">Gagal memuat profil</p>
      </div>
    )
  }

  // Map API response to component props
  const profileData = {
    employeeId: profile.id,
    displayName: profile.name,
    fullName: profile.name,
    nip: profile.employee_id || '-',
    email: profile.email,
    phone: profile.phone || '',
    jabatan: profile.position || '-',
    departemen: profile.department?.name || '-',
    avatar: profile.avatar_path || '/default-avatar.png',
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-[-0.4px] text-navy sm:text-[32px] sm:leading-10 sm:tracking-[-0.8px]">
          Profil Saya
        </h1>
        <p className="text-base text-text-muted">Kelola informasi pribadi dan pengaturan akun Anda.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[304px_1fr]">
        <div className="flex flex-col gap-6">
          <ProfileAvatarCard 
            profile={profileData} 
            avatar={profileData.avatar} 
            onAvatarChange={handleAvatarChange}
            isLoading={isSubmitting}
          />
          <SecurityCard
            onChangePassword={() => setIsPasswordModalOpen(true)}
            onLogout={() => setIsLogoutDialogOpen(true)}
            onSave={handleSaveClick}
            isLoading={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-6">
          <ProfileForm 
            ref={formRef} 
            profile={profileData} 
            onSubmit={handleSaveProfile}
            isLoading={isSubmitting}
          />
          <NotificationPreferenceCard preferences={preferences} onToggle={handleTogglePreference} />
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handleChangePassword}
        isLoading={isSubmitting}
      />

      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleConfirmLogout}
        isLoading={isSubmitting}
      />
    </div>
  )
}
