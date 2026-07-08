export const leaderboardDataByTab = {
  rw: [
    { rank: 1, region: 'RW 03 - Kel. Menteng', points: 45820, trees: 42, members: 128, isCurrentUnit: false },
    { rank: 2, region: 'RW 05 - Kel. Menteng', points: 42150, trees: 38, members: 114, isCurrentUnit: true },
    { rank: 3, region: 'RW 01 - Kel. Menteng', points: 38900, trees: 35, members: 102, isCurrentUnit: false },
    { rank: 4, region: 'RW 07 - Kel. Menteng', points: 31200, trees: 29, members: 96, isCurrentUnit: false },
    { rank: 5, region: 'RW 02 - Kel. Menteng', points: 27650, trees: 24, members: 88, isCurrentUnit: false },
    { rank: 6, region: 'RW 04 - Kel. Menteng', points: 24100, trees: 20, members: 80, isCurrentUnit: false },
  ],
  kelurahan: [
    { rank: 1, region: 'Kel. Menteng', points: 210500, trees: 168, members: 612, isCurrentUnit: true },
    { rank: 2, region: 'Kel. Gondangdia', points: 187300, trees: 142, members: 540, isCurrentUnit: false },
    { rank: 3, region: 'Kel. Cikini', points: 165900, trees: 130, members: 498, isCurrentUnit: false },
    { rank: 4, region: 'Kel. Kebon Sirih', points: 142000, trees: 110, members: 460, isCurrentUnit: false },
  ],
}

export const regionDetailData = {
  'RW 05 - Kel. Menteng': {
    totalMembers: 114,
    treesPlanted: 38,
    topContributors: [
      { name: 'Andi Wijaya', points: 4200 },
      { name: 'Siti Rahma', points: 3850 },
      { name: 'Budi Santoso', points: 3400 },
    ],
    achievements: ['Zero Genangan 3 Bulan', 'Juara 2 Kampung Bersih 2023'],
    monthlyProgress: [
      { month: 'Mei', points: 5200 },
      { month: 'Jun', points: 6100 },
      { month: 'Jul', points: 7400 },
      { month: 'Agu', points: 8300 },
      { month: 'Sep', points: 7100 },
      { month: 'Okt', points: 8050 },
    ],
  },
}

export function getRegionDetail(regionName) {
  return (
    regionDetailData[regionName] ?? {
      totalMembers: 80,
      treesPlanted: 18,
      topContributors: [
        { name: 'Warga Aktif 1', points: 2100 },
        { name: 'Warga Aktif 2', points: 1800 },
        { name: 'Warga Aktif 3', points: 1500 },
      ],
      achievements: ['Kontributor Aktif Bulan Ini'],
      monthlyProgress: [
        { month: 'Mei', points: 2200 },
        { month: 'Jun', points: 2600 },
        { month: 'Jul', points: 3100 },
        { month: 'Agu', points: 3400 },
        { month: 'Sep', points: 3000 },
        { month: 'Okt', points: 3600 },
      ],
    }
  )
}
