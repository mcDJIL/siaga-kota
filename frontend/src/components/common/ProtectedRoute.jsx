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

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-bg-soft">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-border-muted border-t-navy" />
          <p className="text-sm text-text-muted">Memuat aplikasi...</p>
        </div>
      </div>
    )
  if (allowed) return children
  return <Navigate to={redirectTo} replace />
}
