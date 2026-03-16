import { request } from './api'

const TOKEN_KEY = 'game_archive_token'
const USER_KEY = 'game_archive_user'

export async function login(credentials) {
  const data = await request('/usuarios/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

  localStorage.setItem(TOKEN_KEY, data.token)
  localStorage.setItem(USER_KEY, JSON.stringify(data.user))

  return data
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}

export function getSessionUser() {
  const rawUser = localStorage.getItem(USER_KEY)
  return rawUser ? JSON.parse(rawUser) : null
}
