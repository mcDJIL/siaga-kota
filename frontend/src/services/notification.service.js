import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const AUTH_TOKEN_KEY = 'siagakota_auth_token'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

function getAuthToken() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

function attachAuthHeader(config = {}) {
  const token = getAuthToken()

  if (!token) {
    return config
  }

  return {
    ...config,
    headers: {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  }
}

function formatAxiosError(error) {
  const responseData = error?.response?.data
  const message = responseData?.message ?? error.message ?? 'Terjadi kesalahan jaringan.'
  const formatted = new Error(message)
  formatted.response = responseData
  throw formatted
}

export async function fetchNotifications({ category, status, priority, page = 1, perPage = 20 } = {}) {
  try {
    const params = {}
    if (category && category !== 'semua') params.category = category
    if (status && status !== 'semua') params.status = status
    if (priority && priority !== 'semua') params.priority = priority
    params.page = page
    params.per_page = perPage

    const { data } = await axiosClient.get('/api/v1/ops/notifications', attachAuthHeader({ params }))
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}

export async function markNotificationAsRead(notificationId) {
  try {
    const { data } = await axiosClient.patch(
      `/api/v1/ops/notifications/${notificationId}/read`,
      null,
      attachAuthHeader()
    )
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}

export async function confirmNotification(notificationId) {
  try {
    const { data } = await axiosClient.patch(
      `/api/v1/ops/notifications/${notificationId}/confirm`,
      null,
      attachAuthHeader()
    )
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}

export async function hideNotification(notificationId) {
  try {
    const { data } = await axiosClient.patch(
      `/api/v1/ops/notifications/${notificationId}/hide`,
      null,
      attachAuthHeader()
    )
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}
