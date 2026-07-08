import { z } from 'zod'

export const createReportSchema = z.object({
  reportType: z.enum(['waste', 'flood'], { required_error: 'Pilih jenis laporan' }),
  title: z.string().min(5, 'Judul laporan minimal 5 karakter'),
  category: z.string().min(1, 'Pilih kategori laporan'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  location: z.string().min(5, 'Lokasi kejadian wajib diisi'),
  images: z.array(z.instanceof(File)).min(1, 'Unggah minimal 1 foto pendukung').max(3, 'Maksimal 3 foto'),
})
