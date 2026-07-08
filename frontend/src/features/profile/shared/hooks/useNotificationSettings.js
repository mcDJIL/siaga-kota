import { useState } from 'react'
import { toast } from 'sonner'

export function useNotificationSettings(initialSettings) {
  const [settings, setSettings] = useState(initialSettings)

  function toggleSetting(id) {
    setSettings((current) => current.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)))
    toast.success('Pengaturan notifikasi diperbarui.')
  }

  return { settings, toggleSetting }
}
