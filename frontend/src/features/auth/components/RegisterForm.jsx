import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../../components/ui/Button'
import { PasswordInput } from './PasswordInput'
import { RememberMeCheckbox } from './RememberMeCheckbox'
import { MailIcon, PhoneIcon, RegisterArrowIcon, UserIcon } from './icons'
import { registerSchema } from '../validation/registerSchema'
import { cn } from '../../../lib/cn'
import { register as registerUser } from '../../../services/auth.service'

function TextField({ id, label, icon: Icon, error, register, className, ...props }) {
  return (
    <div className={cn('flex flex-1 flex-col gap-1', className)}>
      <label htmlFor={id} className="text-sm font-medium tracking-[0.14px] text-text-body">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
        <input
          id={id}
          aria-invalid={Boolean(error)}
          className={cn(
            'w-full rounded-lg border border-border-muted bg-bg-soft py-[14px] pr-4 pl-10 text-base text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green',
            error && 'border-[#BA1A1A] outline-2 outline-[#BA1A1A]'
          )}
          {...register}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-[#BA1A1A]">{error}</p>}
    </div>
  )
}

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', phone: '', password: '', confirmPassword: '', agree: false },
  })

  const onSubmit = async (data) => {
    try {
      const payload = await registerUser({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.confirmPassword,
      })

      console.log('Registrasi berhasil:', payload.data.user)
      alert('Registrasi berhasil. Silakan login.')
      // TODO: redirect ke halaman login di sini
    } catch (error) {
      console.error('Registrasi gagal:', error)
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
      <TextField
        id="fullName"
        label="Nama Lengkap"
        icon={UserIcon}
        placeholder="Masukkan nama lengkap"
        autoComplete="name"
        error={errors.fullName?.message}
        register={register('fullName')}
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <TextField
          id="email"
          label="Email"
          icon={MailIcon}
          type="email"
          placeholder="contoh@mail.com"
          autoComplete="email"
          error={errors.email?.message}
          register={register('email')}
        />
        <TextField
          id="phone"
          label="Nomor Telepon"
          icon={PhoneIcon}
          type="tel"
          placeholder="0812xxxx"
          autoComplete="tel"
          error={errors.phone?.message}
          register={register('phone')}
        />
      </div>

      <PasswordInput
        id="password"
        label="Kata Sandi"
        autoComplete="new-password"
        placeholder="Min. 8 karakter"
        error={errors.password?.message}
        {...register('password')}
      />

      <PasswordInput
        id="confirmPassword"
        label="Konfirmasi Kata Sandi"
        autoComplete="new-password"
        placeholder="Ulangi kata sandi"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <RememberMeCheckbox
        id="agree"
        label={
          <>
            Dengan mendaftar, Anda menyetujui <span className="font-semibold text-navy">Ketentuan Layanan</span> dan{' '}
            <span className="font-semibold text-navy">Kebijakan Privasi</span> kami.
          </>
        }
        error={errors.agree?.message}
        {...register('agree')}
      />

      <Button type="submit" variant="secondary" size="md" className="w-full rounded-lg py-3 text-xl font-semibold">
        Daftar
        <RegisterArrowIcon className="h-4 w-[22px]" />
      </Button>

      <p className="text-center text-base text-text-muted">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-navy">
          Masuk
        </Link>
      </p>
    </motion.form>
  )
}
