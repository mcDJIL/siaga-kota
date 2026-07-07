import { AuthCard } from '../components/AuthCard'
import { RegisterForm } from '../components/RegisterForm'

export function RegisterPage() {
  return (
    <AuthCard title="Buat Akun Baru" subtitle="Daftarkan diri Anda untuk mulai berkontribusi.">
      <RegisterForm />
    </AuthCard>
  )
}
