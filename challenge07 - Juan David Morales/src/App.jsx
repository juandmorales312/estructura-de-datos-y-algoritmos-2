import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import LinkedSongs from './pages/LinkedSongs.jsx'
import DoublyHistory from './pages/DoublyHistory.jsx'

export default function App() {
  return (
    <div>
      <nav className="nav">
        <NavLink className={({isActive}) => 'link' + (isActive ? ' active' : '')} to="/linked">Lista Enlazada (Canciones)</NavLink>
        <NavLink className={({isActive}) => 'link' + (isActive ? ' active' : '')} to="/doubly">Lista Doblemente Enlazada (Historial)</NavLink>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/linked" replace />} />
          <Route path="/linked" element={<LinkedSongs />} />
          <Route path="/doubly" element={<DoublyHistory />} />
        </Routes>
      </div>
    </div>
  )
}
