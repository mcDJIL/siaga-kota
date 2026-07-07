import { z } from 'zod'

export const profileSchema = z.object({
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  nip: z.string().min(8, 'NIP minimal 8 digit'),
  email: z.string().email('Format email tidak valid'),
  phone: z.string().min(8, 'Nomor telepon tidak valid'),
})
