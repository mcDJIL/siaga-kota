import { useDropzone } from 'react-dropzone'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageOff, ImagePlus, X } from 'lucide-react'
import { usePhotoUpload } from '../hooks/usePhotoUpload'

const ACCEPTED_TYPES = { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }

export function PhotoDropzone({ value = [], onChange, label = 'Unggah Foto (Maks. 3)' }) {
  const { previews, addFiles, removeFile, maxImages, canAddMore } = usePhotoUpload({ value, onChange })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: addFiles,
    disabled: !canAddMore,
    accept: ACCEPTED_TYPES,
    maxFiles: maxImages - value.length,
  })

  const placeholderCount = Math.max(0, maxImages - value.length - 1)

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium tracking-[0.14px] text-text-body">{label}</label>
      <div className="flex items-start gap-4">
        {canAddMore && (
          <motion.div
            {...getRootProps()}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className={`flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed bg-bg-blue-lighter ${
              isDragActive ? 'border-brand-green' : 'border-border-muted'
            }`}
          >
            <input {...getInputProps()} aria-label="Unggah foto pendukung" />
            <ImagePlus className="h-6 w-6 text-badge-neutral" aria-hidden="true" />
          </motion.div>
        )}

        <AnimatePresence>
          {previews.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-xl shadow-sm"
            >
              <img src={src} alt={`Pratinjau foto ${index + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Hapus foto ${index + 1}`}
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#BA1A1A] text-white shadow-md"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {Array.from({ length: placeholderCount }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-border-muted/30 bg-bg-blue-soft opacity-50"
          >
            <ImageOff className="h-[18px] w-[18px] text-badge-neutral" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  )
}
