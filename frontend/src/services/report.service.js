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

export async function fetchReports({ page = 1, perPage = 100, search = '', category = '', status = '' } = {}) {
  try {
    const params = {
      page,
      per_page: perPage,
    }

    if (search) params.search = search
    if (category && category !== 'all') params.category = category
    if (status && status !== 'all') params.status = status

    const response = await axiosClient.get('/api/v1/public/reports', attachAuthHeader({ params }))
    console.log(response.data);

    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function fetchReport(reportId) {
  try {
    const response = await axiosClient.get(`/api/v1/public/reports/${reportId}`, attachAuthHeader())
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function submitReport(formData) {
  try {
    const requestBody = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      if (value === undefined || value === null) return

      // Handle file uploads (images, photos, files)
      if (key === 'images' || key === 'photos' || key === 'files') {
        if (Array.isArray(value)) {
          value.forEach((file) => {
            // Append as photos[] for Laravel array binding
            if (file instanceof File || file instanceof Blob) {
              requestBody.append('photos[]', file)
            }
          })
        }
        return
      }

      // Handle other arrays
      if (Array.isArray(value)) {
        value.forEach((item) => requestBody.append(`${key}[]`, item))
        return
      }

      // Handle regular values
      requestBody.append(key, String(value))
    })

    const config = attachAuthHeader()
    config.headers = config.headers || {}
    config.headers['Content-Type'] = 'multipart/form-data'

    const response = await axiosClient.post('/api/v1/public/reports', requestBody, config)
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function updateProfile(data) {
  try {
    const response = await axiosClient.patch('/api/v1/auth/me', data, attachAuthHeader())
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function changePassword(oldPassword, newPassword) {
  try {
    const response = await axiosClient.post(
      '/api/v1/auth/change-password',
      { current_password: oldPassword, password: newPassword, password_confirmation: newPassword },
      attachAuthHeader()
    )
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}

export async function deleteAccount() {
  try {
    const response = await axiosClient.delete('/api/v1/auth/me', attachAuthHeader())
    return response.data
  } catch (error) {
    throw formatAxiosError(error)
  }
}
