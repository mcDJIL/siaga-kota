import { useEffect, useState } from 'react'
import { UserRound } from 'lucide-react'
import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'
import { Input } from '../../../../../components/ui/Input'
import { Select } from '../../../../../components/ui/Select'
import { Textarea } from '../../../../../components/ui/Textarea'
import { DISTRICT_OPTIONS, INSTITUTION_OPTIONS, ROLE_OPTIONS } from '../../data/userData'

export function EditUserModal({ user, onClose, onSave }) {
  const [form, setForm] = useState(null)

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        phone: user.phone,
        nip: user.nip ?? '',
        role: user.role,
        district: user.district,
        institution: user.institution ?? INSTITUTION_OPTIONS[0],
        address: user.address,
        status: user.status,
      })
    }
  }, [user])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSave() {
    if (user) onSave(user.id, form)
  }

  return (
    <Modal isOpen={Boolean(user)} onClose={onClose} title="Edit Pengguna" className="max-w-xl">
      {user && form && (
      <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-bg-blue-light text-text-muted">
            <UserRound className="h-7 w-7" aria-hidden="true" />
          </span>
          <Button variant="ghost" size="sm" className="border border-[#C4C6CF]" type="button">
            Upload Foto Profil
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Nama Lengkap
            <Input value={form.name} onChange={(event) => updateField('name', event.target.value)} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Email (Read Only)
            <Input value={user.email} disabled className="opacity-70" />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Nomor Telepon
            <Input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            NIP
            <Input value={form.nip} onChange={(event) => updateField('nip', event.target.value)} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Role
            <Select value={form.role} onChange={(event) => updateField('role', event.target.value)}>
              {ROLE_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            District
            <Select value={form.district} onChange={(event) => updateField('district', event.target.value)}>
              {DISTRICT_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Institution
            <Select value={form.institution} onChange={(event) => updateField('institution', event.target.value)}>
              {INSTITUTION_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Status
            <Select value={form.status} onChange={(event) => updateField('status', event.target.value)}>
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </Select>
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-text-body">
          Address
          <Textarea value={form.address} onChange={(event) => updateField('address', event.target.value)} rows={2} />
        </label>

        <div className="mt-2 flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="navy" size="sm" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
      )}
    </Modal>
  )
}
