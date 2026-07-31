import { useState } from 'react'
import { MapContainer as LeafletMap, TileLayer, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapMarker } from './MapMarker'
import { MapPolygon } from './MapPolygon'
import { MapRoute } from './MapRoute'
import { MapControls } from './MapControls'
import {
  wasteReports,
  drainageIssues,
  wasteBanks,
  floodPredictionAreas,
  evacuationRoutes,
  mapCenter,
  mapZoom,
} from '../data/mapData'

function WasteLayer() {
  return (
    <LayerGroup>
      {wasteReports.map((report) => (
        <MapMarker key={report.id} position={report.position} color="#006D40" title={report.title} description={report.status} />
      ))}
    </LayerGroup>
  )
}

function DrainageLayer() {
  return (
    <LayerGroup>
      {drainageIssues.map((issue) => (
        <MapMarker key={issue.id} position={issue.position} color="#715C00" title={issue.title} description={issue.status} />
      ))}
    </LayerGroup>
  )
}

function FloodPredictionLayer() {
  return (
    <LayerGroup>
      {floodPredictionAreas.map((area) => (
        <MapPolygon key={area.id} positions={area.positions} />
      ))}
    </LayerGroup>
  )
}

function WasteBankLayer() {
  return (
    <LayerGroup>
      {wasteBanks.map((bank) => (
        <MapMarker key={bank.id} position={bank.position} color="#74DB9D" radius={11} title={bank.name} />
      ))}
    </LayerGroup>
  )
}

function EvacuationLayer() {
  return (
    <LayerGroup>
      {evacuationRoutes.map((route) => (
        <MapRoute key={route.id} positions={route.positions} />
      ))}
    </LayerGroup>
  )
}

export function MapContainer() {
  const [map, setMap] = useState(null)

  return (
    <div className="relative h-full w-full z-10">
      <LeafletMap
        ref={setMap}
        center={mapCenter}
        zoom={mapZoom}
        zoomControl={false}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <FloodPredictionLayer />
        <EvacuationLayer />
        <WasteLayer />
        <DrainageLayer />
        <WasteBankLayer />
      </LeafletMap>

      <MapControls map={map} />
    </div>
  )
}
