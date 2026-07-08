import { useState } from 'react'
import { ProfileCard } from '../../../shared/components/ProfileCard'
import { ProfileForm } from '../../../shared/components/ProfileForm'
import { NotificationSettings } from '../../../shared/components/NotificationSettings'
import { ContributionBadgeList } from '../../../shared/components/ContributionBadgeList'
import { RecentPointActivity } from '../../../shared/components/RecentPointActivity'
import { CommunityRankCard } from '../../../shared/components/CommunityRankCard'
import { ContributionStats } from '../../../shared/components/ContributionStats'
import { ChangePasswordModal } from '../../../shared/components/ChangePasswordModal'
import { DeleteAccountModal } from '../../../shared/components/DeleteAccountModal'
import { useProfile } from '../../../shared/hooks/useProfile'
import { useNotificationSettings } from '../../../shared/hooks/useNotificationSettings'
import {
  ACTIVITY_RANK,
  CITIZEN_PROFILE_DATA,
  COMMUNITY_RANKINGS,
  CONTRIBUTION_BADGES,
  CONTRIBUTION_STATS,
  NOTIFICATION_SETTINGS,
  RECENT_POINT_ACTIVITY,
} from '../data/profileData'

export function CitizenProfilePage() {
  const { profile, updateAvatar, saveProfile, changePassword, deleteAccount } = useProfile(CITIZEN_PROFILE_DATA)
  const { settings, toggleSetting } = useNotificationSettings(NOTIFICATION_SETTINGS)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)

  function handleSaveProfile(values) {
    saveProfile(values)
  }

  function handleChangePassword() {
    setIsChangePasswordOpen(false)
    changePassword()
  }

  function handleDeleteAccount() {
    setIsDeleteAccountOpen(false)
    deleteAccount()
  }

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-semibold text-navy">Profile Settings</h1>
        <p className="text-base text-text-muted">Kelola preferensi akun dan notifikasi peringatan Anda.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[304px_1fr]">
        <div className="flex flex-col gap-6">
          <ProfileCard profile={profile} onAvatarChange={updateAvatar} />
          <ContributionBadgeList badges={CONTRIBUTION_BADGES} />
          <RecentPointActivity activities={RECENT_POINT_ACTIVITY} />
          <CommunityRankCard rankings={COMMUNITY_RANKINGS} activityRank={ACTIVITY_RANK} />
          <ContributionStats stats={CONTRIBUTION_STATS} />
        </div>

        <div className="flex flex-col gap-6">
          <ProfileForm profile={profile} onSubmit={handleSaveProfile} />
          <NotificationSettings settings={settings} onToggle={toggleSetting} />

          <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
            <h2 className="text-xl font-semibold text-text-body">Change Password</h2>
            <button
              type="button"
              onClick={() => setIsChangePasswordOpen(true)}
              className="flex w-full items-center justify-center rounded-lg border-2 border-navy py-3 text-base text-navy transition-colors hover:bg-bg-blue-soft sm:w-fit sm:px-6"
            >
              Ubah Password
            </button>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#FFDAD6] bg-white p-6">
            <h2 className="text-xl font-semibold text-[#BA1A1A]">Danger Zone</h2>
            <p className="text-base text-text-muted">
              Deleting your account will permanently remove all your data, report history, and rewards. This action
              cannot be undone.
            </p>
            <button
              type="button"
              onClick={() => setIsDeleteAccountOpen(true)}
              className="flex w-full items-center justify-center rounded-lg bg-[#BA1A1A] py-3 text-base text-white transition-colors hover:bg-[#93000A] sm:w-fit sm:px-6"
            >
              Delete My Account
            </button>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        onSubmit={handleChangePassword}
      />

      <DeleteAccountModal
        isOpen={isDeleteAccountOpen}
        onClose={() => setIsDeleteAccountOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  )
}
