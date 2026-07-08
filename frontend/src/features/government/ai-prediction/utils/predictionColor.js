export const RISK_COLORS = {
  high: '#BA1A1A',
  medium: '#C9A82C',
  low: '#006D40',
}

export const RISK_LABELS = {
  high: 'Tinggi',
  medium: 'Sedang',
  low: 'Rendah',
}

export const RISK_LEGEND_ITEMS = [
  { id: 'high', label: 'Tinggi (>80%)', color: RISK_COLORS.high },
  { id: 'medium', label: 'Sedang (40-79%)', color: RISK_COLORS.medium },
  { id: 'low', label: 'Rendah (<40%)', color: RISK_COLORS.low },
]

export function getRiskLevelFromPercentage(percentage) {
  if (percentage >= 80) return 'high'
  if (percentage >= 40) return 'medium'
  return 'low'
}

export const RISK_BADGE_STYLES = {
  high: 'border border-[#BA1A1A]/20 bg-[#BA1A1A]/10 text-[#BA1A1A]',
  medium: 'border border-[#C9A82C]/30 bg-[#C9A82C]/20 text-[#4D3E00]',
  low: 'border border-brand-green/20 bg-brand-green/10 text-brand-green-dark',
}
