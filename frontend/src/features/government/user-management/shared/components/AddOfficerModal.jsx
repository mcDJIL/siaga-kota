import { useEffect, useRef, useState } from 'react'
import { Camera, UserRound } from 'lucide-react'
import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'
import { Input } from '../../../../../components/ui/Input'
import { Select } from '../../../../../components/ui/Select'
import { Textarea } from '../../../../../components/ui/Textarea'
import { DISTRICT_OPTIONS, INSTITUTION_OPTIONS } from '../../data/userData'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9+ ]{9,15}$/

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  nip: '',
  institution: INSTITUTION_OPTIONS[0],
  district: DISTRICT_OPTIONS[0],
  address: '',
  password: '',
  confirmPassword: '',
  status: 'Aktif',
  avatar: null,
}

export function AddOfficerModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [avatarPreview, setAvatarPreview] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Nama lengkap wajib diisi.'
    if (!EMAIL_REGEX.test(form.email)) nextErrors.email = 'Format email tidak valid.'
    if (!PHONE_REGEX.test(form.phone)) nextErrors.phone = 'Format nomor telepon tidak valid.'
    if (!form.nip.trim()) nextErrors.nip = 'NIP wajib diisi.'
    if (!form.address.trim()) nextErrors.address = 'Alamat wajib diisi.'
    if (form.password.length < 8) nextErrors.password = 'Password minimal 8 karakter.'
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Konfirmasi password tidak cocok.'
    if (form.avatar && form.avatar.size > 2 * 1024 * 1024) nextErrors.avatar = 'Ukuran foto maksimal 2MB.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview)
    }

    updateField('avatar', file)
    setAvatarPreview(URL.createObjectURL(file))
    setErrors((current) => ({ ...current, avatar: undefined }))
  }

  function handleSubmit() {
    if (!validate()) return

    onSubmit({
      name: form.name,
      email: form.email,
      phone: form.phone,
      employee_id: form.nip,
      password: form.password,
      role: 'petugas',
      institution: form.institution,
      district: form.district,
      address: form.address,
      status: form.status,
      avatar: form.avatar,
    })
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setAvatarPreview('')
    setForm(INITIAL_FORM)
    setErrors({})
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Petugas Baru" className="max-w-xl">
      <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-blue-light text-text-muted">
            {avatarPreview ? (
              <img src={avatarPreview} alt="" className="h-full w-full object-cover" />
            ) : (
              <UserRound className="h-7 w-7" aria-hidden="true" />
            )}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <Button
            variant="ghost"
            size="sm"
            className="border border-[#C4C6CF]"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="h-4 w-4" aria-hidden="true" />
            Upload Foto Profil
          </Button>
        </div>
        {errors.avatar && <span className="-mt-2 text-xs text-[#BA1A1A]">{errors.avatar}</span>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Nama Lengkap
            <Input value={form.name} onChange={(event) => updateField('name', event.target.value)} error={Boolean(errors.name)} />
            {errors.name && <span className="text-xs text-[#BA1A1A]">{errors.name}</span>}
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Email
            <Input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} error={Boolean(errors.email)} />
            {errors.email && <span className="text-xs text-[#BA1A1A]">{errors.email}</span>}
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body col-span-2">
            Nomor Telepon
            <Input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} error={Boolean(errors.phone)} />
            {errors.phone && <span className="text-xs text-[#BA1A1A]">{errors.phone}</span>}
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Role
            <Input value="Officer" disabled className="opacity-70" />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Instansi
            <Select value={form.institution} onChange={(event) => updateField('institution', event.target.value)}>
              {INSTITUTION_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Kecamatan Penugasan
            <Select value={form.district} onChange={(event) => updateField('district', event.target.value)}>
              {DISTRICT_OPTIONS.map((item) => (
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
          Alamat
          <Textarea value={form.address} onChange={(event) => updateField('address', event.target.value)} rows={2} error={Boolean(errors.address)} />
          {errors.address && <span className="text-xs text-[#BA1A1A]">{errors.address}</span>}
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Password
            <Input type="password" value={form.password} onChange={(event) => updateField('password', event.target.value)} error={Boolean(errors.password)} />
            {errors.password && <span className="text-xs text-[#BA1A1A]">{errors.password}</span>}
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Konfirmasi Password
            <Input
              type="password"
              value={form.confirmPassword}
              onChange={(event) => updateField('confirmPassword', event.target.value)}
              error={Boolean(errors.confirmPassword)}
            />
            {errors.confirmPassword && <span className="text-xs text-[#BA1A1A]">{errors.confirmPassword}</span>}
          </label>
        </div>

        <div className="mt-2 flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Batal
          </Button>
          <Button variant="navy" size="sm" onClick={handleSubmit}>
            Tambah Petugas
          </Button>
        </div>
      </div>
    </Modal>
  )
}
