import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../../components/ui/Button'
import { PasswordInput } from './PasswordInput'
import { GoogleButton } from './GoogleButton'
import { RememberMeCheckbox } from './RememberMeCheckbox'
import { MailIcon, LoginArrowIcon } from './icons'
import { loginSchema } from '../validation/loginSchema'
import { cn } from '../../../lib/cn'
import { login, saveAuthToken, me } from '../../../services/auth.service'
import { useNavigate } from 'react-router-dom'

export function LoginForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '', rememberMe: false },
  })

  const onSubmit = async (data) => {
    try {
      const payload = await login({ email: data.identifier, password: data.password })
      saveAuthToken(payload.data.token)
      localStorage.setItem('user', JSON.stringify(payload.data.user))
      // attempt to fetch current user (me) to determine role and redirect
      try {
        const who = await me()
        const user = who?.data?.user ?? who?.data ?? payload?.data?.user
        const role = user?.role ?? (user?.roles && user.roles[0]) ?? ''
        const r = String(role).toLowerCase()
        const path = /citizen|warga|masyarakat/.test(r)
          ? '/citizen/dashboard'
          : /officer|petugas|koordinator/.test(r)
          ? '/officer/dashboard'
          : /government|gov|admin/.test(r)
          ? '/government/dashboard'
          : '/'

        navigate(path, { replace: true })
      } catch (err) {
        navigate('/', { replace: true })
      }
    } catch (error) {
      console.error('Login gagal:', error)
      alert(error.response?.message ?? error.message)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex w-full flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="identifier" className="text-sm font-medium tracking-[0.14px] text-text-body">
          Email atau Username
        </label>
        <div className="relative">
          <MailIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-5 -translate-y-1/2" />
          <input
            id="identifier"
            type="text"
            autoComplete="username"
            placeholder="name@company.com"
            aria-invalid={Boolean(errors.identifier)}
            className={cn(
              'w-full rounded-lg border border-border-muted bg-bg-soft py-[13px] pr-4 pl-10 text-base text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green',
              errors.identifier && 'border-[#BA1A1A] outline-2 outline-[#BA1A1A]'
            )}
            {...register('identifier')}
          />
        </div>
        {errors.identifier && <p className="text-sm text-[#BA1A1A]">{errors.identifier.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium tracking-[0.14px] text-text-body">
            Kata Sandi
          </label>
          <Link to="/forgot-password" className="text-sm font-medium tracking-[0.14px] text-navy-light">
            Lupa Kata Sandi?
          </Link>
        </div>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      <RememberMeCheckbox id="rememberMe" label="Ingat Saya" {...register('rememberMe')} />

      <Button type="submit" variant="secondary" size="md" className="w-full rounded-lg py-3 text-xl font-semibold">
        Masuk
        <LoginArrowIcon className="h-[18px] w-[18px]" />
      </Button>

      <div className="flex items-center gap-4 py-1">
        <span className="h-px flex-1 bg-border-muted" />
        <span className="text-sm font-medium tracking-[0.14px] text-text-muted">Atau masuk dengan</span>
        <span className="h-px flex-1 bg-border-muted" />
      </div>

      <GoogleButton />

      <p className="text-center text-base text-text-muted">
        Belum punya akun?{' '}
        <Link to="/register" className="text-navy">
          Daftar sekarang
        </Link>
      </p>
    </motion.form>
  )
}
