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
      <label htmlFor="category" className="text-base text-text-body">
        Kategori Sampah
      </label>
      <Select
        id="category"
        defaultValue=""
        error={errors.category}
        className="rounded-xl bg-[#F8FAFC] py-4"
        {...register('category')}
      >
        <option value="" disabled>
          Pilih Kategori
        </option>
        {WASTE_CATEGORIES.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </Select>
      {errors.category && <p className="text-sm text-[#BA1A1A]">{errors.category.message}</p>}
    </div>
  )
}
