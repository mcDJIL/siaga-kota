import { useEffect } from 'react'
import { toast } from 'sonner'
import { createEcho } from '../../lib/echo'

const RISK_LABELS = {
  tinggi: 'tinggi',
  sedang: 'sedang',
  rendah: 'rendah',
}

function getPriorityZone(zones) {
  return [...zones].sort((first, second) => Number(second.risk_index ?? 0) - Number(first.risk_index ?? 0))[0]
}

export function FloodAlertListener() {
  useEffect(() => {
    const echo = createEcho()

    if (!echo) {
      return undefined
    }

    const channel = echo.private('city.flood')
    const handleFloodRiskUpdate = ({ zones = [] }) => {
      const priorityZone = getPriorityZone(zones)

      if (!priorityZone) {
        return
      }

      const riskLevel = RISK_LABELS[priorityZone.risk_level] ?? priorityZone.risk_level
      const description = `${priorityZone.name}: risiko banjir ${riskLevel}${priorityZone.risk_index ? ` (indeks ${priorityZone.risk_index})` : ''}.`
      const notify = priorityZone.risk_level === 'tinggi' ? toast.warning : toast.info

      const notification = {
        id: `flood-${Date.now()}`,
        title: 'Pembaruan risiko banjir',
        description,
        time: 'Baru saja',
        status: 'unread',
      }

      window.dispatchEvent(new CustomEvent('siagakota:flood-notification', { detail: notification }))

      notify(notification.title, {
        id: 'flood-risk-update',
        description: notification.description,
        action: {
          label: 'Lihat prediksi',
          onClick: () => window.location.assign('/prediction'),
        },
      })
    }

    channel.listen('.flood.risk-updated', handleFloodRiskUpdate)

    return () => {
      channel.stopListening('.flood.risk-updated')
      echo.leave('city.flood')
      echo.disconnect()
    }
  }, [])

  return null
}
