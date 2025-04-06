import React from 'react'
import './PageStyles.css'

function Toys() {
  return (
    <div className='page-container'>
      <h1>Juguetes</h1>
      <p>Explora nuestra colección de juguetes para todas las edades.</p>

      <div className='content-card'>
        <h2>Destacados</h2>
        <p>Descubre nuestros juguetes más populares y las últimas novedades del mercado.</p>
      </div>

      <div className='content-card'>
        <h2>Categorías</h2>
        <p>Tenemos juguetes educativos, de construcción, juegos de mesa, peluches y mucho más.</p>
      </div>
    </div>
  )
}

export default Toys
