import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const AUTH_TOKEN_KEY = 'siagakota_auth_token'

function getAuthToken() {
  if (typeof window === 'undefined') {
    return null
  }
  return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

function getAuthConfig(config = {}) {
  const token = getAuthToken()
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  }
}

export async function getUsers(params = {}) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/users`, {
      params,
      ...getAuthConfig(),
    })
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil data pengguna')
  }
}

export async function getUser(id) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/users/${id}`, getAuthConfig())
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil detail pengguna')
  }
}

export async function createUser(user) {
  try {
    const payload = typeof File !== 'undefined' && user.avatar instanceof File ? toUserFormData(user) : user
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/government/users`,
      payload,
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal membuat pengguna')
  }
}

function toUserFormData(user) {
  const formData = new FormData()

  Object.entries(user).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value)
    }
  })

  return formData
}

export async function updateUser(id, updates) {
  try {
    const { data } = await axios.patch(
      `${API_BASE_URL}/api/v1/government/users/${id}`,
      updates,
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal memperbarui pengguna')
  }
}

export async function toggleUserStatus(id) {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/government/users/${id}/toggle-status`,
      {},
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengubah status pengguna')
  }
}

export async function deleteUser(id) {
  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/api/v1/government/users/${id}`,
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal menghapus pengguna')
  }
}

export async function getUserStatistics() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/users/statistics`, getAuthConfig())
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil statistik pengguna')
  }
}
