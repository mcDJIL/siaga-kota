import { useState } from 'react'
import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'
import { Select } from '../../../../../components/ui/Select'
import { Textarea } from '../../../../../components/ui/Textarea'
import { DEPARTMENTS, OFFICERS, PRIORITY_OPTIONS, RESPONSE_TIME_OPTIONS } from '../../data/officerData'

export function AssignOfficerModal({ target, onClose, onAssign }) {
  const [officerId, setOfficerId] = useState(OFFICERS[0].id)
  const [department, setDepartment] = useState(DEPARTMENTS[0])
  const [priority, setPriority] = useState(PRIORITY_OPTIONS[2])
  const [responseTime, setResponseTime] = useState(RESPONSE_TIME_OPTIONS[2])
  const [notes, setNotes] = useState('')

  function handleAssign() {
    const officer = OFFICERS.find((item) => item.id === officerId)
    onAssign({ officerId, officerName: officer?.name, department, priority, responseTime, notes })
    setNotes('')
  }

  return (
    <Modal isOpen={Boolean(target)} onClose={onClose} title="Tugaskan Petugas" className="max-w-lg">
      {target && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-muted">
            Menugaskan untuk <span className="font-semibold text-text-body">{target.district}</span> &ndash; {target.sector}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm text-text-body">
              Petugas
              <Select value={officerId} onChange={(event) => setOfficerId(event.target.value)}>
                {OFFICERS.map((officer) => (
                  <option key={officer.id} value={officer.id}>
                    {officer.name}
                  </option>
                ))}
              </Select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-text-body">
              Instansi
              <Select value={department} onChange={(event) => setDepartment(event.target.value)}>
                {DEPARTMENTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-text-body">
              Prioritas
              <Select value={priority} onChange={(event) => setPriority(event.target.value)}>
                {PRIORITY_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-text-body">
              Estimasi Waktu Respon
              <Select value={responseTime} onChange={(event) => setResponseTime(event.target.value)}>
                {RESPONSE_TIME_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm text-text-body">
            Catatan
            <Textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Catatan tambahan untuk petugas..."
              rows={3}
            />
          </label>

          <div className="mt-2 flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="navy" size="sm" onClick={handleAssign}>
              Assign
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
