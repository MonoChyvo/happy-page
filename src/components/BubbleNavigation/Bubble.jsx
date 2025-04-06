import React, { useRef, useEffect, useState, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './Bubble.css'

// Función para obtener la clase de color basada en la ruta
const getBubbleColorClass = (to) => {
  switch (to) {
    case '/dad-jokes':
      return 'bubble-dad-jokes'
    case '/yee-quote':
      return 'bubble-yee-quote'
    case '/events':
      return 'bubble-events'
    case '/toys':
      return 'bubble-toys'
    default:
      return ''
  }
}

// Componente optimizado con memo para evitar renderizados innecesarios
const Bubble = memo(
  ({
    to,
    label,
    color = '#4a90e2',
    size = 150,
    initialPosition,
    containerRef,
    bubbleRefs,
    index,
    isVisible = true, // Nuevo prop para controlar la visibilidad
    animationStarted = false, // Nuevo prop para controlar cuándo comienza la animación
  }) => {
    const bubbleRef = useRef(null)
    const [position, setPosition] = useState(initialPosition)
    // Velocidades iniciales más controladas para un movimiento más natural desde el centro
    // Calculamos velocidades que tiendan a alejarse del centro
    const [velocity, setVelocity] = useState(() => {
      // Calcular dirección desde el centro hacia la posición inicial
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const dirX = initialPosition.x - centerX
      const dirY = initialPosition.y - centerY

      // Normalizar la dirección y añadir un componente aleatorio
      const length = Math.sqrt(dirX * dirX + dirY * dirY) || 1
      const normalizedX = dirX / length
      const normalizedY = dirY / length

      // Combinar la dirección normalizada con un componente aleatorio
      return {
        x: normalizedX * 0.3 + Math.random() * 0.4 - 0.2,
        y: normalizedY * 0.3 + Math.random() * 0.4 - 0.2,
      }
    })
    const [isHovered, setIsHovered] = useState(false)

    // Callbacks optimizados para actualizar posición y velocidad
    // Usamos useCallback para evitar recrear estas funciones en cada render
    const updatePosition = useCallback((newPosition) => {
      setPosition(newPosition)
    }, [])

    const updateVelocity = useCallback((newVelocity) => {
      setVelocity(newVelocity)
    }, [])

    // Registrar la referencia de la burbuja en el array de referencias
    // Optimizado para reducir dependencias y actualizaciones
    useEffect(() => {
      if (bubbleRef.current && bubbleRefs) {
        bubbleRefs.current[index] = {
          ref: bubbleRef,
          position,
          velocity,
          setPosition: updatePosition,
          setVelocity: updateVelocity,
        }
      }

      // Limpiar la referencia al desmontar
      return () => {
        if (bubbleRefs) {
          bubbleRefs.current[index] = null
        }
      }
    }, [bubbleRefs, index, position, velocity, updatePosition, updateVelocity])

    // Estilo dinámico para la burbuja con optimizaciones para rendimiento y aparición gradual
    const bubbleStyle = {
      width: `${size}px`,
      height: `${size}px`,
      // Usamos variables CSS para la posición
      '--x': `${position.x}px`,
      '--y': `${position.y}px`,
      // Usar transform con translateZ(0) para forzar aceleración por hardware
      transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isVisible ? 1 : 0})`,
      opacity: isVisible ? (isHovered ? 1 : 0.8) : 0,
      // Transición más suave y controlada con efecto de aparición
      transition: `
        opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1),
        box-shadow 0.2s ease,
        z-index 0s,
        transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)
      `,
      boxShadow: isHovered ? `0 0 20px ${color}40` : '',
      zIndex: isHovered ? 100 : 10, // Aumentar z-index cuando está hover
    }

    const colorClass = getBubbleColorClass(to)

    return (
      <Link
        to={to}
        className={`bubble-link ${colorClass} ${isVisible ? 'visible' : ''} ${
          animationStarted ? 'animation-started' : ''
        }`}
        ref={bubbleRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={bubbleStyle}
        aria-label={`Navegar a ${label}`}
        tabIndex={isVisible ? 0 : -1} // Solo permitir foco si es visible
      >
        <span className='bubble-text'>{label}</span>
      </Link>
    )
  }
)

export default Bubble
