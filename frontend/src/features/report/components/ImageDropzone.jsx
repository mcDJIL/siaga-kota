import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { UploadCloud, X, ImageIcon } from 'lucide-react'
import { compressImage } from '../../../utils/compressImage'

const MAX_SIZE_BYTES = 5 * 1024 * 1024

export function ImageDropzone({ onChange, disabled }) {
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (!file) return

      const compressed = await compressImage(file)
      setPreview(URL.createObjectURL(compressed))
      setFileName(file.name)
      onChange?.(compressed)
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    maxSize: MAX_SIZE_BYTES,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
    maxFiles: 1,
  })

  const handleRemove = (event) => {
    event.stopPropagation()
    setPreview(null)
    setFileName('')
    onChange?.(null)
  }

  if (preview) {
    return (
      <div className="flex items-center gap-4 rounded-xl border-2 border-border-muted bg-bg-soft p-4">
        <img src={preview} alt="Pratinjau unggahan" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
        <div className="flex flex-1 items-center gap-2 overflow-hidden">
          <ImageIcon size={16} className="shrink-0 text-text-muted" aria-hidden="true" />
          <span className="truncate text-sm text-text-body">{fileName}</span>
        </div>
        <button
          type="button"
          aria-label="Hapus foto"
          onClick={handleRemove}
          className="shrink-0 rounded-full p-1 text-text-muted hover:bg-border-muted/40"
        >
          <X size={16} />
        </button>
      </div>
    )
  }

  return (
    <motion.div
      {...getRootProps()}
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      transition={{ duration: 0.2 }}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-10 text-center ${
        isDragActive ? 'border-brand-green bg-brand-green/5' : 'border-border-muted'
      }`}
    >
      <input {...getInputProps()} aria-label="Unggah foto laporan" />
      <UploadCloud size={36} className="text-badge-neutral" aria-hidden="true" />
      <p className="text-base text-badge-neutral">
        {isDragActive ? 'Lepaskan file di sini...' : 'Klik atau seret foto untuk mengunggah (Max 5MB)'}
      </p>
      <p className="text-xs text-badge-neutral/80">Format: JPG, JPEG, PNG, WEBP</p>
    </motion.div>
  )
}
