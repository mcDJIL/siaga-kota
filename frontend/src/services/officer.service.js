import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const AUTH_TOKEN_KEY = 'siagakota_auth_token'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
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
  formatted.status = error?.response?.status
  return formatted
}

export async function fetchOfficerReports({ page = 1, perPage = 100, search = '', category = '', status = '' } = {}) {
  try {
    const params = {
      page,
      per_page: perPage,
    }

    if (search) params.search = search
    if (category && category !== 'all') params.category = category
    if (status && status !== 'all') params.status = status

    const response = await axiosClient.get('/api/v1/ops/reports', attachAuthHeader({ params }))
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function fetchOfficerReport(reportId) {
  try {
    const response = await axiosClient.get(`/api/v1/ops/reports/${reportId}`, attachAuthHeader())
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function fetchWasteReports({ page = 1, perPage = 20, status = '', search = '' } = {}) {
  try {
    const params = {
      page,
      per_page: perPage,
    }

    if (status) params.status = status
    if (search) params.search = search

    const response = await axiosClient.get('/api/v1/ops/reports/waste', attachAuthHeader({ params }))
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function fetchFloodReports({ page = 1, perPage = 20, status = '', search = '' } = {}) {
  try {
    const params = {
      page,
      per_page: perPage,
    }

    if (status) params.status = status
    if (search) params.search = search

    const response = await axiosClient.get('/api/v1/ops/reports/flood', attachAuthHeader({ params }))
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function fetchWasteReportDetail(reportId) {
  try {
    const response = await axiosClient.get(`/api/v1/ops/reports/${reportId}`, attachAuthHeader())
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function toggleReportEmergency(reportId) {
  try {
    const response = await axiosClient.patch(
      `/api/v1/ops/reports/${reportId}/emergency`,
      {},
      attachAuthHeader()
    )
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function submitHandlingReport(reportId, formData) {
  try {
    const requestBody = new FormData()
    requestBody.append('notes', formData.notes)

    if (formData.evidence && Array.isArray(formData.evidence) && formData.evidence.length > 0) {
      formData.evidence.forEach((file) => {
        if (file instanceof File) {
          requestBody.append('evidence[]', file)
        }
      })
    }

    console.log('Submitting handling report:', {
      reportId,
      notes: formData.notes,
      evidenceCount: formData.evidence?.length || 0,
    })

    const config = attachAuthHeader()
    const response = await axiosClient.post(
      `/api/v1/ops/reports/${reportId}/handling`,
      requestBody,
      config
    )
    console.log('Handling report response:', response.data)
    return response.data
  } catch (error) {
    console.error('submitHandlingReport error:', {
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      message: error?.message,
    })
    throw formatAxiosError(error)
  }
}

// Activity Map APIs
export async function fetchActiveTasks({ page = 1, perPage = 50, region = 'semua', status = 'semua', category = '' } = {}) {
  try {
    const params = {
      page,
      per_page: perPage,
    }

    if (region && region !== 'semua') params.region = region
    if (status && status !== 'semua') params.status = status
    if (category && category !== 'semua') params.category = category

    const response = await axiosClient.get('/api/v1/ops/activity-map/tasks', attachAuthHeader({ params }))
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function fetchActivityMapOfficers({ page = 1, perPage = 50, department = '' } = {}) {
  try {
    const params = {
      page,
      per_page: perPage,
    }

    if (department) params.department = department

    const response = await axiosClient.get('/api/v1/ops/activity-map/officers', attachAuthHeader({ params }))
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function fetchActivityMapOfficer(officerId) {
  try {
    const response = await axiosClient.get(`/api/v1/ops/activity-map/officers/${officerId}`, attachAuthHeader())
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function assignOfficerToReport(reportId, officerId) {
  try {
    const response = await axiosClient.post(
      `/api/v1/ops/activity-map/tasks/${reportId}/assign`,
      { officer_id: officerId },
      attachAuthHeader()
    )
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function fetchActivityMapStatistics() {
  try {
    const response = await axiosClient.get('/api/v1/ops/activity-map/statistics', attachAuthHeader())
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}
