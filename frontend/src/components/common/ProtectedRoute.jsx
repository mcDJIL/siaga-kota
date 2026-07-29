import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { me } from '../../services/auth.service'

const AUTH_TOKEN_KEY = 'siagakota_auth_token'

function normalizeRole(role) {
  if (!role) return ''
  return String(role).toLowerCase()
}

function mapRoleToKey(role) {
  const r = normalizeRole(role)
  if (/citizen|warga|masyarakat/.test(r)) return 'citizen'
  if (/officer|petugas|koordinator/.test(r)) return 'officer'
  if (/government|gov|admin/.test(r)) return 'government'
  return null
}

function roleToDashboard(roleKey) {
  return (
    {
      citizen: '/citizen/dashboard',
      officer: '/officer/dashboard',
      government: '/government/dashboard',
    }[roleKey] || '/login'
  )
}

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [redirectTo, setRedirectTo] = useState('/login')

  useEffect(() => {
    let mounted = true

    async function check() {
      if (typeof window === 'undefined') return

      const token = window.localStorage.getItem(AUTH_TOKEN_KEY)
      if (!token) {
        if (mounted) {
          setRedirectTo('/login')
          setLoading(false)
        }
        return
      }

      try {
        const res = await me()
        const user = res?.data?.user ?? res?.data ?? null
        const roleVal = user?.role ?? (user?.roles && user.roles[0]) ?? null
        const roleKey = mapRoleToKey(roleVal)

        if (!allowedRoles || allowedRoles.length === 0) {
          if (mounted) setAllowed(true)
        } else {
          const normalizedAllowed = allowedRoles.map((r) => String(r).toLowerCase())
          if (normalizedAllowed.includes(roleKey) || normalizedAllowed.includes(normalizeRole(roleVal))) {
            if (mounted) setAllowed(true)
          } else {
            if (mounted) setRedirectTo(roleToDashboard(roleKey))
          }
        }
      } catch (err) {
        if (mounted) setRedirectTo('/login')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    check()

    return () => {
      mounted = false
    }
  }, [location.pathname, allowedRoles])

  if (loading) return null
  if (allowed) return children
  return <Navigate to={redirectTo} replace />
}
