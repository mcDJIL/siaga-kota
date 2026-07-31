import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { DashboardMap } from '../../shared/map/DashboardMap'
import { ReportMarker } from '../../shared/map/ReportMarker'
import { OfficerMarker } from '../../shared/map/OfficerMarker'
import { UserMarker } from '../../shared/map/UserMarker'
import { DispatchPolyline } from '../../shared/map/DispatchPolyline'
import { MapLegend } from '../../shared/map/MapLegend'
import { MapLayerControl } from '../../shared/map/MapLayerControl'
import { MapControlButtons } from '../components/MapControlButtons'
import { ActivitySidebar } from '../components/ActivitySidebar'
import { AssignOfficerModal } from '../components/AssignOfficerModal'
import { MapLoadingSkeleton } from '../components/MapLoadingSkeleton'
import { ActivityMapSkeleton } from '../components/ActivityMapSkeleton'
import { useActivityMapTasks, useActivityMapOfficers, useAssignOfficer } from '../hooks/useActivityMapData'
import { useGeolocation } from '../hooks/useGeolocation'
import { ACTIVITY_MAP_CENTER, ACTIVITY_MAP_ZOOM, MAP_LAYERS, MAP_LEGEND_ITEMS } from '../data/activityMapData'

const CATEGORY_ROUTES = { sampah: 'waste', banjir: 'flood' }

export function OfficerActivityMapPage() {
  const navigate = useNavigate()

  // Geolocation hook to center map on user location
  const { location: userLocation, error: geoError, loading: geoLoading } = useGeolocation()

  // Hooks for data fetching
  const [region, setRegion] = useState('semua')
  const [status, setStatus] = useState('semua')
  const [category, setCategory] = useState('')
  const { tasks: allTasks, loading: tasksLoading, refetch: refetchTasks } = useActivityMapTasks({
    region,
    status,
    category,
  })
  const { officers, loading: officersLoading, refetch: refetchOfficers } = useActivityMapOfficers()
  const { assign: assignOfficerApi, assigning } = useAssignOfficer()

  // Local state
  const [activeLayers, setActiveLayers] = useState(['sampah', 'banjir'])
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  // Set initial map center from user location or default center
  const [mapCenter, setMapCenter] = useState(ACTIVITY_MAP_CENTER)
  const [focusPosition, setFocusPosition] = useState(null)
  const [activeTab, setActiveTab] = useState('tasks')
  const [dispatchTask, setDispatchTask] = useState(null)
  const [dispatchedOfficerByTask, setDispatchedOfficerByTask] = useState({})

  // Update map center when user location is obtained
  useEffect(() => {
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      setMapCenter([userLocation.latitude, userLocation.longitude])
    }
  }, [userLocation])

  const handleToggleLayer = (layerId) => {
    setActiveLayers((current) =>
      current.includes(layerId) ? current.filter((id) => id !== layerId) : [...current, layerId]
    )
  }

  const handleSelectTask = (taskId) => {
    const task = allTasks.find((item) => item.id === taskId)
    setSelectedTaskId(taskId)
    if (task && task.latitude && task.longitude) {
      setFocusPosition([task.latitude, task.longitude])
    }
  }

  const handleViewDetail = (task) => {
    const categorySlug = task.category?.slug || task.category
    const category = CATEGORY_ROUTES[categorySlug]
    navigate(`/officer/reports/${category}/${task.id}`)
  }

  const handleAssignOfficer = async (officerId) => {
    if (!dispatchTask) return

    try {
      await assignOfficerApi(dispatchTask.id, officerId)
      toast.success('Petugas berhasil ditugaskan')
      setDispatchedOfficerByTask((current) => ({ ...current, [dispatchTask.id]: officerId }))
      refetchTasks()
      refetchOfficers()
    } catch (err) {
      toast.error(err.message || 'Gagal menugaskan petugas')
    } finally {
      setDispatchTask(null)
    }
  }

  const visibleTasks = allTasks.filter((task) => {
    const categorySlug = task.category?.slug || task.category
    return categorySlug && activeLayers.includes(categorySlug)
  })

  // Map task position
  const mapTasksWithPosition = visibleTasks.map((task) => ({
    ...task,
    position: [task.latitude || 0, task.longitude || 0],
  }))

  // Show skeleton when either tasks or officers are loading (initial load)
  const isInitialLoading = tasksLoading || officersLoading

  if (isInitialLoading) {
    return <ActivityMapSkeleton />
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <div className="relative flex-1">
        {tasksLoading && <MapLoadingSkeleton />}
        <DashboardMap
          center={mapCenter}
          zoom={ACTIVITY_MAP_ZOOM}
          focusPosition={focusPosition}
          focusZoom={15}
          showZoomControl={false}
          className="h-full w-full z-10"
        >
          <MapControlButtons homeCenter={ACTIVITY_MAP_CENTER} homeZoom={ACTIVITY_MAP_ZOOM} userLocation={userLocation} />

          {userLocation && (
            <UserMarker position={[userLocation.latitude, userLocation.longitude]} accuracy={userLocation.accuracy} />
          )}

          {activeLayers.includes('petugas') && officers.map((officer) => (
            <OfficerMarker
              key={officer.id}
              officer={{
                id: officer.id,
                name: officer.name,
                position: [officer.latitude || 0, officer.longitude || 0],
                status: officer.status,
              }}
            />
          ))}

          {mapTasksWithPosition.map((task) => (
            <ReportMarker key={task.id} report={task} isSelected={selectedTaskId === task.id} onSelect={handleSelectTask} />
          ))}

          {Object.entries(dispatchedOfficerByTask).map(([taskId, officerId]) => {
            const task = mapTasksWithPosition.find((item) => item.id === taskId)
            const officer = officers.find((item) => item.id === officerId)
            return task && officer ? (
              <DispatchPolyline
                key={taskId}
                officerPosition={[officer.latitude || 0, officer.longitude || 0]}
                taskPosition={[task.latitude || 0, task.longitude || 0]}
              />
            ) : null
          })}
        </DashboardMap>

        <MapLayerControl
          layers={MAP_LAYERS}
          activeLayers={activeLayers}
          onToggle={handleToggleLayer}
          className="bottom-6 left-6"
        />

        <MapLegend
          items={MAP_LEGEND_ITEMS}
          showSyncStatus={false}
          className="z-[400] pointer-events-none absolute right-6 bottom-6 hidden flex-col gap-2 rounded-lg border border-navy/10 bg-white/90 p-3 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] backdrop-blur-md sm:flex"
        />
      </div>

      <ActivitySidebar
        tasks={mapTasksWithPosition}
        officers={officers}
        officersTotal={officers.length}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        region={region}
        onRegionChange={setRegion}
        status={status}
        onStatusChange={setStatus}
        selectedTaskId={selectedTaskId}
        onSelectTask={handleSelectTask}
        onDispatch={(taskId) => setDispatchTask(mapTasksWithPosition.find((task) => task.id === taskId))}
        onViewDetail={handleViewDetail}
        totalTasks={allTasks.length}
        tasksTrend="+2"
        tasksLoading={tasksLoading}
        officersLoading={officersLoading}
      />

      <AssignOfficerModal
        isOpen={Boolean(dispatchTask)}
        task={dispatchTask}
        officers={officers}
        onClose={() => setDispatchTask(null)}
        onAssign={handleAssignOfficer}
        isLoading={assigning}
      />
    </div>
  )
}
