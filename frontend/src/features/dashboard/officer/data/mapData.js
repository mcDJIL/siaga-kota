export const MAP_CENTER = [-6.2607, 106.8106]
export const MAP_ZOOM = 13

export const OFFICER_LOCATION = {
  id: 'officer-1',
  position: [-6.2607, 106.8106],
  name: 'Petugas Lapangan',
}

export const TASK_MARKERS = [
  {
    id: '#W-902',
    position: [-6.2839, 106.8294],
    title: 'Pembuangan Ilegal',
    description: 'Pasar Minggu · Prioritas Tinggi',
    type: 'report',
  },
  {
    id: '#F-451',
    position: [-6.2443, 106.7996],
    title: 'Saluran Tersumbat',
    description: 'Kebayoran Baru · Prioritas Sedang',
    type: 'task',
  },
]

export const ROUTE_TO_ACTIVE_TASK = {
  id: 'route-w-902',
  label: 'Rute ke #W-902: 12 mnt',
  positions: [OFFICER_LOCATION.position, TASK_MARKERS[0].position],
}
