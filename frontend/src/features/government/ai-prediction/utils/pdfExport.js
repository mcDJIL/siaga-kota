import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportPredictionReport({ mapElement, statistics, recommendations, generatedAt }) {
  const canvas = await html2canvas(mapElement, { useCORS: true, scale: 2 })
  const imageData = canvas.toDataURL('image/png')

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const margin = 40

  pdf.setFontSize(18)
  pdf.setTextColor('#002045')
  pdf.text('SiagaKota - AI Flood Prediction Report', margin, 50)

  pdf.setFontSize(10)
  pdf.setTextColor('#43474E')
  pdf.text(`Prediction Date: ${generatedAt.toLocaleDateString('id-ID')}`, margin, 70)
  pdf.text(`Area Berisiko: ${statistics.areaAtRisk.value} | Rata-rata Risiko: ${statistics.averageRisk.value}%`, margin, 85)

  const imageWidth = pageWidth - margin * 2
  const imageHeight = (canvas.height / canvas.width) * imageWidth
  pdf.addImage(imageData, 'PNG', margin, 105, imageWidth, imageHeight)

  let cursorY = 105 + imageHeight + 30
  pdf.setFontSize(13)
  pdf.setTextColor('#002045')
  pdf.text('Priority Recommendations', margin, cursorY)
  cursorY += 20

  pdf.setFontSize(10)
  pdf.setTextColor('#43474E')
  recommendations.forEach((item) => {
    pdf.text(`${item.district} - ${item.riskPercentage}% - ${item.recommendation}`, margin, cursorY)
    cursorY += 16
  })

  cursorY += 10
  pdf.setFontSize(9)
  pdf.setTextColor('#74777F')
  pdf.text(`Generated: ${generatedAt.toLocaleString('id-ID')}`, margin, cursorY)

  pdf.save('Government-AI-Prediction.pdf')
}
