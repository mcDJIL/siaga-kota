import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, User, Clock } from 'lucide-react'
import { Badge } from '../../../../components/ui/Badge'
import { Button } from '../../../../components/ui/Button'
import { getSeverityVariant, getStatusVariant } from '../utils/markerHelpers'

export function MarkerPopupCard({ object }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex w-64 flex-col gap-2"
    >
      <div className="flex items-center gap-2">
        <Badge variant="neutral">{object.category}</Badge>
        {object.statusLabel && <Badge variant={getStatusVariant(object.status)}>{object.statusLabel}</Badge>}
      </div>

      <h3 className="font-display text-base font-semibold text-navy">{object.title}</h3>

      {object.description && <p className="text-sm text-text-muted">{object.description}</p>}

      {object.severity && (
        <Badge variant={getSeverityVariant(object.severity)} className="w-fit">
          Severity: {object.severity}
        </Badge>
      )}

      <div className="flex flex-col gap-1 text-xs text-text-muted">
        {object.reporter && (
          <span className="flex items-center gap-1.5">
            <User size={12} aria-hidden="true" /> {object.reporter}
          </span>
        )}
        {object.address && (
          <span className="flex items-center gap-1.5">
            <MapPin size={12} aria-hidden="true" /> {object.address}
          </span>
        )}
        {object.updatedAt && (
          <span className="flex items-center gap-1.5">
            <Clock size={12} aria-hidden="true" /> {object.updatedAt}
          </span>
        )}
      </div>

      {object.id && (
        <Button
          variant="navy"
          size="sm"
          className="mt-1 w-full"
          onClick={() => navigate(`/citizen/reports/${object.id}`)}
        >
          Lihat Detail
        </Button>
      )}
    </motion.div>
  )
}
