import { useState } from 'react'
import { toast } from 'sonner'
import { JEMBER_CENTER, JEMBER_ZOOM, PREDICTION_ZONES } from '../data/predictionMapData'
import { PREDICTION_STATISTICS } from '../data/predictionStatistics'

export function useFloodPrediction() {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [period] = useState('7 Hari Terakhir')

  function handleRefreshPrediction() {
    toast.success('Prediksi berhasil diperbarui.')
  }

  function handleOpenDetail() {
    setIsDetailModalOpen(true)
    toast.success('Detail prediksi berhasil dimuat.')
  }

  return {
    zones: PREDICTION_ZONES,
    mapCenter: JEMBER_CENTER,
    mapZoom: JEMBER_ZOOM,
    statistics: PREDICTION_STATISTICS,
    period,
    onRefreshPrediction: handleRefreshPrediction,
    isDetailModalOpen,
    onOpenDetail: handleOpenDetail,
    onCloseDetail: () => setIsDetailModalOpen(false),
    isExportModalOpen,
    onOpenExportModal: () => setIsExportModalOpen(true),
    onCloseExportModal: () => setIsExportModalOpen(false),
  }
}
