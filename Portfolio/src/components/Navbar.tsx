import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'Projects', to: '/projects' },
  { label: 'Certificates', to: '/certificates' },
  { label: 'Contact', to: '/contact' },
] as const

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-full px-3 py-1 transition-[color,filter,background-color] duration-200',
      'hover:text-primary',
      'hover:[filter:drop-shadow(0_0_10px_var(--primary))_drop-shadow(0_0_22px_var(--primary))]',
      isActive ? 'bg-accent text-accent-foreground' : '',
    ].join(' ')

  const mobileLinkClassName = ({ isActive }: { isActive: boolean }) =>
    [
      'block w-full rounded-xl px-4 py-2 text-left transition-[color,filter,background-color] duration-200',
      'hover:text-primary hover:bg-accent/60',
      'hover:[filter:drop-shadow(0_0_10px_var(--primary))_drop-shadow(0_0_22px_var(--primary))]',
      isActive ? 'bg-accent text-accent-foreground' : '',
    ].join(' ')

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-30 flex justify-start px-4 mt-5 sm:justify-center">
      <nav className="pointer-events-auto relative rounded-full px-2 py-2 text-sm text-foreground backdrop-blur-sm sm:px-4 sm:py-2">
        <div className="flex items-center">
          <ul className="m-0 hidden list-none items-center gap-5 p-0 sm:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClassName}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="sm:hidden rounded-full px-3 py-2 transition-[color,filter] duration-200 hover:text-primary hover:[filter:drop-shadow(0_0_10px_var(--primary))_drop-shadow(0_0_22px_var(--primary))]"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Menu</span>
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="mt-1 block h-0.5 w-5 bg-foreground" />
            <span className="mt-1 block h-0.5 w-5 bg-foreground" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer (kept outside the blurred nav so it truly fills the viewport) */}
      <div
        id="mobile-nav"
        className={[
          'sm:hidden fixed inset-0 z-40',
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
      >
        {/* Backdrop */}
        <div
          className={[
            'absolute inset-0 bg-background/70 backdrop-blur-[2px] backdrop-brightness-50 transition-opacity duration-200',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div
          className={[
            'fixed inset-y-0 left-0 w-[min(90vw,18rem)]',
            'flex min-h-dvh flex-col',
            'bg-background/95 text-foreground backdrop-blur-sm',
            'transition-transform duration-200 ease-out',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
        >
          <div className="flex items-center justify-between px-4 py-4">
            <div className="px-3 text-xs font-semibold tracking-[0.2em] text-primary">
              MENU
            </div>

            <button
              type="button"
              className="rounded-full px-3 py-2 transition-[color,filter] duration-200 hover:text-primary hover:[filter:drop-shadow(0_0_10px_var(--primary))_drop-shadow(0_0_22px_var(--primary))]"
              aria-label="Close navigation menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <ul className="m-0 flex flex-1 list-none flex-col gap-1 px-3 pb-4 pt-1 overflow-y-auto">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={mobileLinkClassName}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
