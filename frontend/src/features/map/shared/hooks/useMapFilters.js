import { useState } from 'react'

export const MAP_FILTER_TABS = [
  { id: 'last24h', label: 'Last 24h' },
  { id: 'all', label: 'All Categories' },
  { id: 'inProgress', label: 'In Progress' },
]

const DEFAULT_ADVANCED_FILTERS = {
  priority: 'all',
  status: 'all',
}

export function useMapFilters() {
  const [activeTab, setActiveTab] = useState('all')
  const [advancedFilters, setAdvancedFilters] = useState(DEFAULT_ADVANCED_FILTERS)

  function setAdvancedFilter(key, value) {
    setAdvancedFilters((prev) => ({ ...prev, [key]: value }))
  }

  return { activeTab, setActiveTab, advancedFilters, setAdvancedFilter }
}
