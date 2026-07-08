import { Award, ClipboardCheck, Droplets, GraduationCap, ShieldCheck, Trash2 } from 'lucide-react'

export const CITIZEN_PROFILE_DATA = {
  fullName: 'Budi Santoso',
  role: 'Citizen Responder',
  email: 'budi.santoso@email.com',
  phone: '+62 812 3456 7890',
  avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/a38dc99574d343b750982753e861f0d9993d4540?width=240',
}

export const NOTIFICATION_SETTINGS = [
  {
    id: 'critical-flood-alerts',
    title: 'Critical Flood Alerts',
    description: 'Immediate push notifications for water level warnings.',
    enabled: true,
  },
  {
    id: 'community-updates',
    title: 'Community Updates',
    description: 'Weekly digest of nearby reports and city news.',
    enabled: false,
  },
  {
    id: 'email-summaries',
    title: 'Email Summaries',
    description: 'Receive incident reports directly in your inbox.',
    enabled: true,
  },
]

export const CONTRIBUTION_BADGES = [
  {
    id: 'pelapor-pertama',
    label: 'Pelapor Pertama',
    icon: Award,
    description: 'Diberikan kepada warga yang mengirimkan laporan pertamanya.',
    requirement: 'Kirim 1 laporan terverifikasi.',
    earnDate: '12 Jan 2024',
  },
  {
    id: 'pahlawan-kebersihan',
    label: 'Pahlawan Kebersihan',
    icon: Trash2,
    description: 'Diberikan kepada warga yang aktif melaporkan tumpukan sampah.',
    requirement: 'Kirim 10 laporan sampah terverifikasi.',
    earnDate: '03 Mar 2024',
  },
  {
    id: 'siaga-banjir',
    label: 'Siaga Banjir',
    icon: Droplets,
    description: 'Diberikan kepada warga yang aktif melaporkan kondisi banjir.',
    requirement: 'Kirim 5 laporan banjir terverifikasi.',
    earnDate: '18 Jun 2024',
  },
]

export const RECENT_POINT_ACTIVITY = [
  { id: 'lapor-sampah', label: 'Lapor Sampah', icon: Trash2, points: 10, date: '24 Okt 2024' },
  { id: 'kuis-edukasi', label: 'Kuis Edukasi', icon: GraduationCap, points: 5, date: '22 Okt 2024' },
  { id: 'validasi-laporan', label: 'Validasi Laporan', icon: ClipboardCheck, points: 8, date: '20 Okt 2024' },
]

export const COMMUNITY_RANKINGS = [
  { rank: 11, name: 'Andi Wijaya', points: 1250, isCurrentUser: false },
  { rank: 12, name: 'User (Anda)', points: 1180, isCurrentUser: true },
]

export const ACTIVITY_RANK = {
  rank: 12,
  area: 'Jakarta Selatan',
  progress: 68,
  description: 'Top 15% most active reporting citizen',
}

export const CONTRIBUTION_STATS = [
  { id: 'laporan-terverifikasi', label: 'Laporan Terverifikasi', value: 95 },
  { id: 'keakuratan-lokasi', label: 'Keakuratan Lokasi', value: 100 },
  { id: 'respon-kuis', label: 'Respon Kuis', value: 88 },
]

export const VERIFIED_BADGE_ICON = ShieldCheck
