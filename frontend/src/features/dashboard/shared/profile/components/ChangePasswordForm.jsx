import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '../../../../../components/ui/Input'
import { Button } from '../../../../../components/ui/Button'
import { passwordSchema } from '../validation/passwordSchema'

function PasswordField({ label, error, register, name }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-text-muted" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <Input
          id={name}
          type={isVisible ? 'text' : 'password'}
          autoComplete={name === 'currentPassword' ? 'current-password' : 'new-password'}
          error={Boolean(error)}
          className="pr-12"
          {...register(name)}
        />
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          aria-label={isVisible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-text-muted"
        >
          {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {error && <p className="text-xs text-[#BA1A1A]">{error.message}</p>}
    </div>
  )
}

export function ChangePasswordForm({ onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <PasswordField label="Kata Sandi Saat Ini" name="currentPassword" register={register} error={errors.currentPassword} />
      <PasswordField label="Kata Sandi Baru" name="newPassword" register={register} error={errors.newPassword} />
      <PasswordField label="Konfirmasi Kata Sandi Baru" name="confirmPassword" register={register} error={errors.confirmPassword} />

      <p className="text-xs text-text-muted">
        Minimal 8 karakter, kombinasi huruf besar, huruf kecil, angka, dan simbol.
      </p>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row-reverse">
        <Button type="submit" variant="navy" className="sm:flex-1">
          Simpan Kata Sandi
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} className="text-text-muted sm:flex-1">
          Batal
        </Button>
      </div>
    </form>
  )
}
