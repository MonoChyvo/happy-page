import React, { useMemo } from 'react'
import FloatingBubblesCanvas from './FloatingBubblesCanvas'
import './FloatingBubbles.css'

/**
 * Componente principal de navegación con burbujas flotantes
 * - Utiliza Canvas para renderizar burbujas con mejor rendimiento
 * - Las burbujas flotan libremente desde el inicio
 * - Interacción mejorada con efectos de hover y clic
 */
const FloatingBubbleNavigation = () => {
  // Rutas de navegación - useMemo para evitar recrear el array en cada renderizado
  const bubbleRoutes = useMemo(
    () => [
      { to: '/dad-jokes', label: 'Dad Jokes', color: 'rgba(126, 87, 194, 0.95)', class: 'bubble-dad-jokes' },
      { to: '/yee-quote', label: 'Yee Quote', color: 'rgba(38, 166, 154, 0.95)', class: 'bubble-yee-quote' },
      { to: '/events', label: 'Eventos', color: 'rgba(236, 64, 122, 0.95)', class: 'bubble-events' },
      { to: '/toys', label: 'Juguetes', color: 'rgba(255, 112, 67, 0.95)', class: 'bubble-toys' },
    ],
    []
  )

  return (
    <div className='floating-bubble-container'>
      <FloatingBubblesCanvas routes={bubbleRoutes} />
    </div>
  )
}

export default FloatingBubbleNavigation
