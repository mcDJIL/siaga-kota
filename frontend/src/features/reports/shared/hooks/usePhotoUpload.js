import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { compressImage } from '../../../../utils/compressImage'

const MAX_IMAGES = 3

export function usePhotoUpload({ value = [], onChange }) {
  const [previews, setPreviews] = useState([])

  useEffect(() => {
    const urls = value.map((file) => URL.createObjectURL(file))
    setPreviews(urls)
    return () => urls.forEach((url) => URL.revokeObjectURL(url))
  }, [value])

  const addFiles = useCallback(
    async (files) => {
      const remainingSlots = MAX_IMAGES - value.length
      if (remainingSlots <= 0) return

      try {
        const filesToAdd = files.slice(0, remainingSlots)
        const compressedFiles = await Promise.all(filesToAdd.map(compressImage))
        onChange?.([...value, ...compressedFiles])
      } catch {
        toast.error('Gagal memproses gambar.')
      }
    },
    [value, onChange]
  )

  const removeFile = useCallback(
    (index) => {
      onChange?.(value.filter((_, i) => i !== index))
    },
    [value, onChange]
  )

  return { previews, addFiles, removeFile, maxImages: MAX_IMAGES, canAddMore: value.length < MAX_IMAGES }
}
