export function formatPublishDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function truncateBody(body, maxLength = 90) {
  if (body.length <= maxLength) return body
  return `${body.slice(0, maxLength).trim()}...`
}
