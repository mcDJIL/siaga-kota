import { useFormContext } from 'react-hook-form'
import { Select } from '../../../../../components/ui/Select'
import { SEVERITY_OPTIONS } from '../data/severityOptions'

export function FloodSeveritySelect() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="severity" className="text-sm font-medium tracking-[0.14px] text-text-body">
        Kategori Banjir
      </label>
      <Select
        id="severity"
        defaultValue=""
        error={errors.severity}
        className="rounded-lg bg-bg-blue-soft py-4"
        {...register('severity')}
      >
        <option value="" disabled>
          Pilih tingkat keparahan
        </option>
        {SEVERITY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {errors.severity && <p className="text-sm text-[#BA1A1A]">{errors.severity.message}</p>}
    </div>
  )
}
