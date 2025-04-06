import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  // Función para determinar si un enlace está activo
  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <Link
          to='/'
          className='navbar-brand-link'>
          <h1>Modern App</h1>
        </Link>
      </div>
      <div className='navbar-menu'>
        <Link
          to='/'
          className={`navbar-item ${isActive('/')}`}>
          Inicio
        </Link>
        <Link
          to='/dad-jokes'
          className={`navbar-item ${isActive('/dad-jokes')}`}>
          Dad Jokes
        </Link>
        <Link
          to='/yee-quote'
          className={`navbar-item ${isActive('/yee-quote')}`}>
          Yee Quote
        </Link>
        <Link
          to='/events'
          className={`navbar-item ${isActive('/events')}`}>
          Eventos
        </Link>
        <Link
          to='/toys'
          className={`navbar-item ${isActive('/toys')}`}>
          Juguetes
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
