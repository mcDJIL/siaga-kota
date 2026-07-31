import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'
import { Input } from '../../../../../components/ui/Input'
import { Textarea } from '../../../../../components/ui/Textarea'
import { Select } from '../../../../../components/ui/Select'
import { AUDIENCE_OPTIONS, TYPE_OPTIONS } from '../../data/announcementData'

const INITIAL_FORM = {
  title: '',
  body: '',
  audience: AUDIENCE_OPTIONS[0].value,
  type: TYPE_OPTIONS[0].value,
  publishDate: '',
}

export function AnnouncementForm({ onPublish }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.title.trim()) nextErrors.title = 'Judul wajib diisi.'
    if (!form.body.trim()) nextErrors.body = 'Isi pengumuman wajib diisi.'
    if (!form.audience) nextErrors.audience = 'Target audiens wajib dipilih.'
    if (!form.publishDate) nextErrors.publishDate = 'Tanggal publikasi wajib diisi.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return

    onPublish({
      title: form.title,
      body: form.body,
      audience: form.audience,
      type: form.type,
      published_at: form.publishDate,
    })
    setForm(INITIAL_FORM)
    setErrors({})
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-[0_4px_12px_0_rgba(26,54,93,0.08)] lg:col-span-4"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-brand-green" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-navy">Buat Pengumuman Baru</h3>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-text-body">
        Judul Pengumuman
        <Input
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="Masukkan judul menarik"
          error={Boolean(errors.title)}
          className="border border-[#C4C6CF] py-3.5"
        />
        {errors.title && <span className="text-xs font-normal text-[#BA1A1A]">{errors.title}</span>}
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-text-body">
        Isi Pengumuman
        <Textarea
          value={form.body}
          onChange={(event) => updateField('body', event.target.value)}
          placeholder="Tuliskan detail informasi..."
          rows={5}
          error={Boolean(errors.body)}
          className="border border-[#C4C6CF]"
        />
        {errors.body && <span className="text-xs font-normal text-[#BA1A1A]">{errors.body}</span>}
      </label>

      <div className="flex flex-col gap-4 sm:flex-row">
        <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-text-body">
          Target Audiens
          <Select
            value={form.audience}
            onChange={(event) => updateField('audience', event.target.value)}
            className="border border-[#C4C6CF] py-3"
          >
            {AUDIENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>

        <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-text-body">
          Jenis Pengumuman
          <Select
            value={form.type}
            onChange={(event) => updateField('type', event.target.value)}
            className="border border-[#C4C6CF] py-3"
          >
            {TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>

        <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-text-body">
          Tanggal Publikasi
          <Input
            type="date"
            value={form.publishDate}
            onChange={(event) => updateField('publishDate', event.target.value)}
            error={Boolean(errors.publishDate)}
            className="border border-[#C4C6CF] py-3.5"
          />
        </label>
      </div>

      <Button type="submit" variant="primary" className="bg-brand-green-dark hover:bg-brand-green-dark/90">
        <Send className="h-3 w-2.5" aria-hidden="true" />
        Publikasikan
      </Button>
    </motion.form>
  )
}
