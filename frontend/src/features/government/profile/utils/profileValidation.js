import { z } from 'zod'
import { DEPARTMENT_OPTIONS } from '../data/governmentProfileData'

export const profileSchema = z.object({
  name: z.string().trim().min(1, 'Nama lengkap wajib diisi.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Nomor telepon wajib diisi.')
    .regex(/^[0-9+ ]+$/, 'Nomor telepon hanya boleh berisi angka.'),
  department: z.enum(DEPARTMENT_OPTIONS, { message: 'Departemen wajib dipilih.' }),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().trim().min(1, 'Password lama wajib diisi.'),
    newPassword: z.string().trim().min(8, 'Password baru minimal 8 karakter.'),
    confirmPassword: z.string().trim().min(1, 'Konfirmasi password wajib diisi.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok.',
    path: ['confirmPassword'],
  })
