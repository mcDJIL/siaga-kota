import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardMap } from '../../shared/map/DashboardMap'
import { ReportMarker } from '../../shared/map/ReportMarker'
import { OfficerMarker } from '../../shared/map/OfficerMarker'
import { DispatchPolyline } from '../../shared/map/DispatchPolyline'
import { MapLegend } from '../../shared/map/MapLegend'
import { MapLayerControl } from '../../shared/map/MapLayerControl'
import { MapControlButtons } from '../components/MapControlButtons'
import { ActivitySidebar } from '../components/ActivitySidebar'
import { AssignOfficerModal } from '../components/AssignOfficerModal'
import { ACTIVE_TASKS, ACTIVE_TASKS_TOTAL, ACTIVE_TASKS_TREND } from '../data/taskData'
import { OFFICERS, OFFICERS_TOTAL } from '../data/officerData'
import { ACTIVITY_MAP_CENTER, ACTIVITY_MAP_ZOOM, MAP_LAYERS, MAP_LEGEND_ITEMS } from '../data/activityMapData'

const CATEGORY_ROUTES = { sampah: 'waste', banjir: 'flood' }

export function OfficerActivityMapPage() {
  const navigate = useNavigate()

  const [activeLayers, setActiveLayers] = useState(['sampah', 'banjir'])
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [focusPosition, setFocusPosition] = useState(null)
  const [activeTab, setActiveTab] = useState('tasks')
  const [region, setRegion] = useState('semua')
  const [status, setStatus] = useState('semua')
  const [dispatchTask, setDispatchTask] = useState(null)
  const [dispatchedOfficerByTask, setDispatchedOfficerByTask] = useState({})

  const handleToggleLayer = (layerId) => {
    setActiveLayers((current) =>
      current.includes(layerId) ? current.filter((id) => id !== layerId) : [...current, layerId]
    )
  }

  const handleSelectTask = (taskId) => {
    const task = ACTIVE_TASKS.find((item) => item.id === taskId)
    setSelectedTaskId(taskId)
    if (task) setFocusPosition(task.position)
  }

  const handleViewDetail = (task) => {
    const category = CATEGORY_ROUTES[task.category]
    navigate(`/officer/reports/${category}/${task.id}`)
  }

  const handleAssignOfficer = (officerId) => {
    if (dispatchTask) {
      setDispatchedOfficerByTask((current) => ({ ...current, [dispatchTask.id]: officerId }))
    }
    setDispatchTask(null)
  }

  const visibleTasks = ACTIVE_TASKS.filter((task) => activeLayers.includes(task.category))

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <div className="relative flex-1">
        <DashboardMap
          center={ACTIVITY_MAP_CENTER}
          zoom={ACTIVITY_MAP_ZOOM}
          focusPosition={focusPosition}
          focusZoom={15}
          showZoomControl={false}
          className="h-full w-full"
        >
          <MapControlButtons homeCenter={ACTIVITY_MAP_CENTER} homeZoom={ACTIVITY_MAP_ZOOM} />

          {activeLayers.includes('petugas') && OFFICERS.map((officer) => <OfficerMarker key={officer.id} officer={officer} />)}

          {visibleTasks.map((task) => (
            <ReportMarker key={task.id} report={task} isSelected={selectedTaskId === task.id} onSelect={handleSelectTask} />
          ))}

          {Object.entries(dispatchedOfficerByTask).map(([taskId, officerId]) => {
            const task = ACTIVE_TASKS.find((item) => item.id === taskId)
            const officer = OFFICERS.find((item) => item.id === officerId)
            return task && officer ? (
              <DispatchPolyline key={taskId} officerPosition={officer.position} taskPosition={task.position} />
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
          className="pointer-events-none absolute right-6 bottom-6 hidden flex-col gap-2 rounded-lg border border-navy/10 bg-white/90 p-3 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] backdrop-blur-md sm:flex"
        />
      </div>

      <ActivitySidebar
        tasks={visibleTasks}
        officers={OFFICERS}
        officersTotal={OFFICERS_TOTAL}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        region={region}
        onRegionChange={setRegion}
        status={status}
        onStatusChange={setStatus}
        selectedTaskId={selectedTaskId}
        onSelectTask={handleSelectTask}
        onDispatch={(taskId) => setDispatchTask(ACTIVE_TASKS.find((task) => task.id === taskId))}
        onViewDetail={handleViewDetail}
        totalTasks={ACTIVE_TASKS_TOTAL}
        tasksTrend={ACTIVE_TASKS_TREND}
      />

      <AssignOfficerModal
        isOpen={Boolean(dispatchTask)}
        task={dispatchTask}
        officers={OFFICERS}
        onClose={() => setDispatchTask(null)}
        onAssign={handleAssignOfficer}
      />
    </div>
  )
}
