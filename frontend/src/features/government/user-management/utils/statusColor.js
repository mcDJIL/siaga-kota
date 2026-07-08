export function isActiveStatus(status) {
  return status === 'Aktif'
}

export function toggleStatus(status) {
  return isActiveStatus(status) ? 'Nonaktif' : 'Aktif'
}
