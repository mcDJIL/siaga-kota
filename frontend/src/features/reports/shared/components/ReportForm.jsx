import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Input } from '../../../../components/ui/Input'
import { Textarea } from '../../../../components/ui/Textarea'
import { Select } from '../../../../components/ui/Select'
import { PhotoDropzone } from './PhotoDropzone'
import { REPORT_TYPE_OPTIONS, CATEGORY_OPTIONS_BY_TYPE } from '../../citizen/reports/data/categoryOptions'

export function ReportForm() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  const reportType = useWatch({ control, name: 'reportType' })
  const categoryOptions = CATEGORY_OPTIONS_BY_TYPE[reportType] ?? []

  function handleReportTypeChange(event) {
    setValue('reportType', event.target.value, { shouldValidate: true })
    setValue('category', '', { shouldValidate: true })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="reportType" className="text-sm font-medium tracking-[0.14px] text-text-body">
          Jenis Laporan
        </label>
        <Select id="reportType" value={reportType} onChange={handleReportTypeChange} error={errors.reportType}>
          <option value="" disabled>
            Pilih jenis laporan
          </option>
          {REPORT_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {errors.reportType && <p className="text-sm text-[#BA1A1A]">{errors.reportType.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium tracking-[0.14px] text-text-body">
          Judul Laporan
        </label>
        <Input id="title" placeholder="Contoh: Genangan air di depan pasar" error={errors.title} {...register('title')} />
        {errors.title && <p className="text-sm text-[#BA1A1A]">{errors.title.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-sm font-medium tracking-[0.14px] text-text-body">
          Kategori
        </label>
        <Select id="category" disabled={!reportType} error={errors.category} {...register('category')}>
          <option value="" disabled>
            Pilih kategori
          </option>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {errors.category && <p className="text-sm text-[#BA1A1A]">{errors.category.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="location" className="text-sm font-medium tracking-[0.14px] text-text-body">
          Lokasi
        </label>
        <Input id="location" placeholder="Contoh: Jl. Sudirman No. 12" error={errors.location} {...register('location')} />
        {errors.location && <p className="text-sm text-[#BA1A1A]">{errors.location.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-medium tracking-[0.14px] text-text-body">
          Deskripsi
        </label>
        <Textarea
          id="description"
          placeholder="Ceritakan kondisi yang Anda temukan..."
          error={errors.description}
          {...register('description')}
        />
        {errors.description && <p className="text-sm text-[#BA1A1A]">{errors.description.message}</p>}
      </div>

      <Controller
        name="images"
        control={control}
        render={({ field }) => <PhotoDropzone value={field.value} onChange={field.onChange} />}
      />
      {errors.images && <p className="text-sm text-[#BA1A1A]">{errors.images.message}</p>}
    </div>
  )
}
