import { request } from './api'

export function getVideojuegos() {
  return request('/videojuegos')
}

export function createVideojuego(videojuego) {
  return request('/videojuegos', {
    method: 'POST',
    body: JSON.stringify({
      ...videojuego,
      precio: Number(videojuego.precio),
      plataforma_id: Number(videojuego.plataforma_id),
    }),
  })
}

export function updateVideojuego(id, videojuego) {
  return request(`/videojuegos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...videojuego,
      precio: Number(videojuego.precio),
      plataforma_id: Number(videojuego.plataforma_id),
    }),
  })
}

export function deleteVideojuego(id) {
  return request(`/videojuegos/${id}`, {
    method: 'DELETE',
  })
}
