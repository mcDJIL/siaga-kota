import { useNavigate } from 'react-router-dom'
import { ReportTable } from '../../../shared/components/ReportTable'

export function CitizenReportTable({ reports }) {
  const navigate = useNavigate()

  function handleViewDetail(report) {
    navigate(`/citizen/reports/${report.id.replace('#', '')}`)
  }

  return <ReportTable reports={reports} onViewDetail={handleViewDetail} />
}
