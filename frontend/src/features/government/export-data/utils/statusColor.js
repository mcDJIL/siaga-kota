import { EXPORT_STATUS } from '../data/exportHistoryData'

export const STATUS_BADGE_STYLES = {
  [EXPORT_STATUS.COMPLETED]: 'bg-brand-green-light/60 text-brand-green-dark',
  [EXPORT_STATUS.PROCESSING]: 'bg-badge-gold/20 text-[#715C00]',
  [EXPORT_STATUS.FAILED]: 'bg-[#BA1A1A]/10 text-[#BA1A1A]',
}

export const STATUS_LABELS = {
  [EXPORT_STATUS.COMPLETED]: 'Selesai',
  [EXPORT_STATUS.PROCESSING]: 'Memproses',
  [EXPORT_STATUS.FAILED]: 'Gagal',
}

export const STATUS_TOOLTIP = {
  [EXPORT_STATUS.COMPLETED]: 'Unduh berkas ekspor.',
  [EXPORT_STATUS.PROCESSING]: 'Laporan masih diproses.',
  [EXPORT_STATUS.FAILED]: 'Ekspor gagal.',
}
