import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const AUTH_TOKEN_KEY = 'siagakota_auth_token'

export function createEcho() {
  const token = window.localStorage.getItem(AUTH_TOKEN_KEY)
  const key = import.meta.env.VITE_REVERB_APP_KEY
  const host = import.meta.env.VITE_REVERB_HOST

  if (!token || !key || !host) {
    return null
  }

  window.Pusher = Pusher

  return new Echo({
    broadcaster: 'reverb',
    key,
    wsHost: host,
    wsPort: Number(import.meta.env.VITE_REVERB_PORT ?? 8080),
    wssPort: Number(import.meta.env.VITE_REVERB_PORT ?? 443),
    forceTLS: import.meta.env.VITE_REVERB_SCHEME === 'https',
    enabledTransports: ['ws', 'wss'],
    authEndpoint: `${API_BASE_URL}/api/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  })
}
