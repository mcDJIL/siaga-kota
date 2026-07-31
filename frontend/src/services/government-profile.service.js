import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const AUTH_TOKEN_KEY = 'siagakota_auth_token'

function getAuthToken() {
  if (typeof window === 'undefined') {
    return null
  }
  return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

function getAuthConfig() {
  const token = getAuthToken()
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  }
}

export async function getGovernmentProfile() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/auth/me`, getAuthConfig())
    // Response structure: { data: { user: {...} } }
    return data.data?.user || data.user || data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil profil')
  }
}

export async function updateGovernmentProfile(updates) {
  try {
    const { data } = await axios.patch(`${API_BASE_URL}/api/v1/auth/me`, updates, getAuthConfig())
    // Response structure: { data: { user: {...} } }
    return data.data?.user || data.user || data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal memperbarui profil')
  }
}

export async function uploadProfilePhoto(file) {
  try {
    const formData = new FormData()
    formData.append('avatar_path', file)

    const { data } = await axios.post(`${API_BASE_URL}/api/v1/auth/me/avatar`, formData, {
      ...getAuthConfig(),
      headers: {
        ...getAuthConfig().headers,
        'Content-Type': 'multipart/form-data',
      },
    })
    // Response structure: { data: { user: {...} } }
    return data.data?.user || data.user || data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengunggah foto')
  }
}

export async function changePassword(currentPassword, newPassword) {
  try {
    const { data } = await axios.patch(
      `${API_BASE_URL}/api/v1/auth/me/password`,
      {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: newPassword
      },
      getAuthConfig()
    )
    // Response structure: { data: { user: {...} } }
    return data.data?.user || data.user || data
  } catch (error) {
    // Extract validation errors if present
    const errors = error.response?.data?.errors
    if (errors) {
      const errorMessages = Object.values(errors)
        .flat()
        .join(' ')
      throw new Error(errorMessages)
    }
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengubah kata sandi')
  }
}
