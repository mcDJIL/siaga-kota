import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Textarea } from '../../../../../components/ui/Textarea'
import { Button } from '../../../../../components/ui/Button'
import { EvidenceDropzone } from './EvidenceDropzone'
import { handlingSchema } from '../validation/handlingSchema'

export function HandlingForm({
  onSave,
  onCancel,
  isLoading = false,
  isDisabled = false,
  resolutionNote = null,
  reportStatus = null,
  alwaysVisible = false,
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(handlingSchema),
    defaultValues: { notes: '', evidence: [] },
    mode: 'onBlur',
  })

  const notesValue = watch('notes')
  const evidenceValue = watch('evidence')

  const onSubmit = async (data) => {
    console.log('Form submitted with data:', {
      notes: data.notes,
      evidenceCount: data.evidence?.length || 0,
      evidenceDetails: data.evidence?.map(f => ({
        name: f.name || 'unknown',
        size: f.size || 'unknown',
        type: f.type || 'unknown',
        isFile: f instanceof File,
        isBlob: f instanceof Blob,
        constructor: f.constructor.name,
      })) || [],
    })
    try {
      await onSave?.(data)
    } catch (err) {
      console.error('Error in onSave:', err)
    }
  }

  const handleCancel = () => {
    reset()
    onCancel?.()
  }

  const isFormDisabled = isDisabled || isSubmitting || isLoading
  const isProcessing = reportStatus === 'diproses'
  const isNotVisible = !alwaysVisible && !isProcessing && !resolutionNote

  if (isNotVisible) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      aria-labelledby="handling-form-heading"
      className={`flex flex-col gap-4 rounded-xl border-2 p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)] print:hidden transition-all ${
        isFormDisabled 
          ? 'border-green-200 bg-green-50' 
          : 'border-bg-blue-light bg-white'
      }`}
    >
      <div className="flex items-start gap-3 justify-between">
        <h2 id="handling-form-heading" className="text-base font-normal text-navy">
          Input Penanganan
        </h2>
        {isFormDisabled && resolutionNote && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-white px-3 py-1 rounded-full border border-green-200">
            <CheckCircle2 className="h-4 w-4" />
            Sudah diproses
          </div>
        )}
      </div>

      {isFormDisabled && resolutionNote && (
        <div className="rounded-lg bg-green-100 p-4 border border-green-300">
          <p className="text-sm font-semibold text-green-800 mb-2">✓ Catatan Penanganan:</p>
          <p className="text-sm text-green-700 whitespace-pre-wrap">{resolutionNote}</p>
        </div>
      )}

      {Object.keys(errors).length > 0 && !isFormDisabled && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <p className="text-sm font-semibold text-red-800 mb-2">Perbaiki error berikut:</p>
          <ul className="text-sm text-red-700 space-y-1">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>• {field}: {error?.message || 'Invalid'}</li>
            ))}
          </ul>
        </div>
      )}

      {!isFormDisabled && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="handling-notes" className="text-base text-text-body">
              Catatan Penanganan
              <span className="ml-2 text-xs text-text-muted">({notesValue?.length || 0}/1000)</span>
            </label>
            <Textarea
              id="handling-notes"
              placeholder="Tuliskan detail tindakan yang dilakukan (minimal 10 karakter)..."
              error={Boolean(errors.notes)}
              disabled={isFormDisabled}
              {...register('notes')}
            />
            {errors.notes && (
              <p className="text-sm text-[#BA1A1A]">
                ⚠️ {errors.notes?.message || 'Catatan penanganan tidak valid'}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base text-text-body">
              Unggah Foto Bukti Penanganan
              <span className="ml-2 text-xs text-text-muted">({evidenceValue?.length || 0}/5)</span>
            </label>
            <Controller
              name="evidence"
              control={control}
              render={({ field }) => (
                <EvidenceDropzone 
                  value={field.value} 
                  onChange={field.onChange}
                  disabled={isFormDisabled}
                />
              )}
            />
            {errors.evidence && (
              <p className="text-sm text-[#BA1A1A]">
                ⚠️ {errors.evidence?.message || errors.evidence?.root?.message || 'Foto bukti tidak valid'}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button 
              type="submit" 
              variant="navy" 
              disabled={isFormDisabled || !notesValue || notesValue.length < 10} 
              className="w-full py-4"
              title={!notesValue || notesValue.length < 10 ? 'Catatan minimal 10 karakter' : 'Simpan data penanganan'}
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Update'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              disabled={isFormDisabled}
              className="w-full py-3 text-badge-neutral hover:bg-transparent"
            >
              Batal
            </Button>
          </div>
        </form>
      )}
    </motion.section>
  )
}
