import { AuthCard } from '../components/AuthCard'
import { LoginForm } from '../components/LoginForm'

export function LoginPage() {
  return (
    <AuthCard title="Selamat Datang Kembali" subtitle="Silakan masuk ke akun SiagaKota Anda">
      <LoginForm />
    </AuthCard>
  )
}
