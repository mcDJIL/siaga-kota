import { motion } from 'framer-motion'
import { UserRoundPen } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Input } from '../../../../components/ui/Input'
import { Button } from '../../../../components/ui/Button'
import { profileSchema } from '../utils/profileValidation'

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-text-muted">{label}</label>
      {children}
      {error && <p className="text-xs text-[#BA1A1A]">{error.message}</p>}
    </div>
  )
}

export function ProfileForm({ profile, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile.fullName,
      phone: profile.phone,
      email: profile.email,
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center gap-2">
        <UserRoundPen className="h-5 w-5 text-navy" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-text-body">Edit Profile Details</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, () => toast.error('Tolong lengkapi data terlebih dahulu.'))}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name" error={errors.fullName}>
            <Input {...register('fullName')} autoComplete="name" error={Boolean(errors.fullName)} />
          </Field>

          <Field label="Email Address">
            <Input
              {...register('email')}
              readOnly
              disabled
              aria-readonly="true"
              className="cursor-not-allowed opacity-70"
            />
          </Field>
        </div>

        <Field label="Phone Number" error={errors.phone}>
          <Input {...register('phone')} autoComplete="tel" error={Boolean(errors.phone)} />
        </Field>

        <div className="pt-2">
          <Button type="submit" variant="navy">
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
