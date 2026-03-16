import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { clearSession, getSessionUser } from '../services/authService'

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-cyan-400 text-slate-950'
      : 'bg-white/10 text-slate-100 hover:bg-white/20'
  }`

export default function Layout() {
  const navigate = useNavigate()
  const user = getSessionUser()

  function handleLogout() {
    clearSession()
    navigate('/login')
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">Game Archive</p>
            <h1 className="text-2xl font-black text-white">Panel de coleccionista</h1>
          </div>
          <nav className="flex items-center gap-3">
            <NavLink to="/videojuegos" className={navLinkClass}>
              Videojuegos
            </NavLink>
            <NavLink to="/plataformas" className={navLinkClass}>
              Plataformas
            </NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-300 md:inline">
              {user?.nombre ?? 'Invitado'}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
