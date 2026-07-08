import { useRef, useState } from 'react'
import { Upload, UserRound, X } from 'lucide-react'
import { Modal } from '../../../../components/ui/Modal'
import { Button } from '../../../../components/ui/Button'

export function ChangeProfilePhotoModal({ isOpen, onClose, currentAvatar, onSave }) {
  const [preview, setPreview] = useState(currentAvatar)
  const fileInputRef = useRef(null)

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
  }

  function handleRemove() {
    setPreview(null)
  }

  function handleClose() {
    setPreview(currentAvatar)
    onClose()
  }

  function handleSave() {
    onSave(preview ?? currentAvatar)
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

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

        <div className="flex gap-3">
          <Button variant="ghost" size="sm" className="border border-[#C4C6CF]" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4" aria-hidden="true" />
            Upload
          </Button>
          <Button variant="ghost" size="sm" className="border border-[#C4C6CF] text-[#BA1A1A]" onClick={handleRemove}>
            <X className="h-4 w-4" aria-hidden="true" />
            Hapus
          </Button>
        </div>

        <div className="mt-2 flex w-full justify-end gap-3">
          <Button variant="ghost" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="navy" onClick={handleSave}>
            Simpan
          </Button>
        </div>
      </div>
    </Modal>
  )
}
