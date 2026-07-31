import { useRef, useState } from 'react'
import { Upload, UserRound, X, Loader2 } from 'lucide-react'
import { Modal } from '../../../../components/ui/Modal'
import { Button } from '../../../../components/ui/Button'

export function ChangeProfilePhotoModal({ isOpen, onClose, currentAvatar, onSave, isLoading }) {
  const [preview, setPreview] = useState(currentAvatar)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Pilih file gambar yang valid')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file tidak boleh lebih dari 5MB')
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setSelectedFile(file)
  }

  function handleRemove() {
    setPreview(null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function handleClose() {
    if (!isLoading) {
      setPreview(currentAvatar)
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      onClose()
    }
  }

  async function handleSave() {
    if (!selectedFile) {
      onClose()
      return
    }
    await onSave(selectedFile)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Ubah Foto Profil">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-bg-blue-light bg-bg-blue-soft">
          {preview ? (
            <img src={preview} alt="Pratinjau foto profil" className="h-full w-full object-cover" />
          ) : (
            <UserRound className="h-12 w-12 text-text-muted" aria-hidden="true" />
          )}
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isLoading} />

        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="border border-[#C4C6CF]" 
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            Upload
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="border border-[#C4C6CF] text-[#BA1A1A]" 
            onClick={handleRemove}
            disabled={isLoading}
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Hapus
          </Button>
        </div>

        <div className="mt-2 flex w-full justify-end gap-3">
          <Button variant="ghost" onClick={handleClose} disabled={isLoading}>
            Batal
          </Button>
          <Button variant="navy" onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Menyimpan...
              </>
            ) : (
              'Simpan'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
