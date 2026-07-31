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

export async function getFloodReportStats() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/flood-reports/stats`, getAuthConfig())
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil data statistik banjir')
  }
}

export async function getDistrictFloodDistribution() {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/government/flood-reports/districts`,
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil data distribusi banjir per kecamatan')
  }
}

export async function getFloodSeverityDistribution(district = null) {
  try {
    const params = district && district !== 'Semua District' ? { district } : {}
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/government/flood-reports/severity`,
      {
        params,
        ...getAuthConfig(),
      }
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil data tingkat keparahan banjir')
  }
}

export async function getRecentFloodReports(filters = {}) {
  try {
    const params = {}
    if (filters.district && filters.district !== 'Semua District') {
      params.district = filters.district
    }
    if (filters.status) {
      params.status = filters.status
    }
    if (filters.waterLevel) {
      params.waterLevel = filters.waterLevel
    }
    if (filters.perPage) {
      params.per_page = filters.perPage
    }

    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/government/flood-reports/recent`,
      {
        params,
        ...getAuthConfig(),
      }
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil laporan banjir terbaru')
  }
}

export async function verifyFloodReport(reportId) {
  try {
    const { data } = await axios.patch(
      `${API_BASE_URL}/api/v1/government/flood-reports/${reportId}/verify`,
      {},
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal memverifikasi laporan')
  }
}

export async function updateFloodReportStatus(reportId, status) {
  try {
    const { data } = await axios.patch(
      `${API_BASE_URL}/api/v1/government/flood-reports/${reportId}/status`,
      { status },
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengubah status laporan')
  }
}
