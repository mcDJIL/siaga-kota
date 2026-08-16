import { updateMe } from './auth.service'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const AUTH_TOKEN_KEY = 'siagakota_auth_token'

function urlBase64ToUint8Array(value) {
  const padding = '='.repeat((4 - (value.length % 4)) % 4)
  const base64 = (value + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = window.atob(base64)

  return Uint8Array.from(raw, (character) => character.charCodeAt(0))
}

function getHeaders() {
  const token = window.localStorage.getItem(AUTH_TOKEN_KEY)

  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new Error('Browser tidak mendukung notifikasi push.')
  }

  return navigator.serviceWorker.register('/sw.js')
}

async function saveSubscription(subscription) {
  const json = subscription.toJSON()
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/push/subscribe`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      endpoint: json.endpoint,
      keys: {
        p256dh: json.keys.p256dh,
        auth: json.keys.auth,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('Gagal mendaftarkan langganan notifikasi.')
  }
}

export async function enableFloodPushNotifications() {
  const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY

  if (!vapidPublicKey) {
    throw new Error('Kunci notifikasi push belum dikonfigurasi.')
  }

  const permission = await Notification.requestPermission()

  if (permission !== 'granted') {
    throw new Error('Izin notifikasi tidak diberikan.')
  }

  const registration = await registerServiceWorker()
  let subscription = await registration.pushManager.getSubscription()

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    })
  }

  await saveSubscription(subscription)
  await updateMe({ settings: { notif: { critical_flood: true } } })
}

export async function disableFloodPushNotifications() {
  const registration = await registerServiceWorker()
  const subscription = await registration.pushManager.getSubscription()

  if (subscription) {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/push/subscribe`, {
      method: 'DELETE',
      headers: getHeaders(),
      body: JSON.stringify({ endpoint: subscription.endpoint }),
    })

    if (!response.ok) {
      throw new Error('Gagal menghentikan langganan notifikasi.')
    }

    await subscription.unsubscribe()
  }

  await updateMe({ settings: { notif: { critical_flood: false } } })
}
