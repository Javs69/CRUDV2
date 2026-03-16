import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'
import Login from '../pages/Login'
import Plataformas from '../pages/Plataformas'
import Videojuegos from '../pages/Videojuegos'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/videojuegos" replace />} />
          <Route path="videojuegos" element={<Videojuegos />} />
          <Route path="plataformas" element={<Plataformas />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
