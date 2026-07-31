import { useEffect, useState } from 'react'
import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'
import { Input } from '../../../../../components/ui/Input'
import { Textarea } from '../../../../../components/ui/Textarea'
import { Select } from '../../../../../components/ui/Select'
import { AUDIENCE_OPTIONS, STATUS_OPTIONS, TYPE_OPTIONS } from '../../data/announcementData'

function toDateInputValue(value) {
  if (!value) return ''
  return String(value).slice(0, 10)
}

export function EditAnnouncementModal({ announcement, onClose, onSave }) {
  const [form, setForm] = useState(null)

  useEffect(() => {
    if (announcement) {
      setForm({
        title: announcement.title ?? '',
        body: announcement.body ?? '',
        type: announcement.type ?? 'info',
        audience: announcement.audience ?? 'all',
        published_at: toDateInputValue(announcement.published_at),
        status: announcement.status ?? 'draft',
      })
    }
  }, [announcement])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSave() {
    if (!announcement) return

    onSave(announcement.id, {
      ...form,
      published_at: form.published_at || null,
    })
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
              <Select value={form.audience} onChange={(event) => updateField('audience', event.target.value)}>
                {AUDIENCE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-text-body">
              Jenis
              <Select value={form.type} onChange={(event) => updateField('type', event.target.value)}>
                {TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-text-body">
              Tanggal Publikasi
              <Input
                type="date"
                value={form.published_at}
                onChange={(event) => updateField('published_at', event.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-text-body">
              Status
              <Select value={form.status} onChange={(event) => updateField('status', event.target.value)}>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
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
