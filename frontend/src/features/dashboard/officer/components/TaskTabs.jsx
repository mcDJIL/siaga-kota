import { motion } from 'framer-motion'
import { cn } from '../../../../lib/cn'

export function TaskTabs({ activeTab, onChange, officersCount }) {
  const tabs = [
    { id: 'tasks', label: 'Tugas Aktif' },
    { id: 'officers', label: `Petugas (${officersCount})` },
  ]

  return (
    <div className="flex border-b border-border-muted" role="tablist" aria-label="Tab aktivitas petugas">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'relative flex-1 py-3 text-center text-sm',
            activeTab === tab.id ? 'font-bold text-navy' : 'font-medium text-text-muted'
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.span
              layoutId="activity-tab-underline"
              className="absolute inset-x-0 bottom-0 h-0.5 bg-navy"
              transition={{ duration: 0.25 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
