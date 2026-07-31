import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { FilePenLine } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../../../../components/ui/Input'
import { profileSchema } from '../validation/profileSchema'

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-base text-text-muted">{label}</label>
      {children}
      {error && <p className="text-xs text-[#BA1A1A]">{error.message}</p>}
    </div>
  )
}

export const ProfileForm = forwardRef(function ProfileForm({ profile, onSubmit, isLoading = false }, ref) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center gap-2 border-b border-border-muted pb-4">
        <FilePenLine className="h-[18px] w-[18px] text-navy" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-text-body">Edit Data Diri</h3>
      </div>

      <form
        id="profile-form"
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        <Field label="Nama Lengkap" error={errors.fullName}>
          <Input {...register('fullName')} autoComplete="name" error={Boolean(errors.fullName)} disabled={isLoading} />
        </Field>

        <Field label="Email Kerja">
          <Input {...register('email')} readOnly disabled className="cursor-not-allowed opacity-70" />
        </Field>

        <Field label="Nomor Telepon" error={errors.phone}>
          <Input {...register('phone')} autoComplete="tel" error={Boolean(errors.phone)} disabled={isLoading} />
        </Field>
      </form>

      {isLoading && (
        <div className="flex items-center justify-center text-sm text-text-muted">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-border-muted border-t-navy mr-2" />
          Menyimpan perubahan...
        </div>
      )}
    </motion.div>
  )
})
