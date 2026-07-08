export function formatPoints(value) {
  return new Intl.NumberFormat('id-ID').format(value)
}

export function formatSignedXp(value) {
  const formatted = formatPoints(Math.abs(value))
  return value < 0 ? `-${formatted} XP` : `+${formatted} XP`
}
