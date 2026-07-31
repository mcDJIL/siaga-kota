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

export async function login({ email, password }) {
  try {
    const { data } = await axiosClient.post('/api/v1/auth/login', { email, password })
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}

export async function register({ name, email, phone, password, password_confirmation }) {
  try {
    const { data } = await axiosClient.post('/api/v1/auth/register', {
      name,
      email,
      phone,
      password,
      password_confirmation,
    })

    return data
  } catch (error) {
    formatAxiosError(error)
  }
}

export function saveAuthToken(token) {
  if (typeof window !== 'undefined' && token) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token)
  }
}

export function clearAuthToken() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
  }
}

export async function me() {
  try {
    const { data } = await axiosClient.get('/api/v1/auth/me', attachAuthHeader())
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}

export async function logout() {
  try {
    const { data } = await axiosClient.post('/api/v1/auth/logout', null, attachAuthHeader())
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}

export async function updateMe(payload) {
  try {
    const { data } = await axiosClient.patch('/api/v1/auth/me', payload, attachAuthHeader())
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}

export async function requestPasswordReset(email) {
  try {
    const { data } = await axiosClient.post('/api/v1/auth/forgot-password', { email })
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}

export async function resetPassword({ email, token, password, password_confirmation }) {
  try {
    const { data } = await axiosClient.post('/api/v1/auth/reset-password', {
      email,
      token,
      password,
      password_confirmation,
    })
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}

export async function updatePassword({ current_password, password, password_confirmation }) {
  try {
    const { data } = await axiosClient.patch(
      '/api/v1/auth/me/password',
      { current_password, password, password_confirmation },
      attachAuthHeader()
    )
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}

export async function updateProfile(payload) {
  try {
    const config = attachAuthHeader()
    const { data } = await axiosClient.patch('/api/v1/auth/me', payload, config)
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}

export async function uploadAvatar(file) {
  try {
    const formData = new FormData()
    formData.append('avatar_path', file)

    const config = attachAuthHeader({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    const { data } = await axiosClient.patch('/api/v1/auth/me', formData, config)
    return data
  } catch (error) {
    formatAxiosError(error)
  }
}
