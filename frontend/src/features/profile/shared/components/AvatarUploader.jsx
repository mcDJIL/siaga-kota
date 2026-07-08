import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { compressImage } from '../../../../utils/compressImage'
import { cn } from '../../../../lib/cn'

export function AvatarUploader({ value, onChange }) {
  const [isCompressing, setIsCompressing] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (!file) return

      setIsCompressing(true)
      const compressed = await compressImage(file)
      onChange?.(URL.createObjectURL(compressed))
      setIsCompressing(false)
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
    maxFiles: 1,
    multiple: false,
  })

  return (
    <motion.div
      {...getRootProps()}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      role="button"
      aria-label="Ubah foto profil"
      className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full"
    >
      <input {...getInputProps()} aria-label="Unggah foto profil" />

      <div
        className={cn(
          'h-32 w-32 overflow-hidden rounded-full border-4 bg-bg-blue-light',
          isDragActive ? 'border-brand-green' : 'border-bg-blue-soft'
        )}
      >
        {value ? (
          <img src={value} alt="Foto profil" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-navy">?</div>
        )}
      </div>

      <span className="absolute right-1 bottom-1 flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white shadow-sm">
        <Camera className="h-4 w-4" aria-hidden="true" />
      </span>

      {isCompressing && (
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-navy/40 text-xs font-semibold text-white">
          ...
        </span>
      )}
    </motion.div>
  )
}
