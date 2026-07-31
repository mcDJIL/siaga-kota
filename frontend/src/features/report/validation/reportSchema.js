import { z } from 'zod'

export const REPORT_CATEGORIES = [
  { value: 'banjir', label: 'Banjir' },
  { value: 'sampah', label: 'Sampah' },
]

export const reportSchema = z.object({
  title: z.string().min(5, 'Judul laporan minimal 5 karakter'),
  category: z.string().min(1, 'Pilih kategori laporan'),
  location: z.string().min(1, 'Pilih lokasi di peta'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  photo: z.instanceof(File).optional().nullable(),
})
