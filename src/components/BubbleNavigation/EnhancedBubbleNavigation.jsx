import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './EnhancedBubbleNavigation.css'

/**
 * Componente mejorado de navegación de burbujas
 * Implementación optimizada para rendimiento y experiencia de usuario
 * - Aparición rápida y fluida de las burbujas
 * - Animaciones suaves con requestAnimationFrame
 * - Mayor transparencia en estado normal y efectos visuales al hacer hover
 * - Navegación directa a las páginas correspondientes
 */
const EnhancedBubbleNavigation = () => {
  // Referencias
  const containerRef = useRef(null)
  const animationFrameRef = useRef(null)
  const bubbleRefs = useRef([])
  const startTimeRef = useRef(0)

  // Estados
  const [mounted, setMounted] = useState(false)
  const [animationStarted, setAnimationStarted] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  // Rutas de navegación - useMemo para evitar recrear el array en cada renderizado
  const bubbleRoutes = useMemo(
    () => [
      { to: '/dad-jokes', label: 'Dad Jokes', color: '#7E57C2', class: 'bubble-dad-jokes' },
      { to: '/yee-quote', label: 'Yee Quote', color: '#26A69A', class: 'bubble-yee-quote' },
      { to: '/events', label: 'Eventos', color: '#EC407A', class: 'bubble-events' },
      { to: '/toys', label: 'Juguetes', color: '#FF7043', class: 'bubble-toys' },
    ],
    []
  )

  // Actualizar tamaño del contenedor
  const updateContainerSize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setContainerSize({ width: rect.width, height: rect.height })
    }
  }, [])

  // Inicializar el contenedor
  useEffect(() => {
    containerRef.current = document.querySelector('.main-content')
    updateContainerSize()

    // Listener para cambios de tamaño
    const handleResize = () => {
      updateContainerSize()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateContainerSize])

  // Calcular posiciones iniciales
  const getInitialPositions = useCallback(() => {
    if (!containerRef.current || containerSize.width === 0) return []

    const { width, height } = containerSize
    const centerX = width / 2
    const centerY = height / 2

    // Posiciones en un patrón circular
    return bubbleRoutes.map((_, index) => {
      const angle = (index / bubbleRoutes.length) * Math.PI * 2
      const radius = Math.min(width, height) * 0.25

      return {
        x: centerX + Math.cos(angle) * radius - 70, // Ajuste para el tamaño de la burbuja
        y: centerY + Math.sin(angle) * radius - 70, // Ajuste para el tamaño de la burbuja
      }
    })
  }, [containerSize, bubbleRoutes.length])

  // Función para animar las burbujas
  const animateBubbles = useCallback(() => {
    if (!animationStarted || !containerRef.current) return

    const currentTime = performance.now()
    const elapsedTime = currentTime - startTimeRef.current

    // Detener la animación después de 2 segundos
    if (elapsedTime > 2000) {
      cancelAnimationFrame(animationFrameRef.current)
      return
    }

    // Actualizar posiciones de las burbujas
    bubbleRefs.current.forEach((bubble, index) => {
      if (!bubble || !bubble.element) return

      const initialPos = getInitialPositions()[index]
      if (!initialPos) return

      // Aplicar movimiento suave
      const progress = Math.min(elapsedTime / 1000, 1) // Progreso de 0 a 1 en 1 segundo
      const easedProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2 // Ease in-out cuadrático

      // Pequeño movimiento aleatorio
      const randomX = Math.sin(currentTime * 0.001 + index) * 2
      const randomY = Math.cos(currentTime * 0.001 + index * 1.5) * 2

      // Aplicar posición
      bubble.element.style.transform = `translate(${initialPos.x + randomX}px, ${initialPos.y + randomY}px) scale(1)`
    })

    // Continuar la animación
    animationFrameRef.current = requestAnimationFrame(animateBubbles)
  }, [animationStarted, getInitialPositions])

  // Efecto para iniciar la animación
  useEffect(() => {
    if (containerSize.width > 0 && !mounted) {
      setMounted(true)

      // Mostrar las burbujas inmediatamente
      setTimeout(() => {
        bubbleRoutes.forEach((_, index) => {
          const bubble = document.getElementById(`enhanced-bubble-${index}`)
          if (bubble) {
            bubble.classList.add('visible')
          }
        })

        // Iniciar animación después de que todas las burbujas sean visibles
        setTimeout(() => {
          startTimeRef.current = performance.now()
          setAnimationStarted(true)
        }, 300) // Esperar 300ms para que todas las burbujas sean visibles
      }, 100) // Pequeño retraso inicial para asegurar que el DOM esté listo
    }
  }, [containerSize, bubbleRoutes, mounted])

  // Iniciar la animación cuando animationStarted cambie a true
  useEffect(() => {
    if (animationStarted) {
      animationFrameRef.current = requestAnimationFrame(animateBubbles)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animationStarted, animateBubbles])

  // Guardar referencias a los elementos de las burbujas
  useEffect(() => {
    bubbleRefs.current = bubbleRoutes.map((_, index) => ({
      element: document.getElementById(`enhanced-bubble-${index}`),
    }))
  }, [mounted, bubbleRoutes])

  // Función para manejar el clic y mostrar mensaje en consola
  const handleBubbleClick = useCallback((label) => {
    console.log(`clicked! ${label}`)
  }, [])

  return (
    <div className='enhanced-bubble-container'>
      {getInitialPositions().map((position, index) => (
        <Link
          key={bubbleRoutes[index].to}
          to={bubbleRoutes[index].to}
          id={`enhanced-bubble-${index}`}
          className={`enhanced-bubble ${bubbleRoutes[index].class}`}
          onClick={() => handleBubbleClick(bubbleRoutes[index].label)}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}>
          <span className='enhanced-bubble-text'>{bubbleRoutes[index].label}</span>
        </Link>
      ))}
    </div>
  )
}

export default EnhancedBubbleNavigation
