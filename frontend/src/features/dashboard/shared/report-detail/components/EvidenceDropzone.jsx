import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { UploadCloud, X, ImageIcon } from 'lucide-react'
import { compressImage } from '../../../../../utils/compressImage'

const MAX_FILES = 5
const MAX_SIZE_BYTES = 5 * 1024 * 1024

export function EvidenceDropzone({ value = [], onChange, disabled }) {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const remainingSlots = MAX_FILES - value.length
      if (remainingSlots <= 0) return

      const files = acceptedFiles.slice(0, remainingSlots)
      const compressedFiles = await Promise.all(files.map((file) => compressImage(file)))
      onChange?.([...value, ...compressedFiles])
    },
    [onChange, value]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: disabled || value.length >= MAX_FILES,
    maxSize: MAX_SIZE_BYTES,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
    maxFiles: MAX_FILES,
  })

  const handleRemove = (index) => {
    onChange?.(value.filter((_, fileIndex) => fileIndex !== index))
  }

  return (
    <div className="flex flex-col gap-3">
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: disabled || value.length >= MAX_FILES ? 1 : 1.01 }}
        transition={{ duration: 0.2 }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed bg-bg-soft p-8 text-center ${
          isDragActive ? 'border-brand-green bg-brand-green/5' : 'border-border-muted'
        }`}
      >
        <input {...getInputProps()} aria-label="Unggah foto bukti penanganan" />
        <UploadCloud className="mb-2 h-8 w-8 text-border-muted" aria-hidden="true" />
        <p className="text-base font-medium text-text-muted">
          {isDragActive ? 'Lepaskan file di sini...' : 'Klik atau seret foto bukti ke sini'}
        </p>
        <p className="text-base text-badge-neutral">Maks. 5 file, format JPG/PNG</p>
      </motion.div>

      {value.length > 0 && (
        <ul className="flex flex-col gap-2">
          {value.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-border-muted bg-bg-soft p-3"
            >
              <ImageIcon className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
              <span className="flex-1 truncate text-sm text-text-body">{file.name}</span>
              <button
                type="button"
                aria-label={`Hapus foto bukti ${file.name}`}
                onClick={() => handleRemove(index)}
                className="shrink-0 rounded-full p-1 text-text-muted hover:bg-border-muted/40"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
