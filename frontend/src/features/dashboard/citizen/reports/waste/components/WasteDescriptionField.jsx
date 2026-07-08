import { useFormContext } from 'react-hook-form'
import { Textarea } from '../../../../../../components/ui/Textarea'

export function WasteDescriptionField() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="description" className="text-base text-text-body">
        Deskripsi Detail
      </label>
      <Textarea
        id="description"
        rows={4}
        placeholder="Ceritakan kondisi sampah, perkiraan volume, atau hambatan akses..."
        error={errors.description}
        className="rounded-xl bg-[#F8FAFC] py-4"
        {...register('description')}
      />
      {errors.description && <p className="text-sm text-[#BA1A1A]">{errors.description.message}</p>}
    </div>
  )
}
