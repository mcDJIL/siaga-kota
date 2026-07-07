import { z } from 'zod'

export const handlingSchema = z.object({
  notes: z.string().min(10, 'Catatan penanganan minimal 10 karakter'),
  evidence: z.array(z.instanceof(File)).max(5, 'Maksimal 5 foto bukti').optional().default([]),
})
