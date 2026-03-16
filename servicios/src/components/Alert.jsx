const styles = {
  success: 'border-emerald-400/30 bg-emerald-500/15 text-emerald-100',
  error: 'border-rose-400/30 bg-rose-500/15 text-rose-100',
}

export default function Alert({ type, message }) {
  if (!message) {
    return null
  }

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm shadow-lg ${styles[type] ?? styles.success}`}>
      {message}
    </div>
  )
}
