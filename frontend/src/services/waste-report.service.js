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

export async function getWasteReportStats() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/waste-reports/stats`, getAuthConfig())
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil data statistik sampah')
  }
}

export async function getWasteCategoryDistribution() {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/government/waste-reports/categories`,
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil data kategori sampah')
  }
}

export async function getDistrictReportStats() {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/government/waste-reports/districts`,
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil data kecamatan')
  }
}

export async function getRecentWasteReports(district) {
  try {
    const params = district && district !== 'Semua Kecamatan' ? { district } : {}
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/government/waste-reports/recent`,
      {
        params,
        ...getAuthConfig(),
      }
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil laporan sampah terbaru')
  }
}
