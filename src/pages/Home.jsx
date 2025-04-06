import React from 'react'
import './PageStyles.css'
import BubbleNavigation from '../components/BubbleNavigation/BubbleNavigation'

function Home() {
  return (
    <div className='page-container home-container'>
      <div className='home-header'>
        <h1>Bienvenido a Nuestra Aplicación Moderna</h1>
        <p className='home-description'>
          Interactúa con las burbujas flotantes para descubrir diferentes secciones de nuestra aplicación. Cada burbuja
          te llevará a una experiencia única.
        </p>
      </div>

      <BubbleNavigation />
    </div>
  )
}

export default Home
