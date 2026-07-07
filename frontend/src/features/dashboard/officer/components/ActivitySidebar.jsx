import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ListFilter, X } from 'lucide-react'
import { FilterPanel } from './FilterPanel'
import { TaskTabs } from './TaskTabs'
import { TaskCard } from './TaskCard'
import { OfficerCard } from './OfficerCard'
import { ActivityStatistics } from './ActivityStatistics'

function ActivitySidebarContent({
  tasks,
  officers,
  officersTotal,
  activeTab,
  onTabChange,
  region,
  onRegionChange,
  status,
  onStatusChange,
  selectedTaskId,
  onSelectTask,
  onDispatch,
  onViewDetail,
  totalTasks,
  tasksTrend,
}) {
  return (
    <div className="flex h-full flex-col">
      <FilterPanel region={region} onRegionChange={onRegionChange} status={status} onStatusChange={onStatusChange} />
      <TaskTabs activeTab={activeTab} onChange={onTabChange} officersCount={officersTotal} />

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'tasks' ? (
          <div className="flex flex-col gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isSelected={selectedTaskId === task.id}
                onSelect={onSelectTask}
                onDispatch={onDispatch}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {officers.map((officer) => (
              <OfficerCard key={officer.id} officer={officer} />
            ))}
          </div>
        )}
      </div>

      <ActivityStatistics total={totalTasks} trend={tasksTrend} />
    </div>
  )
}

export function ActivitySidebar(props) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      <aside className="hidden w-[400px] shrink-0 border-l border-border-muted bg-white lg:block">
        <ActivitySidebarContent {...props} />
      </aside>

      <button
        type="button"
        aria-label="Buka filter dan daftar tugas"
        onClick={() => setIsMobileOpen(true)}
        className="fixed right-4 bottom-4 z-30 flex items-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] lg:hidden"
      >
        <ListFilter className="h-4 w-4" aria-hidden="true" />
        Filter & Tugas
      </button>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-end bg-navy/40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[85vh] w-full flex-col rounded-t-2xl bg-white"
            >
              <div className="flex items-center justify-between p-4">
                <h2 className="text-sm font-bold text-navy">Aktivitas Petugas</h2>
                <button
                  type="button"
                  aria-label="Tutup panel aktivitas"
                  onClick={() => setIsMobileOpen(false)}
                  className="text-navy"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <ActivitySidebarContent {...props} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
