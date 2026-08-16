import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL_PROD || ''
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

export async function getFloodPredictions(params = {}) {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/government/ai-predictions`,
      getAuthConfig({ params })
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal memuat prediksi banjir')
  }
}

export async function getMapFloodPredictions(params = {}) {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/map/flood-predictions`,
      getAuthConfig({ params })
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal memuat prediksi banjir')
  }
}
