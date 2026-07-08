import { useFormContext } from 'react-hook-form'
import { Textarea } from '../../../../../components/ui/Textarea'

export function FloodDescriptionField() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="description" className="text-sm font-medium tracking-[0.14px] text-text-body">
        Deskripsi Tambahan
      </label>
      <Textarea
        id="description"
        rows={4}
        placeholder="Ceritakan kondisi terkini, dampak, atau bantuan yang dibutuhkan..."
        error={errors.description}
        className="rounded-lg bg-bg-blue-soft py-4"
        {...register('description')}
      />
      {errors.description && <p className="text-sm text-[#BA1A1A]">{errors.description.message}</p>}
    </div>
  )
}
