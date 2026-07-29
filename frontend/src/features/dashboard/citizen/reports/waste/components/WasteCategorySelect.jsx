import { useFormContext } from 'react-hook-form'
import { Select } from '../../../../../../components/ui/Select'
import { WASTE_CATEGORIES } from '../data/wasteCategories'

export function WasteCategorySelect() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="wasteType" className="flex items-center gap-2 text-base text-text-body">
        Tipe Sampah <span className="text-[#BA1A1A]">*</span>
      </label>
      <Select
        id="wasteType"
        defaultValue=""
        error={errors.wasteType}
        className="rounded-xl bg-[#F8FAFC] py-4"
        {...register('wasteType')}
      >
        <option value="" disabled>
          Pilih Tipe Sampah
        </option>
        {WASTE_CATEGORIES.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </Select>
      {errors.wasteType && <p className="text-sm text-[#BA1A1A]">{errors.wasteType.message}</p>}
    </div>
  )
}
