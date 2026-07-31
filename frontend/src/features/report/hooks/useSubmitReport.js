import { useState } from 'react'
import { toast } from 'sonner'
import { submitReport } from '../../../services/report.service'

export function useSubmitReport() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData) {
    setIsSubmitting(true)
    try {
      const result = await submitReport({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        photo: formData.photo,
      })

      toast.success('Laporan berhasil dikirim!')
      return result
    } catch (error) {
      console.error('Submit report error:', error)
      const message = error.message || 'Gagal mengirim laporan. Silakan coba lagi.'
      toast.error(message)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    handleSubmit,
  }
}
