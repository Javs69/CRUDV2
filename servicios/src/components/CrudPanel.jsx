import { useEffect, useState } from 'react'
import Alert from './Alert'
import Modal from './Modal'
import Table from './Table'

const initialAlert = { type: '', message: '' }

export default function CrudPanel({
  title,
  subtitle,
  columns,
  loadItems,
  createItem,
  updateItem,
  deleteItem,
  createEmptyItem,
  renderForm,
  emptyMessage = 'No hay registros todavía.',
}) {
  const [items, setItems] = useState([])
  const [alert, setAlert] = useState(initialAlert)
  const [isOpen, setIsOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState(createEmptyItem())

  async function reloadItems() {
    try {
      const data = await loadItems()
      setItems(data)
    } catch (error) {
      setAlert({ type: 'error', message: error.message })
    }
  }

  useEffect(() => {
    let active = true

    async function fetchInitialItems() {
      try {
        const data = await loadItems()

        if (active) {
          setItems(data)
        }
      } catch (error) {
        if (active) {
          setAlert({ type: 'error', message: error.message })
        }
      }
    }

    fetchInitialItems()

    return () => {
      active = false
    }
  }, [loadItems])

  function openCreateModal() {
    setEditingItem(null)
    setFormData(createEmptyItem())
    setIsOpen(true)
  }

  function openEditModal(item) {
    setEditingItem(item)
    setFormData({ ...item })
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setEditingItem(null)
    setFormData(createEmptyItem())
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      if (editingItem) {
        await updateItem(editingItem.id, formData)
        setAlert({ type: 'success', message: `${title} actualizado correctamente.` })
      } else {
        await createItem(formData)
        setAlert({ type: 'success', message: `${title} agregado correctamente.` })
      }

      closeModal()
      await reloadItems()
    } catch (error) {
      setAlert({ type: 'error', message: error.message })
    }
  }

  async function handleDelete(id) {
    try {
      await deleteItem(id)
      setAlert({ type: 'success', message: `${title} eliminado correctamente.` })
      await reloadItems()
    } catch (error) {
      setAlert({ type: 'error', message: error.message })
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-cyan-400/20 bg-slate-900/60 p-8 shadow-2xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">CRUD</p>
            <h2 className="mt-2 text-4xl font-black text-white">{title}</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
          >
            Nuevo registro
          </button>
        </div>
      </div>

      <Alert type={alert.type} message={alert.message} />

      <Table
        columns={columns}
        items={items}
        emptyMessage={emptyMessage}
        renderActions={(item) => (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => openEditModal(item)}
              className="rounded-full border border-cyan-400/30 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className="rounded-full border border-rose-400/30 px-3 py-2 text-xs font-semibold text-rose-100 transition hover:bg-rose-500/20"
            >
              Eliminar
            </button>
          </div>
        )}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={editingItem ? `Editar ${title}` : `Nuevo ${title}`}
      >
        {renderForm({
          formData,
          setFormData,
          onSubmit: handleSubmit,
          onCancel: closeModal,
          isEditing: Boolean(editingItem),
        })}
      </Modal>
    </section>
  )
}
