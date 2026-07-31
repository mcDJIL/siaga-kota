import React, { createContext, useContext } from 'react'
import { useOfficerDashboardData } from '../hooks/useOfficerDashboardData'

const DashboardContext = createContext()

export function DashboardProvider({ children }) {
  const dashboardData = useOfficerDashboardData()

  return <DashboardContext.Provider value={dashboardData}>{children}</DashboardContext.Provider>
}

export function useDashboardContext() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboardContext must be used within DashboardProvider')
  }
  return context
}
