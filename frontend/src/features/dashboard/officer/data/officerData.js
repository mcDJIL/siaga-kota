import { OFFICER_PROFILE } from './dashboardData'

export const OFFICERS_TOTAL = 24

export const OFFICERS = [
  {
    id: 'officer-1',
    name: 'Andi Wijaya',
    avatar: OFFICER_PROFILE.avatar,
    status: 'tersedia',
    currentTask: null,
    distance: '1.2 km',
    position: [-6.2145, 106.8398],
  },
  {
    id: 'officer-2',
    name: 'Budi Santoso',
    avatar: OFFICER_PROFILE.avatar,
    status: 'bertugas',
    currentTask: 'Tanggul Jebol - Jl. Sudirman',
    distance: '0.8 km',
    position: [-6.2241, 106.8225],
  },
  {
    id: 'officer-3',
    name: 'Citra Ayu',
    avatar: OFFICER_PROFILE.avatar,
    status: 'tersedia',
    currentTask: null,
    distance: '2.5 km',
    position: [-6.1934, 106.7883],
  },
]
