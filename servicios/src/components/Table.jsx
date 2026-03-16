export default function Table({ columns, items, renderActions, emptyMessage }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-200">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-slate-400">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-5 py-4 font-semibold">
                  {column.label}
                </th>
              ))}
              <th className="px-5 py-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-8 text-center text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-white/5">
                  {columns.map((column) => (
                    <td key={`${item.id}-${column.key}`} className="px-5 py-4">
                      {column.render ? column.render(item[column.key], item) : item[column.key]}
                    </td>
                  ))}
                  <td className="px-5 py-4">{renderActions(item)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
