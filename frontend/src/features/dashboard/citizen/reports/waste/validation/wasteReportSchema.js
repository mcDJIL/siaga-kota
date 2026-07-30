import { z } from 'zod'

export const wasteReportSchema = z.object({
  title: z.string().min(5, 'Judul laporan minimal 5 karakter').trim(),
  wasteType: z.string().min(1, 'Pilih tipe sampah'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter').trim(),
  address: z.string().min(1, 'Alamat tidak valid'),
  latitude: z.number().finite('Latitude harus angka yang valid'),
  longitude: z.number().finite('Longitude harus angka yang valid'),
  images: z.array(z.any()).min(1, 'Unggah minimal 1 foto pendukung').max(3, 'Maksimal 3 foto'),
})
