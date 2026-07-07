const FOOTER_COLUMNS = [
  {
    title: 'Layanan',
    links: ['Waste Tracking', 'Flood Map', 'Early Warning'],
  },
  {
    title: 'Perusahaan',
    links: ['Privacy Policy', 'Terms of Service', 'Contact Support', 'Environmental Impact'],
  },
]

export function Footer() {
  return (
    <footer className="bg-navy px-4 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 lg:max-w-sm">
          <a href="#" className="flex items-center gap-3">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/fa9751ff3d1ae63db2e9fef5751ea1b59827fef7?width=82"
              alt="Logo SiagaKota"
              className="h-[38px] w-[41px]"
            />
            <span className="font-heading text-2xl font-semibold text-white">SiagaKota</span>
          </a>
          <p className="text-base leading-6 text-navy-lighter/80">
            © 2026 SiagaKota. AI-Driven Flood Mitigation & Waste Management. Memberdayakan masyarakat untuk kota
            yang lebih aman.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 sm:gap-24">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-2">
              <h4 className="font-sans text-sm font-medium tracking-[0.14px] text-brand-green-lighter">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-base leading-6 text-navy-lighter/80 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
