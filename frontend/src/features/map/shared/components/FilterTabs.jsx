import { motion } from 'framer-motion'
import { MAP_FILTER_TABS } from '../hooks/useMapFilters'

export function FilterTabs({ activeTab, onChangeTab }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter laporan peta">
      {MAP_FILTER_TABS.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChangeTab(tab.id)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors sm:text-base ${
              isActive
                ? 'text-white'
                : 'border border-white/30 bg-white/85 text-text-body backdrop-blur-md hover:bg-white'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="map-filter-tab-underline"
                className="absolute inset-0 -z-10 rounded-full bg-navy shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]"
                transition={{ type: 'spring', duration: 0.4 }}
              />
            )}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
