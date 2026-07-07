import { z } from 'zod'

export const newsletterSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
})
