import { ANNOUNCEMENT_STATUS } from '../data/announcementData'

export const STATUS_BADGE_STYLES = {
  [ANNOUNCEMENT_STATUS.PUBLISHED]: 'bg-brand-green-light/60 text-brand-green-dark',
  [ANNOUNCEMENT_STATUS.DRAFT]: 'bg-[#D3E4FE] text-text-muted',
  [ANNOUNCEMENT_STATUS.ARCHIVED]: 'bg-bg-blue-light text-text-muted',
}

export const STATUS_LABELS = {
  [ANNOUNCEMENT_STATUS.PUBLISHED]: 'Aktif',
  [ANNOUNCEMENT_STATUS.DRAFT]: 'Draft',
  [ANNOUNCEMENT_STATUS.ARCHIVED]: 'Arsip',
}
