const FOOTER_LINKS = ['Kebijakan Privasi', 'Syarat & Ketentuan', 'Bantuan']

export function AuthFooter() {
  return (
    <footer className="flex flex-col items-center gap-2 pb-6">
      <nav className="flex items-center gap-3" aria-label="Tautan bantuan">
        {FOOTER_LINKS.map((link, index) => (
          <span key={link} className="flex items-center gap-3">
            <a href="#" className="text-xs font-semibold tracking-[0.6px] text-text-muted hover:text-navy">
              {link}
            </a>
            {index < FOOTER_LINKS.length - 1 && <span className="text-xs text-text-muted/30">•</span>}
          </span>
        ))}
      </nav>
      <p className="text-[10px] font-semibold tracking-[0.5px] text-badge-neutral uppercase">
        © 2026 SiagaKota City Management
      </p>
    </footer>
  )
}
