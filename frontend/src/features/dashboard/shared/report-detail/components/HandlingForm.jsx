import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Textarea } from '../../../../../components/ui/Textarea'
import { Button } from '../../../../../components/ui/Button'
import { EvidenceDropzone } from './EvidenceDropzone'
import { handlingSchema } from '../validation/handlingSchema'

export function HandlingForm({ onSave, onCancel }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(handlingSchema),
    defaultValues: { notes: '', evidence: [] },
  })

  const onSubmit = async (data) => {
    await onSave?.(data)
  }

  const handleCancel = () => {
    reset()
    onCancel?.()
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      aria-labelledby="handling-form-heading"
      className="flex flex-col gap-4 rounded-xl border border-bg-blue-light bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)] print:hidden"
    >
      <h2 id="handling-form-heading" className="text-base font-normal text-navy">
        Input Penanganan
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="handling-notes" className="text-base text-text-body">
            Catatan Penanganan
          </label>
          <Textarea
            id="handling-notes"
            placeholder="Tuliskan detail tindakan yang dilakukan..."
            error={Boolean(errors.notes)}
            {...register('notes')}
          />
          {errors.notes && <p className="text-sm text-[#BA1A1A]">{errors.notes.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-base text-text-body">Unggah Foto Bukti Penanganan</label>
          <Controller
            name="evidence"
            control={control}
            render={({ field }) => <EvidenceDropzone value={field.value} onChange={field.onChange} />}
          />
          {errors.evidence && <p className="text-sm text-[#BA1A1A]">{errors.evidence.message}</p>}
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button type="submit" variant="navy" disabled={isSubmitting} className="w-full py-4">
            Simpan Update
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={handleCancel}
            className="w-full py-3 text-badge-neutral hover:bg-transparent"
          >
            Batal
          </Button>
        </div>
      </form>
    </motion.section>
  )
}
