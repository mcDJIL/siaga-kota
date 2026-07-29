export function performLogout() {
  // Clear localStorage
  localStorage.removeItem('siagakota_auth_token')
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  
  // Clear sessionStorage if used
  sessionStorage.clear()
  
  // Redirect to login
  window.location.href = '/login'
}
