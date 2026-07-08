import { useMemo, useState } from 'react'
import { searchMapObjects } from '../utils/markerHelpers'

export function useMapSearch(searchIndex) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => searchMapObjects(searchIndex, query), [searchIndex, query])

  function clearSearch() {
    setQuery('')
  }

  return { query, setQuery, results, clearSearch }
}
