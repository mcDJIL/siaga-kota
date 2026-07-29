import { z } from 'zod'

export const floodReportSchema = z.object({
  title: z.string().min(5, 'Judul laporan minimal 5 karakter'),
  address: z.string().min(5, 'Lokasi kejadian wajib diisi'),
  latitude: z.number().finite('Latitude harus angka yang valid'),
  longitude: z.number().finite('Longitude harus angka yang valid'),
  water_level_cm: z.string().optional().or(z.number().optional()),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  agreement: z.boolean().refine((value) => value === true, {
    message: 'Anda harus menyetujui pernyataan ini',
  }),
  images: z.array(z.any()).min(1, 'Unggah minimal 1 foto pendukung').max(3, 'Maksimal 3 foto'),
})
