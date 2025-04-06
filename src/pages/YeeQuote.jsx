import React from 'react'
import './PageStyles.css'

function YeeQuote() {
  return (
    <div className='page-container'>
      <h1>Yee Quote</h1>
      <p>Las mejores citas inspiradoras para tu día a día.</p>

      <div className='content-card'>
        <h2>Cita del Día</h2>
        <p>
          "El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el coraje para continuar." - Winston
          Churchill
        </p>
      </div>

      <div className='content-card'>
        <h2>Categorías</h2>
        <p>Explora nuestras citas por temas: motivación, liderazgo, creatividad, perseverancia y más.</p>
      </div>
    </div>
  )
}

export default YeeQuote
