import { motion } from 'framer-motion'
import { cn } from '../../../../../lib/cn'
import { NotificationIcon } from './NotificationIcon'
import { NotificationBadge } from './NotificationBadge'
import { NotificationActionButton } from './NotificationActionButton'

const BORDER_COLOR_MAP = {
  alert: 'border-l-[#BA1A1A]',
  'new-report': 'border-l-[#006D40]',
  system: 'border-l-navy',
  maintenance: 'border-l-badge-gold',
}

export function NotificationCard({ notification, onViewDetail, onHide, onMarkRead, onConfirm, onComplete }) {
  const { type, title, time, status } = notification
  const isUnread = status === 'unread'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: status === 'read' || status === 'confirmed' || status === 'completed' ? 0.85 : 1, y: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.25 } }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn(
        'flex items-start gap-4 rounded-xl border-l-4 bg-bg-soft p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] sm:p-6',
        BORDER_COLOR_MAP[type] ?? 'border-l-border-muted'
      )}
    >
      <NotificationIcon type={type} />

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
          <NotificationBadge type={type} />
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">{time}</span>
        </div>

        <p className={cn('text-base text-text-body', isUnread ? 'font-semibold' : 'font-normal')}>{title}</p>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {type === 'alert' && (
            <>
              <NotificationActionButton variant="primary" onClick={() => onViewDetail(notification)}>
                Lihat Detail
              </NotificationActionButton>
              <NotificationActionButton variant="secondary" onClick={() => onHide(notification.id)}>
                Sembunyikan
              </NotificationActionButton>
            </>
          )}

          {type === 'new-report' && (
            <>
              <NotificationActionButton variant="primary" onClick={() => onViewDetail(notification)}>
                Verifikasi
              </NotificationActionButton>
              <NotificationActionButton
                variant="outline"
                disabled={status === 'read'}
                onClick={() => onMarkRead(notification.id)}
              >
                {status === 'read' ? 'Sudah Dibaca' : 'Tandai Dibaca'}
              </NotificationActionButton>
            </>
          )}

          {type === 'system' && (
            <NotificationActionButton variant="secondary" onClick={() => onViewDetail(notification)}>
              Lihat Laporan
            </NotificationActionButton>
          )}

          {type === 'maintenance' && (
            <>
              <NotificationActionButton
                variant="primary"
                disabled={status === 'confirmed' || status === 'completed'}
                onClick={() => onConfirm(notification.id)}
              >
                {status === 'confirmed' || status === 'completed' ? 'Terkonfirmasi' : 'Konfirmasi'}
              </NotificationActionButton>
              <NotificationActionButton
                variant="outline"
                disabled={status === 'completed'}
                onClick={() => onComplete(notification.id)}
              >
                {status === 'completed' ? 'Selesai' : 'Tandai Selesai'}
              </NotificationActionButton>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
