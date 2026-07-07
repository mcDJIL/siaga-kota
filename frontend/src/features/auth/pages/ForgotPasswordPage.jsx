import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { AuthCard } from '../components/AuthCard'
import { MailIcon, LoginArrowIcon } from '../components/icons'
import { cn } from '../../../lib/cn'

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
})

export function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema), defaultValues: { email: '' } })

  const onSubmit = (data) => {
    console.log('Permintaan reset kata sandi (belum ada backend):', data)
  }

  return (
    <AuthCard title="Lupa Kata Sandi?" subtitle="Masukkan email Anda untuk menerima tautan reset kata sandi.">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium tracking-[0.14px] text-text-body">
            Email
          </label>
          <div className="relative">
            <MailIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-5 -translate-y-1/2" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              aria-invalid={Boolean(errors.email)}
              className={cn(
                'w-full rounded-lg border border-border-muted bg-bg-soft py-[13px] pr-4 pl-10 text-base text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green',
                errors.email && 'border-[#BA1A1A] outline-2 outline-[#BA1A1A]'
              )}
              {...register('email')}
            />
          </div>
          {errors.email && <p className="text-sm text-[#BA1A1A]">{errors.email.message}</p>}
          {isSubmitSuccessful && !errors.email && (
            <p className="text-sm text-brand-green">Tautan reset kata sandi telah dikirim ke email Anda.</p>
          )}
        </div>

        <Button type="submit" variant="secondary" size="md" className="w-full rounded-lg py-3 text-xl font-semibold">
          Kirim Tautan Reset
          <LoginArrowIcon className="h-[18px] w-[18px]" />
        </Button>

        <Link to="/login" className="flex items-center justify-center gap-2 text-base text-navy" aria-label="Kembali ke halaman masuk">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke Masuk
        </Link>
      </form>
    </AuthCard>
  )
}
