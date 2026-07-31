import { motion } from 'framer-motion'
import { ProfileCard } from '../components/ProfileCard'
import { ProfileForm } from '../components/ProfileForm'
import { NotificationSettingsCard } from '../components/NotificationSettingsCard'
import { SecurityCard } from '../components/SecurityCard'
import { ChangePasswordModal } from '../components/ChangePasswordModal'
import { ChangeProfilePhotoModal } from '../components/ChangeProfilePhotoModal'
import { useGovernmentProfile } from '../hooks/useGovernmentProfile'

export function GovernmentProfilePage() {
  const {
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
    onOpenPhotoModal,
    onClosePhotoModal,
    isPasswordModalOpen,
    onOpenPasswordModal,
    onClosePasswordModal,
  } = useGovernmentProfile()

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <motion.h1
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="font-heading text-[32px] leading-10 font-semibold tracking-[-0.32px] text-text-body"
      >
        Profil Admin
      </motion.h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <ProfileCard profile={profile} onEditPhoto={onOpenPhotoModal} isLoading={isLoading} />
          <SecurityCard onOpenChangePassword={onOpenPasswordModal} />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <ProfileForm profile={profile} onSave={updateProfile} isLoading={isSaving} />
          <NotificationSettingsCard notifications={notifications} onToggle={toggleNotification} />
        </div>
      </div>

      <ChangeProfilePhotoModal
        isOpen={isPhotoModalOpen}
        onClose={onClosePhotoModal}
        currentAvatar={profile.avatar}
        onSave={updatePhoto}
        isLoading={isUploadingPhoto}
      />
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={onClosePasswordModal} 
        onSuccess={changePassword}
        isLoading={isChangingPassword}
      />
    </div>
  )
}
