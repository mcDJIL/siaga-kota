import { FORMAT_EXTENSIONS } from './formatColor'

export function formatExportTimestamp(isoDate) {
  const date = new Date(isoDate)
  const datePart = date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  const timePart = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
  return `${datePart}, ${timePart}`
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function buildExportFilename(dataType, format) {
  return `${slugify(dataType)}.${FORMAT_EXTENSIONS[format]}`
}
