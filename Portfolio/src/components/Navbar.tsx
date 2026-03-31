import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'Projects', to: '/projects' },
  { label: 'Certificates', to: '/certificates' },
  { label: 'Contact', to: '/contact' },
] as const

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-30 flex justify-center px-4 mt-5">
      <nav className="pointer-events-auto rounded-full px-4 py-2 text-sm text-foreground backdrop-blur-sm">
        <ul className="m-0 flex list-none items-center gap-5 p-0 ">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-full px-3 py-1 transition-colors',
                    'hover:bg-accent hover:text-primary',
                    isActive ? 'bg-accent text-accent-foreground' : '',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
