import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Input } from '../../../../components/ui/Input'
import { Select } from '../../../../components/ui/Select'
import { Button } from '../../../../components/ui/Button'
import { DEPARTMENT_OPTIONS } from '../data/governmentProfileData'
import { profileSchema } from '../utils/profileValidation'

export function ProfileForm({ profile, onSave, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name || '',
      phone: profile?.phone || '',
      department: profile?.department ? (DEPARTMENT_OPTIONS.includes(profile.department) ? profile.department : DEPARTMENT_OPTIONS[0]) : DEPARTMENT_OPTIONS[0],
    },
    values: {
      name: profile?.name || '',
      phone: profile?.phone || '',
      department: profile?.department ? (DEPARTMENT_OPTIONS.includes(profile.department) ? profile.department : DEPARTMENT_OPTIONS[0]) : DEPARTMENT_OPTIONS[0],
    },
  })

  async function onSubmit(values) {
    await onSave(values)
  }

  function onInvalid() {
    toast.error('Periksa kembali data yang dimasukkan.')
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      className="flex flex-col gap-6 rounded-2xl border border-[#DCE9FF] bg-white p-6 shadow-sm"
    >
      <h2 className="border-b border-[#C4C6CF]/50 pb-4 text-xl font-semibold text-navy">Data Pribadi</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-text-body" htmlFor="profile-name">
          Nama Lengkap
          <Input id="profile-name" {...register('name')} error={Boolean(errors.name)} disabled={isLoading} />
          {errors.name && <span className="text-xs text-[#BA1A1A]">{errors.name.message}</span>}
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-text-body" htmlFor="profile-email">
          Email
          <Input id="profile-email" type="email" value={profile.email} disabled readOnly className="opacity-60" />
        </label>

        <label className="flex flex-col col-span-2 gap-2 text-sm font-medium text-text-body" htmlFor="profile-phone">
          Nomor Telepon
          <Input id="profile-phone" {...register('phone')} error={Boolean(errors.phone)} disabled={isLoading} />
          {errors.phone && <span className="text-xs text-[#BA1A1A]">{errors.phone.message}</span>}
        </label>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="navy" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Menyimpan...
            </>
          ) : (
            'Simpan Perubahan'
          )}
        </Button>
      </div>
    </motion.form>
  )
}
