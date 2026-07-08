import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { Modal } from '../../../../components/ui/Modal'
import { Input } from '../../../../components/ui/Input'
import { Button } from '../../../../components/ui/Button'
import { changePasswordSchema } from '../utils/profileValidation'

const FIELDS = [
  { name: 'currentPassword', label: 'Password Lama' },
  { name: 'newPassword', label: 'Password Baru' },
  { name: 'confirmPassword', label: 'Konfirmasi Password Baru' },
]

export function ChangePasswordModal({ isOpen, onClose, onSuccess }) {
  const [visibleFields, setVisibleFields] = useState({})

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  function toggleVisibility(field) {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }))
  }

  function onSubmit() {
    reset()
    setVisibleFields({})
    onSuccess()
  }

  function onInvalid() {
    toast.error('Periksa kembali data yang dimasukkan.')
  }

  function handleClose() {
    reset()
    setVisibleFields({})
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Ubah Kata Sandi">
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="flex flex-col gap-4">
        {FIELDS.map(({ name, label }) => (
          <label key={name} className="flex flex-col gap-1.5 text-sm font-medium text-text-body" htmlFor={`password-${name}`}>
            {label}
            <div className="relative">
              <Input
                id={`password-${name}`}
                type={visibleFields[name] ? 'text' : 'password'}
                {...register(name)}
                error={Boolean(errors[name])}
                className="pr-11"
              />
              <button
                type="button"
                onClick={() => toggleVisibility(name)}
                aria-label={visibleFields[name] ? `Sembunyikan ${label}` : `Tampilkan ${label}`}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-text-muted hover:text-text-body"
              >
                {visibleFields[name] ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
            {errors[name] && <span className="text-xs text-[#BA1A1A]">{errors[name].message}</span>}
          </label>
        ))}

        <div className="mt-2 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Batal
          </Button>
          <Button type="submit" variant="navy">
            Simpan
          </Button>
        </div>
      </form>
    </Modal>
  )
}
