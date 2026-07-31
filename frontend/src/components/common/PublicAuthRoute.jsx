import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { me } from '../../services/auth.service'

const AUTH_TOKEN_KEY = 'siagakota_auth_token'

function mapRoleToKey(role) {
  if (!role) return null
  const r = String(role).toLowerCase()
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
    }[roleKey] || '/'
  )
}

export default function PublicAuthRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [redirectTo, setRedirectTo] = useState(null)

  useEffect(() => {
    let mounted = true

    async function check() {
      if (typeof window === 'undefined') return

      const token = window.localStorage.getItem(AUTH_TOKEN_KEY)
      
      if (!token) {
        if (mounted) {
          setIsAuthenticated(false)
          setLoading(false)
        }
        return
      }

      try {
        const res = await me()
        const user = res?.data?.user ?? res?.data ?? null
        const roleVal = user?.role ?? (user?.roles && user.roles[0]) ?? null
        const roleKey = mapRoleToKey(roleVal)

        if (mounted) {
          setIsAuthenticated(true)
          setRedirectTo(roleToDashboard(roleKey))
        }
      } catch (err) {
        if (mounted) {
          setIsAuthenticated(false)
          setLoading(false)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    check()

    return () => {
      mounted = false
    }
  }, [])

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-bg-soft">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-border-muted border-t-navy" />
          <p className="text-sm text-text-muted">Memuat aplikasi...</p>
        </div>
      </div>
    )
  if (isAuthenticated) return <Navigate to={redirectTo} replace />
  return children
}
