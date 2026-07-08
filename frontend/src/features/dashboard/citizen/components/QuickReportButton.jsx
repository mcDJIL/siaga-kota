import { useNavigate } from 'react-router-dom'
import { FloatingActionButton } from '../../shared/FloatingActionButton'

export function QuickReportButton() {
  const navigate = useNavigate()

  return <FloatingActionButton label="Buat Laporan Baru" onClick={() => navigate('/report')} />
}
