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

export async function getDashboardStats() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/dashboard/stats`, getAuthConfig())
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil data statistik')
  }
}

export async function getMonthlyTrend(year) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/dashboard/trends`, {
      params: { year },
      ...getAuthConfig(),
    })
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil data tren bulanan')
  }
}

export async function getRecentReports() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/dashboard/reports`, getAuthConfig())
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil data laporan terbaru')
  }
}

export async function getGovernmentReportDetail(reportId) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/dashboard/reports/${reportId}`, getAuthConfig())
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil detail laporan')
  }
}

export async function getDepartmentPerformance() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/dashboard/departments`, getAuthConfig())
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil data kinerja departemen')
  }
}

export async function getAnnouncements() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/dashboard/announcements`, getAuthConfig())
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil data pengumuman')
  }
}
