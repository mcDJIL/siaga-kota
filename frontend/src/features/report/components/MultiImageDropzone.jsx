import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, X, ImageIcon, AlertCircle } from 'lucide-react'
import { compressImage } from '../../../utils/compressImage'

const MAX_SIZE_BYTES = 5 * 1024 * 1024
const MAX_FILES = 10

export function MultiImageDropzone({ onChange, disabled, maxFiles = MAX_FILES }) {
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview)
      })
    }
  }, [files])

  const onDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      setError('')

      if (rejectedFiles.length > 0) {
        setError(`${rejectedFiles.length} file(s) ditolak. Pastikan ukuran file ≤ 5MB`)
        return
      }

      if (files.length + acceptedFiles.length > maxFiles) {
        setError(`Maksimal ${maxFiles} file yang dapat diunggah`)
        return
      }

      try {
        const newFiles = await Promise.all(
          acceptedFiles.map(async (file) => {
            const compressed = await compressImage(file)
            return {
              id: `${Date.now()}-${Math.random()}`,
              file: compressed,
              name: file.name,
              preview: URL.createObjectURL(compressed),
              size: (compressed.size / 1024 / 1024).toFixed(2), // MB
            }
          })
        )

        const updatedFiles = [...files, ...newFiles]
        setFiles(updatedFiles)
        onChange?.(updatedFiles.map((f) => f.file))
      } catch (err) {
        setError('Gagal memproses file. Silakan coba lagi.')
        console.error(err)
      }
    },
    [files, onChange, maxFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: disabled || files.length >= maxFiles,
    maxSize: MAX_SIZE_BYTES,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
  })

  const handleRemove = (id) => {
    setFiles((prev) => {
      const filtered = prev.filter((f) => f.id !== id)
      onChange?.(filtered.map((f) => f.file))
      return filtered
    })
  }

  const handleRemoveAll = () => {
    setFiles([])
    onChange?.([])
  }

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: disabled || files.length >= maxFiles ? 1 : 1.01 }}
        transition={{ duration: 0.2 }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
          isDragActive ? 'border-brand-green bg-brand-green/5' : 'border-border-muted'
        } ${(disabled || files.length >= maxFiles) && 'opacity-60'}`}
      >
        <input {...getInputProps()} aria-label="Unggah foto laporan" />
        <UploadCloud size={36} className="text-badge-neutral" aria-hidden="true" />
        <p className="text-base text-badge-neutral">
          {isDragActive ? 'Lepaskan file di sini...' : 'Klik atau seret foto untuk mengunggah (Max 5MB)'}
        </p>
        <p className="text-xs text-badge-neutral/80">
          {files.length}/{maxFiles} file | Format: JPG, JPEG, PNG, WEBP
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="flex items-center gap-2 rounded-lg bg-[#FFEBEE] p-3 text-sm text-[#C5192D]"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </motion.div>
      )}

      <AnimatePresence mode="popLayout">
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-body">Upload Preview ({files.length})</h3>
              {files.length > 0 && (
                <button
                  type="button"
                  onClick={handleRemoveAll}
                  className="text-xs text-[#BA1A1A] hover:underline"
                >
                  Hapus semua
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group relative overflow-hidden rounded-lg border border-border-muted/50 bg-bg-soft"
                >
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="aspect-square w-full object-cover"
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-navy/80 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => handleRemove(file.id)}
                      aria-label="Hapus foto"
                      className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                    >
                      <X size={16} />
                    </button>
                    <span className="text-xs text-white/80">{file.size}MB</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 flex items-center gap-1 bg-gradient-to-t from-navy/80 to-transparent p-2">
                    <ImageIcon size={12} className="text-white" aria-hidden="true" />
                    <span className="truncate text-xs text-white">{file.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
