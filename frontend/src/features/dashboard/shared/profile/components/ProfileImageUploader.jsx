import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Camera, X } from 'lucide-react'
import { compressImage } from '../../../../../utils/compressImage'
import { cn } from '../../../../../lib/cn'

export function ProfileImageUploader({ value, onChange, isLoading = false }) {
  const [isCompressing, setIsCompressing] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (!file) return

      setIsCompressing(true)
      const compressed = await compressImage(file)
      onChange?.(compressed)
      setIsCompressing(false)
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
    maxFiles: 1,
    multiple: false,
    disabled: isLoading || isCompressing,
  })

  const handleRemove = (event) => {
    event.stopPropagation()
    onChange?.(null)
  }

  return (
    <motion.div
      {...getRootProps()}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={!isLoading && !isCompressing ? { scale: 1.03 } : {}}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full',
        isLoading || isCompressing ? 'cursor-not-allowed opacity-70' : ''
      )}
      role="button"
      aria-label="Ubah foto profil"
    >
      <input {...getInputProps()} aria-label="Unggah foto profil" />

      <div
        className={cn(
          'h-24 w-24 overflow-hidden rounded-full border-2 bg-bg-blue-lighter',
          isDragActive ? 'border-brand-green' : 'border-bg-blue-lighter'
        )}
      >
        {value ? (
          <img src={value} alt="Foto profil" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-navy">?</div>
        )}
      </div>

      {value && !isLoading && !isCompressing && (
        <button
          type="button"
          onClick={handleRemove}
          aria-label="Hapus foto profil"
          className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#BA1A1A] text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      <span className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-navy text-white">
        <Camera className="h-4 w-4" aria-hidden="true" />
      </span>

      {(isCompressing || isLoading) && (
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-navy/40 text-xs font-semibold text-white">
          {isCompressing ? 'Kompres...' : 'Upload...'}
        </span>
      )}
    </motion.div>
  )
}
