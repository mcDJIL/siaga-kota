export function formatPercentage(value) {
  return `${value}%`
}

export function formatPopulation(value) {
  return `${value.toLocaleString('id-ID')} jiwa`
}

export function formatDeadlineLabel(riskLevel) {
  return riskLevel === 'high' ? 'Mendesak' : 'Terjadwal'
}
