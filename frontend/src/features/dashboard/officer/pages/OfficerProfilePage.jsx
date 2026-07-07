import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfileAvatarCard } from '../../shared/profile/components/ProfileAvatarCard'
import { SecurityCard } from '../../shared/profile/components/SecurityCard'
import { ProfileForm } from '../../shared/profile/components/ProfileForm'
import { NotificationPreferenceCard } from '../../shared/profile/components/NotificationPreferenceCard'
import { ChangePasswordModal } from '../../shared/profile/components/ChangePasswordModal'
import { LogoutDialog } from '../../shared/profile/components/LogoutDialog'
import { ProfileToast } from '../../shared/profile/components/ProfileToast'
import { OFFICER_PROFILE_DATA, NOTIFICATION_PREFERENCES } from '../data/profileData'

export function OfficerProfilePage() {
  const navigate = useNavigate()
  const formRef = useRef(null)

  const [avatar, setAvatar] = useState(OFFICER_PROFILE_DATA.avatar)
  const [preferences, setPreferences] = useState(NOTIFICATION_PREFERENCES)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [toast, setToast] = useState({ isVisible: false, message: '' })

  const showToast = (message) => {
    setToast({ isVisible: true, message })
    window.setTimeout(() => setToast({ isVisible: false, message: '' }), 3000)
  }

  const handleSaveProfile = (data) => {
    showToast('Perubahan profil berhasil disimpan.')
    return data
  }

  const handleSaveClick = () => {
    formRef.current?.requestSubmit()
  }

  const handleTogglePreference = (id) => {
    setPreferences((current) =>
      current.map((preference) => (preference.id === id ? { ...preference, enabled: !preference.enabled } : preference))
    )
  }

  const handleChangePassword = (data) => {
    setIsPasswordModalOpen(false)
    showToast('Kata sandi berhasil diperbarui.')
    return data
  }

  const handleConfirmLogout = () => {
    setIsLogoutDialogOpen(false)
    navigate('/login')
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
          <ProfileAvatarCard profile={OFFICER_PROFILE_DATA} avatar={avatar} onAvatarChange={setAvatar} />
          <SecurityCard
            onChangePassword={() => setIsPasswordModalOpen(true)}
            onLogout={() => setIsLogoutDialogOpen(true)}
            onSave={handleSaveClick}
          />
        </div>

        <div className="flex flex-col gap-6">
          <ProfileForm ref={formRef} profile={OFFICER_PROFILE_DATA} onSubmit={handleSaveProfile} />
          <NotificationPreferenceCard preferences={preferences} onToggle={handleTogglePreference} />
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handleChangePassword}
      />

      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleConfirmLogout}
      />

      <ProfileToast message={toast.message} isVisible={toast.isVisible} />
    </div>
  )
}
