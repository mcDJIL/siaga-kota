import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageOff, ImagePlus, X } from 'lucide-react'
import { toast } from 'sonner'
import { compressImage } from '../../../../../../utils/compressImage'

const MAX_IMAGES = 3
const ACCEPTED_TYPES = { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }

export function PhotoDropzone({ value = [], onChange }) {
  const [previews, setPreviews] = useState([])

  useEffect(() => {
    const urls = value.map((file) => URL.createObjectURL(file))
    setPreviews(urls)
    return () => urls.forEach((url) => URL.revokeObjectURL(url))
  }, [value])

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const remainingSlots = MAX_IMAGES - value.length
      if (remainingSlots <= 0) return

      try {
        const filesToAdd = acceptedFiles.slice(0, remainingSlots)
        const compressedFiles = await Promise.all(filesToAdd.map(compressImage))
        onChange?.([...value, ...compressedFiles])
      } catch {
        toast.error('Gagal memproses gambar.')
      }
    },
    [value, onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: value.length >= MAX_IMAGES,
    accept: ACCEPTED_TYPES,
    maxFiles: MAX_IMAGES - value.length,
  })

  const handleRemove = (index) => {
    onChange?.(value.filter((_, i) => i !== index))
  }

  const placeholderCount = Math.max(0, MAX_IMAGES - value.length - 1)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="text-base text-text-body">Foto Pendukung (Maks. 3)</label>
        <span className="text-xs tracking-[0.6px] text-text-muted">Format: JPG, PNG</span>
      </div>

      <div className="flex gap-4">
        {value.length < MAX_IMAGES && (
          <motion.div
            {...getRootProps()}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className={`flex aspect-[219/169] flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-[#F8FAFC] ${
              isDragActive ? 'border-brand-green' : 'border-border-muted'
            }`}
          >
            <input {...getInputProps()} aria-label="Unggah foto pendukung" />
            <ImagePlus className="h-12 w-12 text-text-muted" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">Tambah</span>
          </motion.div>
        )}

        <AnimatePresence>
          {previews.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="group relative aspect-[219/169] flex-1 overflow-hidden rounded-2xl bg-[#E2E8F0]"
            >
              <img src={src} alt={`Pratinjau foto ${index + 1}`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  aria-label={`Hapus foto ${index + 1}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BA1A1A] text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {Array.from({ length: placeholderCount }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="flex aspect-[179/136] flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-border-muted/30 bg-bg-blue-soft"
          >
            <ImageOff className="h-[22px] w-[22px] text-border-muted" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  )
}
