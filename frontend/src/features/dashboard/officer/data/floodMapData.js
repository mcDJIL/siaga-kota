export const FLOOD_MAP_CENTER = [-6.2088, 106.8456]
export const FLOOD_MAP_ZOOM = 12

export const FLOOD_INCIDENT_MARKERS = [
  { id: '#FL-2091', position: [-6.2241, 106.8225], location: 'Sudirman Central, Wilayah 1', waterHeight: 120 },
  { id: '#FL-2087', position: [-6.1861, 106.8021], location: 'Kanal Banjir Timur Seksi-4', waterHeight: 95 },
]

export const SENSOR_MARKERS = [
  { id: 'JKT-99', position: [-6.1934, 106.7883], label: 'Sensor JKT-99' },
  { id: 'JKT-104', position: [-6.2145, 106.8674], label: 'Sensor JKT-104' },
]

export const PRIORITY_AREA = {
  id: 'priority-1',
  position: [-6.2241, 106.8225],
  radius: 800,
  label: 'Zona Prioritas Sudirman',
}

export const MONITORING_ROUTE = {
  id: 'route-1',
  label: 'Rute Pemantauan Petugas',
  positions: [
    [-6.2088, 106.8456],
    [-6.2241, 106.8225],
  ],
}
