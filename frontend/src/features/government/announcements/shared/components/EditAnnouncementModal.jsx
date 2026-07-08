import { useEffect, useState } from 'react'
import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'
import { Input } from '../../../../../components/ui/Input'
import { Textarea } from '../../../../../components/ui/Textarea'
import { Select } from '../../../../../components/ui/Select'
import { STATUS_OPTIONS, TARGET_OPTIONS } from '../../data/announcementData'

export function EditAnnouncementModal({ announcement, onClose, onSave }) {
  const [form, setForm] = useState(null)

  useEffect(() => {
    if (announcement) {
      setForm({
        title: announcement.title,
        body: announcement.body,
        target: announcement.target,
        publishDate: announcement.publishDate,
        status: announcement.status,
      })
    }
  }, [announcement])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSave() {
    if (announcement) onSave(announcement.id, form)
  }

  return (
    <Modal isOpen={Boolean(announcement)} onClose={onClose} title="Edit Pengumuman" className="max-w-lg">
      {announcement && form && (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Judul
            <Input value={form.title} onChange={(event) => updateField('title', event.target.value)} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Isi
            <Textarea value={form.body} onChange={(event) => updateField('body', event.target.value)} rows={4} />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm text-text-body">
              Target Audiens
              <Select value={form.target} onChange={(event) => updateField('target', event.target.value)}>
                {TARGET_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-text-body">
              Tanggal Publikasi
              <Input type="date" value={form.publishDate} onChange={(event) => updateField('publishDate', event.target.value)} />
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-text-body">
              Status
              <Select value={form.status} onChange={(event) => updateField('status', event.target.value)}>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </label>
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Batal
            </Button>
            <Button variant="navy" size="sm" onClick={handleSave}>
              Simpan Perubahan
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
