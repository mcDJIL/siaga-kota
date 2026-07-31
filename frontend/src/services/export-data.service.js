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

export async function getExportHistory(params = {}) {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/government/export-data`,
      getAuthConfig({ params })
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil riwayat ekspor')
  }
}

export async function createDataExport(payload) {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/government/export-data`,
      payload,
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal membuat ekspor')
  }
}

export async function downloadDataExport(record) {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/government/export-data/${record.id}/download`,
      getAuthConfig({ responseType: 'blob' })
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengunduh ekspor')
  }
}
