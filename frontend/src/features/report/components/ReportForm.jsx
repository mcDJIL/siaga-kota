import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown } from 'lucide-react'
import { Input } from '../../../components/ui/Input'
import { Textarea } from '../../../components/ui/Textarea'
import { Button } from '../../../components/ui/Button'
import { cn } from '../../../lib/cn'
import { reportSchema, REPORT_CATEGORIES } from '../validation/reportSchema'
import { LoginOverlay } from './LoginOverlay'
import { LocationPicker } from './LocationPicker'
import { ImageDropzone } from './ImageDropzone'

const isAuthenticated = false

export function ReportForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: { title: '', category: '', location: '', description: '', photo: null },
  })

  const onSubmit = (data) => {
    console.log('Laporan siap dikirim (belum ada backend):', data)
  }

  return (
    <section className="bg-bg-blue-light px-4 py-16 sm:px-8 lg:py-20">
      <div className="relative mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            'flex flex-col gap-6 rounded-2xl border border-border-muted/30 bg-white p-6 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)] sm:p-10',
            !isAuthenticated && 'pointer-events-none opacity-40'
          )}
          aria-disabled={!isAuthenticated}
        >
          <h2 className="border-b border-[#E5E7EB] pb-4 font-display text-base font-bold text-text-body">
            Formulir Laporan
          </h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-base text-text-body">
              Judul Laporan
            </label>
            <Input
              id="title"
              placeholder="Contoh: Genangan air setinggi mata kaki"
              error={errors.title}
              {...register('title')}
            />
          </div>

          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="category" className="text-base text-text-body">
                Kategori
              </label>
              <div className="relative">
                <select
                  id="category"
                  className="w-full appearance-none rounded-lg bg-bg-soft px-4 py-4 text-base text-text-body focus:outline-2 focus:outline-brand-green"
                  defaultValue=""
                  {...register('category')}
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  {REPORT_CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#6B7280]" />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <label className="text-base text-text-body">Lokasi (Pilih di Peta)</label>
              <Controller name="location" control={control} render={() => <LocationPicker />} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-base text-text-body">
              Deskripsi Detail
            </label>
            <Textarea
              id="description"
              placeholder="Ceritakan detail kejadian..."
              error={errors.description}
              {...register('description')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base text-text-body">Unggah Foto</label>
            <Controller
              name="photo"
              control={control}
              render={({ field }) => <ImageDropzone onChange={field.onChange} disabled={!isAuthenticated} />}
            />
          </div>

          <Button type="submit" size="block" disabled={!isAuthenticated} aria-label="Kirim laporan">
            Kirim Laporan
          </Button>
        </form>

        {!isAuthenticated && (
          <LoginOverlay onLoginClick={() => {}} onRegisterClick={() => {}} />
        )}
      </div>
    </section>
  )
}
