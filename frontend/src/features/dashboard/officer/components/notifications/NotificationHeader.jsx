export function NotificationHeader({ unreadCount }) {
  return (
    <div className="flex flex-col gap-1 pb-2">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-heading text-2xl font-semibold tracking-[-0.4px] text-navy sm:text-[32px] sm:leading-10 sm:tracking-[-0.8px]">
          Notifikasi
        </h1>
        {unreadCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-[#BA1A1A] px-2.5 py-1 text-xs font-bold text-white">
            {unreadCount} baru
          </span>
        )}
      </div>
      <p className="text-base text-text-muted">
        Pantau pembaruan sistem, laporan masuk, dan status penanganan terkini.
      </p>
    </div>
  )
}
