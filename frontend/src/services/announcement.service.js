import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL_PROD || ''
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

export async function getAnnouncements(params = {}) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/announcements`, {
      params,
      ...getAuthConfig(),
    })
    // Handle paginated response - ensure proper data structure
    if (data.data && Array.isArray(data.data)) {
      return {
        data: {
          announcements: data.data,
          total: data.meta?.total || data.total || data.data.length,
        },
      }
    }
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil pengumuman')
  }
}

export async function getAnnouncement(id) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/government/announcements/${id}`, getAuthConfig())
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil detail pengumuman')
  }
}

export async function createAnnouncement(announcement) {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/government/announcements`,
      announcement,
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal membuat pengumuman')
  }
}

export async function updateAnnouncement(id, updates) {
  try {
    const { data } = await axios.patch(
      `${API_BASE_URL}/api/v1/government/announcements/${id}`,
      updates,
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal memperbarui pengumuman')
  }
}

export async function deleteAnnouncement(id) {
  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/api/v1/government/announcements/${id}`,
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal menghapus pengumuman')
  }
}

export async function publishAnnouncement(id) {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/government/announcements/${id}/publish`,
      {},
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mempublikasikan pengumuman')
  }
}

export async function archiveAnnouncement(id) {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/government/announcements/${id}/archive`,
      {},
      getAuthConfig()
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengarsipkan pengumuman')
  }
}

export async function getPublicAnnouncements(params = {}) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/announcements/public/get`, {
      params,
    })
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message ?? 'Gagal mengambil pengumuman publik')
  }
}
