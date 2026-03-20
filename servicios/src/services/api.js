const API_URL =
  import.meta.env.VITE_API_URL ?? 'https://crudv2-qm7g.onrender.com/api'

export async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error ?? 'Ocurrió un error en la petición.')
  }

  return data
}
