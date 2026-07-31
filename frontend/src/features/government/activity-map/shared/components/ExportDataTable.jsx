export function ExportDataTable({ activeLayer, wasteMarkers, floodMarkers, districts }) {
  return (
    <div className="bg-white p-8 print:p-4">
      <div className="mb-6 print:mb-4">
        <h1 className="text-3xl font-bold text-navy print:text-2xl">SiagaKota Activity Report</h1>
        <p className="text-sm text-text-muted">Generated on {new Date().toLocaleDateString('id-ID')} at {new Date().toLocaleTimeString('id-ID')}</p>
      </div>

      {(activeLayer === 'waste' || activeLayer === 'both') && (
        <div className="mb-8 print:mb-6">
          <h2 className="text-xl font-semibold text-navy mb-4 print:text-lg print:mb-2">Waste Reports</h2>
          <table className="w-full border-collapse border border-border-muted">
            <thead className="bg-bg-blue-lighter">
              <tr>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Title
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Location
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Category
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Status
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Risk Level
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {wasteMarkers.length > 0 ? (
                wasteMarkers.map((marker) => (
                  <tr key={marker.id}>
                    <td className="border border-border-muted px-4 py-2 text-sm print:p-1 print:text-xs">
                      {marker.title}
                    </td>
                    <td className="border border-border-muted px-4 py-2 text-sm print:p-1 print:text-xs">
                      {marker.location}
                    </td>
                    <td className="border border-border-muted px-4 py-2 text-sm print:p-1 print:text-xs">
                      {marker.category || '-'}
                    </td>
                    <td className="border border-border-muted px-4 py-2 text-sm capitalize print:p-1 print:text-xs">
                      {marker.status}
                    </td>
                    <td className="border border-border-muted px-4 py-2 text-sm font-semibold print:p-1 print:text-xs">
                      <span
                        className={
                          marker.riskLevel === 'Tinggi'
                            ? 'text-red-600'
                            : marker.riskLevel === 'Sedang'
                              ? 'text-amber-600'
                              : 'text-green-600'
                        }
                      >
                        {marker.riskLevel}
                      </span>
                    </td>
                    <td className="border border-border-muted px-4 py-2 text-sm print:p-1 print:text-xs">
                      {marker.createdAt}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border border-border-muted px-4 py-2 text-center text-sm text-text-muted print:p-1">
                    No waste reports
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {(activeLayer === 'flood' || activeLayer === 'both') && (
        <div className="mb-8 print:mb-6">
          <h2 className="text-xl font-semibold text-navy mb-4 print:text-lg print:mb-2">Flood Reports</h2>
          <table className="w-full border-collapse border border-border-muted">
            <thead className="bg-bg-blue-lighter">
              <tr>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Title
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Location
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Category
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Water Level
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Status
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Risk Level
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {floodMarkers.length > 0 ? (
                floodMarkers.map((marker) => (
                  <tr key={marker.id}>
                    <td className="border border-border-muted px-4 py-2 text-sm print:p-1 print:text-xs">
                      {marker.title}
                    </td>
                    <td className="border border-border-muted px-4 py-2 text-sm print:p-1 print:text-xs">
                      {marker.location}
                    </td>
                    <td className="border border-border-muted px-4 py-2 text-sm print:p-1 print:text-xs">
                      {marker.category || '-'}
                    </td>
                    <td className="border border-border-muted px-4 py-2 text-sm print:p-1 print:text-xs">
                      {marker.waterLevel ? `${marker.waterLevel} cm` : '-'}
                    </td>
                    <td className="border border-border-muted px-4 py-2 text-sm capitalize print:p-1 print:text-xs">
                      {marker.status}
                    </td>
                    <td className="border border-border-muted px-4 py-2 text-sm font-semibold print:p-1 print:text-xs">
                      <span
                        className={
                          marker.riskLevel === 'Tinggi'
                            ? 'text-red-600'
                            : marker.riskLevel === 'Sedang'
                              ? 'text-amber-600'
                              : 'text-green-600'
                        }
                      >
                        {marker.riskLevel}
                      </span>
                    </td>
                    <td className="border border-border-muted px-4 py-2 text-sm print:p-1 print:text-xs">
                      {marker.createdAt}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="border border-border-muted px-4 py-2 text-center text-sm text-text-muted print:p-1">
                    No flood reports
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {districts && districts.length > 0 && (
        <div className="print:mb-6">
          <h2 className="text-xl font-semibold text-navy mb-4 print:text-lg print:mb-2">District Summary</h2>
          <table className="w-full border-collapse border border-border-muted">
            <thead className="bg-bg-blue-lighter">
              <tr>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  District
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Status
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Risk Score
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Waste Reports
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Flood Reports
                </th>
                <th className="border border-border-muted px-4 py-2 text-left text-sm font-semibold text-navy print:p-1 print:text-xs">
                  Action Required
                </th>
              </tr>
            </thead>
            <tbody>
              {districts.map((district) => (
                <tr key={district.id}>
                  <td className="border border-border-muted px-4 py-2 text-sm font-medium print:p-1 print:text-xs">
                    {district.name}
                  </td>
                  <td className="border border-border-muted px-4 py-2 text-sm capitalize print:p-1 print:text-xs">
                    {district.status}
                  </td>
                  <td className="border border-border-muted px-4 py-2 text-sm font-semibold print:p-1 print:text-xs">
                    {district.riskScore}
                  </td>
                  <td className="border border-border-muted px-4 py-2 text-sm print:p-1 print:text-xs">
                    {district.wasteCount}
                  </td>
                  <td className="border border-border-muted px-4 py-2 text-sm print:p-1 print:text-xs">
                    {district.floodCount}
                  </td>
                  <td className="border border-border-muted px-4 py-2 text-sm print:p-1 print:text-xs">
                    {district.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
