import { z } from 'zod'

export const wasteReportSchema = z.object({
  title: z.string().min(5, 'Judul laporan minimal 5 karakter'),
  category: z.string().min(1, 'Pilih kategori sampah'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  latitude: z.number(),
  longitude: z.number(),
  images: z.array(z.instanceof(File)).min(1, 'Unggah minimal 1 foto pendukung').max(3, 'Maksimal 3 foto'),
})
