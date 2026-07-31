import { z } from 'zod'

export const handlingSchema = z.object({
  notes: z.string().min(10, 'Catatan penanganan minimal 10 karakter').max(1000, 'Catatan maksimal 1000 karakter'),
  evidence: z
    .array(
      z.any().refine(
        (file) => file instanceof File || file instanceof Blob,
        { message: 'File harus berupa gambar' }
      )
    )
    .max(5, 'Maksimal 5 foto bukti')
    .optional()
    .default([]),
})
