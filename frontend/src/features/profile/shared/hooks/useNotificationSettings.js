import { useState } from 'react'
import { toast } from 'sonner'
import { disableFloodPushNotifications, enableFloodPushNotifications } from '../../../../services/web-push.service'

export function useNotificationSettings(initialSettings) {
  const [settings, setSettings] = useState(initialSettings)

  async function toggleSetting(id) {
    const setting = settings.find((item) => item.id === id)

    if (!setting) {
      return
    }

    const enabled = !setting.enabled

    try {
      if (id === 'critical-flood-alerts') {
        if (enabled) {
          await enableFloodPushNotifications()
        } else {
          await disableFloodPushNotifications()
        }
      }

      setSettings((current) => current.map((item) => (item.id === id ? { ...item, enabled } : item)))
      toast.success('Pengaturan notifikasi diperbarui.')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return { settings, toggleSetting }
}
