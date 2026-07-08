import { z } from 'zod'

export const profileSchema = z.object({
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  phone: z
    .string()
    .min(9, 'Nomor telepon minimal 9 digit')
    .regex(/^\+?[0-9\s-]+$/, 'Format nomor telepon tidak valid'),
  email: z.string().email('Format email tidak valid'),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Kata sandi saat ini wajib diisi'),
    newPassword: z.string().min(8, 'Minimal 8 karakter'),
    confirmPassword: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Konfirmasi kata sandi tidak cocok',
    path: ['confirmPassword'],
  })

export const DELETE_ACCOUNT_CONFIRMATION_WORD = 'HAPUS'
