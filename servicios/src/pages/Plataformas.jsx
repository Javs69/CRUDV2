import CrudPanel from '../components/CrudPanel'
import {
  createPlataforma,
  deletePlataforma,
  getPlataformas,
  updatePlataforma,
} from '../services/plataformaService'

function emptyPlataforma() {
  return {
    nombre: '',
    fabricante: '',
    lanzamiento: '',
    generacion: '',
  }
}

export default function Plataformas() {
  const columns = [
    { key: 'nombre', label: 'Plataforma' },
    { key: 'fabricante', label: 'Fabricante' },
    { key: 'lanzamiento', label: 'Lanzamiento' },
    { key: 'generacion', label: 'Generación' },
  ]

  return (
    <CrudPanel
      title="Plataformas"
      subtitle="Registra tus consolas y sistemas favoritos para relacionarlos con el catálogo."
      columns={columns}
      loadItems={getPlataformas}
      createItem={createPlataforma}
      updateItem={updatePlataforma}
      deleteItem={deletePlataforma}
      createEmptyItem={emptyPlataforma}
      emptyMessage="Todavía no has registrado plataformas."
      renderForm={({ formData, setFormData, onSubmit, onCancel, isEditing }) => (
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Nombre</span>
            <input
              value={formData.nombre}
              onChange={(event) =>
                setFormData((current) => ({ ...current, nombre: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-300"
              placeholder="Nintendo Switch"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Fabricante</span>
            <input
              value={formData.fabricante}
              onChange={(event) =>
                setFormData((current) => ({ ...current, fabricante: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-300"
              placeholder="Nintendo"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Lanzamiento</span>
            <input
              value={formData.lanzamiento}
              onChange={(event) =>
                setFormData((current) => ({ ...current, lanzamiento: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-300"
              placeholder="2017"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Generación</span>
            <input
              value={formData.generacion}
              onChange={(event) =>
                setFormData((current) => ({ ...current, generacion: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-300"
              placeholder="Híbrida"
            />
          </label>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950"
            >
              {isEditing ? 'Guardar cambios' : 'Registrar plataforma'}
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
