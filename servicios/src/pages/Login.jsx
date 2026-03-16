import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import { login } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      await login(formData)
      navigate('/videojuegos')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col justify-between gap-8 bg-linear-to-br from-cyan-400 via-sky-500 to-indigo-600 p-8 text-slate-950">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.4em]">Game Archive</p>
            <h1 className="mt-6 text-5xl font-black leading-none">Tu inventario gamer en un solo panel</h1>
            <p className="mt-6 max-w-lg text-sm font-medium">
              Administra videojuegos y plataformas con un flujo simple de login, tabla,
              modal y alertas.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-950/10 p-5 backdrop-blur">
            <p className="text-sm font-semibold">Usuario demo sugerido en la BD</p>
            <p className="mt-2 text-sm">admin / 123456</p>
          </div>
        </section>

        <section className="p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">Acceso</p>
          <h2 className="mt-3 text-3xl font-black text-white">Iniciar sesión</h2>
          <p className="mt-3 text-sm text-slate-400">
            Entra al panel para administrar el catálogo de videojuegos.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Alert type="error" message={error} />

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-200">Usuario</span>
              <input
                type="text"
                value={formData.username}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, username: event.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                placeholder="admin"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-200">Contraseña</span>
              <input
                type="password"
                value={formData.password}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, password: event.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                placeholder="123456"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-black uppercase tracking-[0.25em] text-slate-950 transition hover:bg-cyan-300"
            >
              Entrar
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
