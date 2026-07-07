import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, X } from 'lucide-react'
import { compressImage } from '../../../../../utils/compressImage'

function AddPhotoTile({ onAdd }) {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (!file) return
      const compressed = await compressImage(file)
      onAdd(URL.createObjectURL(compressed))
    },
    [onAdd]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
  })

  return (
    <motion.div
      {...getRootProps()}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`flex aspect-[127/106] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed ${
        isDragActive ? 'border-brand-green bg-brand-green/5' : 'border-border-muted'
      }`}
    >
      <input {...getInputProps()} aria-label="Tambah foto kejadian" />
      <Camera className="h-7 w-7 text-border-muted" aria-hidden="true" />
      <span className="text-base text-border-muted">Tambah Foto</span>
    </motion.div>
  )
}

export function ReportGallery({ photos, onAddPhoto }) {
  const [activePhoto, setActivePhoto] = useState(null)

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      aria-labelledby="report-gallery-heading"
      className="flex flex-col gap-4 rounded-xl border border-bg-blue-light bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
    >
      <h2 id="report-gallery-heading" className="text-base font-normal text-navy">
        Foto Kejadian
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <motion.button
            key={photo}
            type="button"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActivePhoto(photo)}
            aria-label={`Lihat foto kejadian ${index + 1}`}
            className="aspect-[127/106] overflow-hidden rounded-lg"
          >
            <img src={photo} alt={`Foto kejadian ${index + 1}`} className="h-full w-full object-cover" />
          </motion.button>
        ))}
        <AddPhotoTile onAdd={onAddPhoto} />
      </div>

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-4"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[80vh] max-w-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img src={activePhoto} alt="Pratinjau foto kejadian" className="max-h-[80vh] rounded-lg object-contain" />
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                aria-label="Tutup pratinjau"
                className="absolute top-3 right-3 rounded-full bg-white/90 p-1.5 text-navy"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
