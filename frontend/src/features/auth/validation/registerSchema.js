import { z } from 'zod'

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Nama lengkap wajib diisi'),
    email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
    phone: z
      .string()
      .min(1, 'Nomor telepon wajib diisi')
      .regex(/^[0-9+\s-]{8,}$/, 'Format nomor telepon tidak valid'),
    password: z.string().min(8, 'Kata sandi minimal 8 karakter'),
    confirmPassword: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
    agree: z.literal(true, { message: 'Anda harus menyetujui ketentuan yang berlaku' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi kata sandi tidak cocok',
    path: ['confirmPassword'],
  })
