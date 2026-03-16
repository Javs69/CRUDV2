import { request } from './api'

export function getPlataformas() {
  return request('/plataformas')
}

export function createPlataforma(plataforma) {
  return request('/plataformas', {
    method: 'POST',
    body: JSON.stringify(plataforma),
  })
}

export function updatePlataforma(id, plataforma) {
  return request(`/plataformas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(plataforma),
  })
}

export function deletePlataforma(id) {
  return request(`/plataformas/${id}`, {
    method: 'DELETE',
  })
}
