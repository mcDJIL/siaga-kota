import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportHeatmapReport({ mapElement, layer, districts, generatedAt }) {
  const canvas = await html2canvas(mapElement, { useCORS: true, scale: 2 })
  const imageData = canvas.toDataURL('image/png')

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const margin = 40

  pdf.setFontSize(18)
  pdf.setTextColor('#002045')
  pdf.text('SiagaKota - Government Heatmap Report', margin, 50)

  pdf.setFontSize(10)
  pdf.setTextColor('#43474E')
  pdf.text(`Export Date: ${generatedAt.toLocaleDateString('id-ID')}`, margin, 70)
  pdf.text(`Selected Layer: ${layer}`, margin, 85)

  const imageWidth = pageWidth - margin * 2
  const imageHeight = (canvas.height / canvas.width) * imageWidth
  pdf.addImage(imageData, 'PNG', margin, 105, imageWidth, imageHeight)

  let cursorY = 105 + imageHeight + 30
  pdf.setFontSize(13)
  pdf.setTextColor('#002045')
  pdf.text('High Risk District Summary', margin, cursorY)
  cursorY += 20

  pdf.setFontSize(10)
  pdf.setTextColor('#43474E')
  districts.forEach((district) => {
    pdf.text(`${district.name} - ${district.status} (${district.riskScore}%) - ${district.action}`, margin, cursorY)
    cursorY += 16
  })

  cursorY += 10
  pdf.setFontSize(9)
  pdf.setTextColor('#74777F')
  pdf.text(`Generated: ${generatedAt.toLocaleString('id-ID')}`, margin, cursorY)

  pdf.save('Government-Heatmap-Report.pdf')
}
