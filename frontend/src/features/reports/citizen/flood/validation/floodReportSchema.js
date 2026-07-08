import { z } from 'zod'

export const floodReportSchema = z.object({
  title: z.string().min(5, 'Judul laporan minimal 5 karakter'),
  severity: z.string().min(1, 'Pilih tingkat keparahan banjir'),
  address: z.string().min(5, 'Lokasi kejadian wajib diisi'),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  agreement: z.boolean().refine((value) => value === true, {
    message: 'Anda harus menyetujui pernyataan ini',
  }),
  images: z.array(z.instanceof(File)).min(1, 'Unggah minimal 1 foto pendukung').max(3, 'Maksimal 3 foto'),
})
