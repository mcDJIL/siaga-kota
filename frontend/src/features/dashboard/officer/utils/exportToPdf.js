import jsPDF from 'jspdf'

export function exportWasteReportsToPdf(reports, fileName = 'laporan-sampah') {
  const doc = new jsPDF('l', 'mm', 'a4')
  
  // Header
  doc.setFontSize(16)
  doc.text('Laporan Sampah', 14, 15)
  
  // Date
  doc.setFontSize(10)
  const now = new Date()
  const formattedDate = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  doc.text(`Tanggal: ${formattedDate}`, 14, 22)
  
  // Table headers
  const headers = ['ID', 'Judul', 'Lokasi', 'Prioritas', 'Status', 'Tanggal']
  const columnWidths = [20, 40, 40, 25, 25, 25]
  
  // Draw table header
  doc.setFillColor(26, 54, 93)
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.setFont(undefined, 'bold')
  
  let xPos = 14
  let yPos = 30
  
  headers.forEach((header, index) => {
    doc.rect(xPos, yPos, columnWidths[index], 8, 'F')
    doc.text(header, xPos + 2, yPos + 5.5, { align: 'left' })
    xPos += columnWidths[index]
  })
  
  // Draw table rows
  doc.setTextColor(50, 50, 50)
  doc.setFont(undefined, 'normal')
  doc.setFontSize(9)
  
  yPos = 38
  const rowHeight = 8
  
  reports.forEach((report, rowIndex) => {
    // Alternate row colors
    if (rowIndex % 2 === 0) {
      doc.setFillColor(245, 247, 255)
      doc.rect(14, yPos - 2, 235, rowHeight, 'F')
    }
    
    const rowData = [
      report.code,
      report.title,
      report.location,
      getPriorityLabel(report.priority),
      getStatusLabel(report.status),
      report.date,
    ]
    
    xPos = 14
    rowData.forEach((cell, colIndex) => {
      const text = String(cell).substring(0, 30) // Limit text length
      doc.text(text, xPos + 2, yPos + 5)
      xPos += columnWidths[colIndex]
    })
    
    yPos += rowHeight
    
    // New page if needed
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
  })
  
  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.text(
      `Halaman ${i} dari ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }
  
  // Save PDF
  doc.save(`${fileName}-${now.getTime()}.pdf`)
}

function getPriorityLabel(priority) {
  const labels = {
    'rendah': 'Rendah',
    'sedang': 'Sedang',
    'tinggi': 'Tinggi',
    'mendesak': 'Mendesak',
  }
  return labels[priority] || priority
}

function getStatusLabel(status) {
  const labels = {
    'menunggu': 'Menunggu',
    'diverifikasi': 'Terverifikasi',
    'diproses': 'Sedang Diproses',
    'selesai': 'Selesai',
    'ditolak': 'Ditolak',
  }
  return labels[status] || status
}
