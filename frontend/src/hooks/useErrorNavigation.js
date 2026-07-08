import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

const DUMMY_USER_ROLE = 'citizen'

function getDashboardRoute(role = DUMMY_USER_ROLE) {
  const dashboardRoutes = {
    citizen: '/citizen/dashboard',
    officer: '/officer/dashboard',
    government: '/government/dashboard',
  }
  return dashboardRoutes[role] || '/'
}

export function useErrorNavigation() {
  const navigate = useNavigate()

  const goHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const goToDashboard = useCallback((role) => {
    navigate(getDashboardRoute(role))
  }, [navigate])

  const reloadPage = useCallback(() => {
    window.location.reload()
  }, [])

  return {
    goHome,
    goBack,
    goToDashboard,
    reloadPage,
  }
}
