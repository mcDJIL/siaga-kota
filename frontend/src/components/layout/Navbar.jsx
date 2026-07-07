import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../../lib/cn'

const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Peta', href: '/map' },
  { label: 'Lapor', href: '/report' },
  { label: 'Edukasi', href: '#' },
  { label: 'Tentang', href: '#' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-center bg-bg-soft shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/c889e05212b1ac5462ea4f1b8445f955b693f483?width=120"
            alt="Logo SiagaKota"
            className="h-[58px] w-[60px]"
          />
          <span className="font-logo text-xl text-text-muted">SiagaKota</span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Navigasi utama">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) =>
                cn(
                  'pb-1 font-sans text-sm font-medium tracking-[0.14px]',
                  isActive ? 'border-b-2 border-brand-green text-brand-green' : 'text-text-muted hover:text-navy'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Button variant="ghost" size="sm">
            Login
          </Button>
          <Button variant="navy" size="sm">
            Daftar
          </Button>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-lg p-2 text-navy lg:hidden"
          aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 flex flex-col gap-1 border-t border-border-muted bg-bg-soft px-4 py-4 shadow-md lg:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              end={link.href === '/'}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 font-sans text-sm font-medium',
                  isActive ? 'bg-brand-green/10 text-brand-green' : 'text-text-muted hover:bg-navy/5'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <Button variant="ghost" size="sm" className="w-full">
              Login
            </Button>
            <Button variant="navy" size="sm" className="w-full">
              Daftar
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
