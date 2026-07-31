import { useState, useEffect } from 'react'
import {
  fetchActiveTasks,
  fetchActivityMapOfficers,
  fetchActivityMapStatistics,
  assignOfficerToReport,
} from '../../../../services/officer.service'

export function useActivityMapTasks({ region = 'semua', status = 'semua', category = '' } = {}) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, perPage: 50, total: 0 })

  const fetchTasks = async (page = 1) => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchActiveTasks({
        page,
        perPage: pagination.perPage,
        region,
        status,
        category,
      })
      setTasks(data.data || [])
      setPagination({
        page,
        perPage: data.meta?.per_page || 50,
        total: data.meta?.total || 0,
      })
    } catch (err) {
      setError(err.message || 'Gagal memuat data tugas')
      console.error('Error fetching active tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks(1)
  }, [region, status, category])

  const refetch = () => fetchTasks(pagination.page)

  return {
    tasks,
    loading,
    error,
    pagination,
    fetchTasks,
    refetch,
  }
}

export function useActivityMapOfficers() {
  const [officers, setOfficers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, perPage: 50, total: 0 })

  const fetchOfficers = async (page = 1) => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchActivityMapOfficers({
        page,
        perPage: pagination.perPage,
      })
      setOfficers(data.data || [])
      setPagination({
        page,
        perPage: data.meta?.per_page || 50,
        total: data.meta?.total || 0,
      })
    } catch (err) {
      setError(err.message || 'Gagal memuat data petugas')
      console.error('Error fetching officers:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOfficers(1)
  }, [])

  const refetch = () => fetchOfficers(pagination.page)

  return {
    officers,
    loading,
    error,
    pagination,
    fetchOfficers,
    refetch,
  }
}

export function useActivityMapStatistics() {
  const [stats, setStats] = useState({
    total_tasks: 0,
    tasks_by_category: {},
    total_officers: 0,
    assigned_officers: 0,
    available_officers: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchActivityMapStatistics()
      setStats(data.data || stats)
    } catch (err) {
      setError(err.message || 'Gagal memuat statistik')
      console.error('Error fetching statistics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const refetch = () => fetchStats()

  return {
    stats,
    loading,
    error,
    refetch,
  }
}

export function useAssignOfficer() {
  const [assigning, setAssigning] = useState(false)
  const [error, setError] = useState(null)

  const assign = async (reportId, officerId) => {
    try {
      setAssigning(true)
      setError(null)
      const data = await assignOfficerToReport(reportId, officerId)
      return data
    } catch (err) {
      const message = err.message || 'Gagal menugaskan petugas'
      setError(message)
      throw err
    } finally {
      setAssigning(false)
    }
  }

  return {
    assign,
    assigning,
    error,
  }
}
