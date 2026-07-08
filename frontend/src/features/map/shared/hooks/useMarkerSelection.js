import { useState } from 'react'

export function useMarkerSelection() {
  const [selectedObject, setSelectedObject] = useState(null)

  function selectObject(object) {
    setSelectedObject(object)
  }

  function clearSelection() {
    setSelectedObject(null)
  }

  return { selectedObject, selectObject, clearSelection }
}
