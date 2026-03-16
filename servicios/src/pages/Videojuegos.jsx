import { useEffect, useState } from 'react'
import CrudPanel from '../components/CrudPanel'
import { getPlataformas } from '../services/plataformaService'
import {
  createVideojuego,
  deleteVideojuego,
  getVideojuegos,
  updateVideojuego,
} from '../services/videojuegoService'

function emptyVideojuego() {
  return {
    titulo: '',
    genero: '',
    estudio: '',
    precio: '',
    plataforma_id: '',
  }
}

export default function Videojuegos() {
  const [plataformas, setPlataformas] = useState([])

  useEffect(() => {
    getPlataformas()
      .then(setPlataformas)
      .catch(() => {
        setPlataformas([])
      })
  }, [])

  const columns = [
    { key: 'titulo', label: 'Título' },
    { key: 'genero', label: 'Género' },
    { key: 'estudio', label: 'Estudio' },
    { key: 'precio', label: 'Precio', render: (value) => `$${Number(value).toFixed(2)}` },
    { key: 'plataforma_nombre', label: 'Plataforma' },
  ]

  return (
    <CrudPanel
      title="Videojuegos"
      subtitle="Organiza tu biblioteca por género, estudio y plataforma para mantener el catálogo al día."
      columns={columns}
      loadItems={getVideojuegos}
      createItem={createVideojuego}
      updateItem={updateVideojuego}
      deleteItem={deleteVideojuego}
      createEmptyItem={emptyVideojuego}
      emptyMessage="Todavía no has registrado videojuegos."
      renderForm={({ formData, setFormData, onSubmit, onCancel, isEditing }) => (
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Título</span>
            <input
              value={formData.titulo}
              onChange={(event) =>
                setFormData((current) => ({ ...current, titulo: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-300"
              placeholder="The Legend of Zelda"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Género</span>
            <input
              value={formData.genero}
              onChange={(event) =>
                setFormData((current) => ({ ...current, genero: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-300"
              placeholder="Aventura"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Estudio</span>
            <input
              value={formData.estudio}
              onChange={(event) =>
                setFormData((current) => ({ ...current, estudio: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-300"
              placeholder="Nintendo EPD"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Precio</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.precio}
              onChange={(event) =>
                setFormData((current) => ({ ...current, precio: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-300"
              placeholder="69.99"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Plataforma</span>
            <select
              value={formData.plataforma_id}
              onChange={(event) =>
                setFormData((current) => ({ ...current, plataforma_id: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-300"
            >
              <option value="">Selecciona una plataforma</option>
              {plataformas.map((plataforma) => (
                <option key={plataforma.id} value={plataforma.id}>
                  {plataforma.nombre}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950"
            >
              {isEditing ? 'Guardar cambios' : 'Registrar videojuego'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    />
  )
}
