import { motion } from 'framer-motion'
import { cn } from '../../../../../lib/cn'

export function NotificationTabs({ tabs, activeTab, onChange }) {
  return (
    <div
      className="flex items-start gap-6 overflow-x-auto border-b border-border-muted sm:gap-8"
      role="tablist"
      aria-label="Kategori notifikasi"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative shrink-0 px-1 pb-4 text-sm font-medium tracking-[0.14px] whitespace-nowrap transition-colors',
              isActive ? 'text-navy' : 'text-text-muted hover:text-navy'
            )}
          >
            {tab.label}
            {isActive && (
              <motion.span
                layoutId="notification-tab-underline"
                className="absolute right-0 bottom-0 left-0 h-0.5 bg-navy"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
