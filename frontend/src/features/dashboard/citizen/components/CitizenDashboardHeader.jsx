import { CitizenPointsCard } from './CitizenPointsCard'

export function CitizenDashboardHeader({ name, points }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-[32px]">
          Selamat Datang, {name}!
        </h1>
        <p className="text-base text-text-muted">Pantau kondisi kota dan kontribusi laporanmu hari ini.</p>
      </div>
      <CitizenPointsCard points={points} />
    </header>
  )
}
