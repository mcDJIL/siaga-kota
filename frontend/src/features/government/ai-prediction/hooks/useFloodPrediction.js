import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { getFloodPredictions } from '../../../../services/ai-prediction.service'
import { JEMBER_CENTER, JEMBER_ZOOM } from '../data/predictionMapData'
import { PREDICTION_STATISTICS } from '../data/predictionStatistics'

function buildCirclePolygon(center, radiusDeg, points = 24) {
  const coords = []
  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2
    coords.push([center[0] + Math.sin(angle) * radiusDeg, center[1] + Math.cos(angle) * radiusDeg * 1.15])
  }
  return coords
}

function toZone(prediction) {
  const center = prediction.center || JEMBER_CENTER
  return {
    id: prediction.id,
    district: prediction.district,
    riskLevel: prediction.riskLevel,
    prediction: Math.round(prediction.riskScore || 0),
    expectedRainfall: prediction.expectedRainfall,
    floodHeight: prediction.floodHeight,
    affectedPopulation: prediction.affectedPopulation,
    recommendedAction: prediction.recommendedAction,
    lastUpdated: prediction.lastUpdated,
    center,
    polygon: buildCirclePolygon(center, prediction.riskLevel === 'high' ? 0.015 : prediction.riskLevel === 'medium' ? 0.012 : 0.009),
  }
}

function toRecommendation(prediction) {
  return {
    id: prediction.id,
    district: prediction.district,
    sector: `Confidence ${Math.round((prediction.confidence || 0) * 100)}%`,
    riskLevel: prediction.riskLevel,
    riskPercentage: Math.round(prediction.riskScore || 0),
    recommendation: prediction.recommendedAction,
    deadline: prediction.riskLevel === 'high' ? '12 Jam' : prediction.riskLevel === 'medium' ? '3 Hari' : '7 Hari',
    deadlineUrgent: prediction.riskLevel === 'high',
    assignedOfficer: null,
    features: prediction.features,
  }
}

export function useFloodPrediction() {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [period] = useState('7 Hari Terakhir')
  const [predictions, setPredictions] = useState([])
  const [statistics, setStatistics] = useState(PREDICTION_STATISTICS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPredictions()
  }, [])

  async function fetchPredictions() {
    try {
      setIsLoading(true)
      const response = await getFloodPredictions()
      setPredictions(response.data?.predictions || [])
      setStatistics(response.data?.statistics || PREDICTION_STATISTICS)
    } catch (error) {
      console.error('Error loading flood predictions:', error)
      toast.error(error.message || 'Gagal memuat prediksi banjir')
    } finally {
      setIsLoading(false)
    }
  }

  const zones = useMemo(() => predictions.map(toZone), [predictions])
  const recommendations = useMemo(() => predictions.map(toRecommendation), [predictions])

  function handleRefreshPrediction() {
    fetchPredictions()
    toast.success('Prediksi berhasil diperbarui.')
  }

  function handleOpenDetail() {
    setIsDetailModalOpen(true)
    toast.success('Detail prediksi berhasil dimuat.')
  }

  return {
    zones,
    recommendations,
    mapCenter: JEMBER_CENTER,
    mapZoom: JEMBER_ZOOM,
    statistics,
    period,
    isLoading,
    onRefreshPrediction: handleRefreshPrediction,
    isDetailModalOpen,
    onOpenDetail: handleOpenDetail,
    onCloseDetail: () => setIsDetailModalOpen(false),
    isExportModalOpen,
    onOpenExportModal: () => setIsExportModalOpen(true),
    onCloseExportModal: () => setIsExportModalOpen(false),
  }
}
