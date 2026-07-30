import { Controller, useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Input } from '../../../../../../components/ui/Input'
import { WasteCategorySelect } from './WasteCategorySelect'
import { WasteDescriptionField } from './WasteDescriptionField'
import { PhotoDropzone } from './PhotoDropzone'
import { SubmitReportButton } from './SubmitReportButton'

export function WasteReportForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-6 rounded-2xl border border-[#F1F5F9] bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="flex items-center gap-2 text-base text-text-body">
            Judul Laporan <span className="text-[#BA1A1A]">*</span>
          </label>
          <Input
            id="title"
            placeholder="Contoh: Tumpukan sampah plastik di depan pasar"
            error={errors.title}
            className="rounded-xl bg-[#F8FAFC] py-[18px]"
            {...register('title')}
          />
          {errors.title && <p className="text-sm text-[#BA1A1A]">{errors.title.message}</p>}
        </div>

        <WasteCategorySelect />

        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="flex items-center gap-2 text-base text-text-body">
            Alamat <span className="text-[#BA1A1A]">*</span>
          </label>
          <Input
            id="address"
            placeholder="Alamat lokasi pembuangan sampah"
            error={errors.address}
            className="rounded-xl bg-[#F8FAFC] py-[18px]"
            {...register('address')}
          />
          {errors.address && <p className="text-sm text-[#BA1A1A]">{errors.address.message}</p>}
        </div>

        <WasteDescriptionField />

        <Controller
          name="images"
          control={control}
          render={({ field }) => <PhotoDropzone value={field.value} onChange={field.onChange} />}
        />
        {errors.images && <p className="text-sm text-[#BA1A1A]">{errors.images.message}</p>}
      </motion.div>

      <SubmitReportButton />
    </div>
  )
}
