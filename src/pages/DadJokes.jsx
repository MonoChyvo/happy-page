import React from 'react'
import './PageStyles.css'

function DadJokes() {
  return (
    <div className='page-container'>
      <h1>Dad Jokes</h1>
      <p>Aquí encontrarás los mejores chistes de papá.</p>

      <div className='content-card'>
        <h2>Chiste del Día</h2>
        <p>¿Por qué los programadores prefieren el frío? Porque odian los bugs.</p>
      </div>

      <div className='content-card'>
        <h2>Categorías</h2>
        <p>Explora nuestra colección de chistes por categorías: tecnología, ciencia, deportes y más.</p>
      </div>
    </div>
  )
}

export default DadJokes
