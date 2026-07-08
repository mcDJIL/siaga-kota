import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, RotateCcw } from 'lucide-react'
import { Modal } from '../../../../components/ui/Modal'
import { Input } from '../../../../components/ui/Input'
import { Button } from '../../../../components/ui/Button'
import { changePasswordSchema } from '../utils/profileValidation'

function PasswordField({ label, error, register, name }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-text-muted" htmlFor={name}>
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

export function ChangePasswordModal({ isOpen, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  function handleClose() {
    reset()
    onClose()
  }

  function handleFormSubmit(values) {
    onSubmit(values)
    reset()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Ubah Password">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <PasswordField label="Current Password" name="currentPassword" register={register} error={errors.currentPassword} />
        <PasswordField label="New Password" name="newPassword" register={register} error={errors.newPassword} />
        <PasswordField label="Confirm Password" name="confirmPassword" register={register} error={errors.confirmPassword} />

        <div className="flex flex-col gap-3 pt-2 sm:flex-row-reverse">
          <Button type="submit" variant="navy" disabled={!isValid} className="sm:flex-1 disabled:opacity-50">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Update Password
          </Button>
          <Button type="button" variant="ghost" onClick={handleClose} className="text-text-muted sm:flex-1">
            Batal
          </Button>
        </div>
      </form>
    </Modal>
  )
}
