import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import Bubble from './Bubble'
import './BubbleNavigation.css'

const BUBBLE_SIZE = 140
const SPEED_LIMIT = 0.8 // Reducido para movimiento más suave
const ANIMATION_INTERVAL = 1000 / 60 // 60 FPS
const RANDOM_FACTOR = 0.01 // Factor de aleatoriedad reducido para movimiento más predecible
const BUBBLE_APPEAR_DELAY = 120 // Milisegundos entre la aparición de cada burbuja (ligeramente más rápido)
const ANIMATION_START_DELAY = 0 // Eliminamos el retraso para iniciar el movimiento inmediatamente
const VELOCITY_RAMP_UP_DURATION = 3500 // Milisegundos que tarda la velocidad en alcanzar su valor máximo (optimizado)
const INITIAL_VELOCITY_FACTOR = 0.08 // Factor de velocidad inicial (8% de la velocidad máxima - más perceptible)
const POSITION_TRANSITION_DURATION = 4000 // Milisegundos que tarda en alejarse de la posición inicial (optimizado)
const MICRO_MOVEMENT_AMPLITUDE = 0.15 // Amplitud del micro-movimiento durante la aparición

const bubbleRoutes = [
  { to: '/dad-jokes', label: 'Dad Jokes', color: '#4a90e2' },
  { to: '/yee-quote', label: 'Yee Quote', color: '#e24a8d' },
  { to: '/events', label: 'Eventos', color: '#4ae28d' },
  { to: '/toys', label: 'Juguetes', color: '#e2c84a' },
]

function BubbleNavigation() {
  const containerRef = useRef(null)
  const bubbleRefs = useRef([])
  const animationRef = useRef(null)
  const lastUpdateTimeRef = useRef(Date.now())
  const animationStartTimeRef = useRef(0) // Referencia para el tiempo de inicio de la animación
  const initialPositionsRef = useRef([]) // Guardar las posiciones iniciales
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [visibleBubbles, setVisibleBubbles] = useState([])
  const [animationStarted, setAnimationStarted] = useState(false)

  // Calcular posiciones iniciales determinísticas para una aparición más controlada
  const getInitialPositions = useCallback(() => {
    if (!containerRef.current) return []

    const { width, height } = containerRef.current.getBoundingClientRect()
    const positions = []
    const centerX = width / 2 - BUBBLE_SIZE / 2
    const centerY = height / 2 - BUBBLE_SIZE / 2

    // Distribuir las burbujas en posiciones fijas alrededor del centro
    // Esto crea un patrón predecible y agradable visualmente
    const bubbleCount = bubbleRoutes.length
    const radius = Math.min(width, height) * 0.25 // Radio del círculo donde aparecerán las burbujas

    for (let i = 0; i < bubbleCount; i++) {
      // Calcular posición en un círculo alrededor del centro
      const angle = (i / bubbleCount) * Math.PI * 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      positions.push({ x, y })
    }

    // Guardar las posiciones iniciales para usarlas en la transición
    initialPositionsRef.current = [...positions]

    return positions
  }, [])

  // Actualizar tamaño del contenedor
  const updateContainerSize = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setContainerSize({ width, height })
      setIsMobile(window.innerWidth < 768)
    }
  }, [])

  // Inicializar el contenedor y las posiciones
  useEffect(() => {
    updateContainerSize()
    window.addEventListener('resize', updateContainerSize)

    return () => {
      window.removeEventListener('resize', updateContainerSize)
    }
  }, [updateContainerSize])

  // Función de animación optimizada con mejor rendimiento y transición suave
  const animateBubbles = useCallback(() => {
    if (!containerRef.current) return

    // Usar performance.now() para mayor precisión en el tiempo
    const currentTime = performance.now()

    // Si es el primer frame de animación, guardar el tiempo de inicio
    if (animationStartTimeRef.current === 0) {
      animationStartTimeRef.current = currentTime
    }

    // Calcular el tiempo transcurrido desde el inicio de la animación
    const elapsedTime = currentTime - animationStartTimeRef.current

    // Calcular el factor de velocidad basado en el tiempo transcurrido
    // Esto crea una rampa de aceleración suave desde INITIAL_VELOCITY_FACTOR hasta 1.0
    const velocityFactor = Math.min(
      INITIAL_VELOCITY_FACTOR + (1 - INITIAL_VELOCITY_FACTOR) * (elapsedTime / VELOCITY_RAMP_UP_DURATION),
      1
    )

    // Calcular un factor de micro-movimiento para la fase inicial
    // Este factor permite un ligero movimiento incluso antes de que comience la animación principal
    // Crea un efecto de "respiración" o "flotación" sutil mientras las burbujas aparecen
    const microMovementPhase = (elapsedTime / 1000) * Math.PI // Ciclo completo cada 2 segundos
    const microMovementFactor = Math.sin(microMovementPhase) * MICRO_MOVEMENT_AMPLITUDE

    // Calcular deltaTime con límite para evitar saltos grandes
    const rawDeltaTime = (currentTime - lastUpdateTimeRef.current) / 16 // Normalizar a ~60fps
    const deltaTime = Math.min(rawDeltaTime, 3) // Limitar deltaTime para evitar saltos grandes
    lastUpdateTimeRef.current = currentTime

    const { width, height } = containerSize
    const bubbles = bubbleRefs.current.filter((bubble) => bubble && bubble.ref.current)

    // Limitar la frecuencia de actualización en dispositivos de gama baja
    if (rawDeltaTime > 5) {
      // Si el frame rate es muy bajo, solo programar el siguiente frame sin actualizar
      animationRef.current = requestAnimationFrame(animateBubbles)
      return
    }

    // Actualizar posición y velocidad de cada burbuja
    bubbles.forEach((bubble, i) => {
      const { position, velocity, setPosition, setVelocity } = bubble
      const initialPosition = initialPositionsRef.current[i] || position

      // Factor de interpolación entre la posición inicial y el movimiento aleatorio
      // Al inicio se mantiene en la posición inicial y gradualmente se aleja
      // Usamos una duración más larga para la transición de posición que para la velocidad
      const positionFactor = Math.min(elapsedTime / POSITION_TRANSITION_DURATION, 1)
      // Aplicamos una curva de aceleración para que el movimiento sea más natural
      // Esta fórmula crea una curva que comienza lenta y acelera gradualmente
      const easedPositionFactor = Math.pow(positionFactor, 2) * (3 - 2 * positionFactor)

      // Calcular nueva posición con movimiento más suave
      // Aplicar el factor de posición para una transición gradual
      // Usar la posición inicial como punto de referencia durante la transición
      // Al inicio (easedPositionFactor = 0) se mantiene cerca de la posición inicial
      // Al final (easedPositionFactor = 1) se mueve libremente

      // Aplicar micro-movimientos a la posición inicial para crear un efecto de "flotación" sutil
      // Esto hace que las burbujas parezcan "vivas" incluso antes de comenzar a moverse libremente
      // Usamos el índice 'i' del bucle forEach para crear movimientos diferentes para cada burbuja
      const microX = Math.cos(microMovementPhase + i) * microMovementFactor
      const microY = Math.sin(microMovementPhase + i * 0.7) * microMovementFactor

      // Posición inicial con micro-movimiento aplicado
      const animatedInitialX = initialPosition.x + microX
      const animatedInitialY = initialPosition.y + microY

      // Interpolar entre la posición inicial animada y la posición actual
      let baseX = animatedInitialX * (1 - easedPositionFactor) + position.x * easedPositionFactor
      let baseY = animatedInitialY * (1 - easedPositionFactor) + position.y * easedPositionFactor

      // Calcular la nueva posición aplicando la velocidad
      // El factor de velocidad controla cuánto se mueve en cada frame
      let newX = baseX + velocity.x * deltaTime * velocityFactor
      let newY = baseY + velocity.y * deltaTime * velocityFactor
      let newVx = velocity.x
      let newVy = velocity.y
      let velocityChanged = false

      // Rebotar en los bordes con amortiguación para movimiento más natural
      if (newX <= 0 || newX >= width - BUBBLE_SIZE) {
        newVx = -velocity.x * 0.95 // Amortiguación al rebotar
        newX = newX <= 0 ? 0 : width - BUBBLE_SIZE
        velocityChanged = true
      }

      if (newY <= 0 || newY >= height - BUBBLE_SIZE) {
        newVy = -velocity.y * 0.95 // Amortiguación al rebotar
        newY = newY <= 0 ? 0 : height - BUBBLE_SIZE
        velocityChanged = true
      }

      // Añadir variación aleatoria con menor frecuencia para movimiento más suave
      // Aumentar gradualmente la aleatoriedad según el factor de velocidad
      if (Math.random() < 0.1 * velocityFactor) {
        // Probabilidad proporcional al factor de velocidad
        const randomFactor = RANDOM_FACTOR * velocityFactor
        newVx += (Math.random() * 2 - 1) * randomFactor
        newVy += (Math.random() * 2 - 1) * randomFactor
        velocityChanged = true
      }

      // Limitar velocidad para un movimiento más suave
      // Aplicar el límite de velocidad gradualmente
      const currentSpeedLimit = SPEED_LIMIT * velocityFactor
      const speed = Math.sqrt(newVx * newVx + newVy * newVy)

      if (speed > currentSpeedLimit) {
        newVx = (newVx / speed) * currentSpeedLimit
        newVy = (newVy / speed) * currentSpeedLimit
        velocityChanged = true
      } else if (speed < 0.1 * velocityFactor && velocityFactor > 0.2) {
        // Asegurar una velocidad mínima para evitar que se detengan
        // Solo aplicar cuando ya hemos alcanzado cierta velocidad
        const minSpeed = 0.1 * velocityFactor + Math.random() * 0.1 * velocityFactor
        if (speed > 0) {
          newVx = (newVx / speed) * minSpeed
          newVy = (newVy / speed) * minSpeed
          velocityChanged = true
        }
      }

      // Actualizar velocidad solo si cambió para reducir renderizados
      if (velocityChanged) {
        setVelocity({ x: newVx, y: newVy })
      }

      // Actualizar posición
      setPosition({ x: newX, y: newY })
    })

    // Programar el siguiente frame
    animationRef.current = requestAnimationFrame(animateBubbles)
  }, [containerSize])

  // Controlar la aparición gradual de las burbujas con micro-movimientos inmediatos
  useEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0 && visibleBubbles.length === 0) {
      // Inicializar el tiempo de animación al comenzar a mostrar las burbujas
      // Esto permite que los micro-movimientos comiencen inmediatamente
      animationStartTimeRef.current = performance.now()

      // Mostrar las burbujas una por una con un retraso entre cada una
      bubbleRoutes.forEach((_, index) => {
        setTimeout(() => {
          setVisibleBubbles((prev) => [...prev, index])

          // Cuando se muestra la última burbuja, iniciar la animación completa inmediatamente
          if (index === bubbleRoutes.length - 1) {
            // No reiniciamos el tiempo de inicio para mantener la continuidad del movimiento
            setAnimationStarted(true)
          }
        }, index * BUBBLE_APPEAR_DELAY)
      })
    }
  }, [containerSize])

  // Iniciar la animación de micro-movimientos inmediatamente y la animación completa cuando todas las burbujas sean visibles
  useEffect(() => {
    // Iniciar la animación tan pronto como el contenedor tenga dimensiones
    // Esto permite que los micro-movimientos comiencen inmediatamente
    if (containerSize.width > 0 && containerSize.height > 0) {
      animationRef.current = requestAnimationFrame(animateBubbles)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animateBubbles, containerSize])

  // Efecto para manejar cambios en el estado de animación
  // Esto permite que la animación completa comience sin interrupciones
  useEffect(() => {
    // No necesitamos hacer nada especial cuando animationStarted cambia a true
    // porque la animación ya está en marcha con los micro-movimientos
    // y la transición será fluida gracias a los factores de velocidad y posición
  }, [animationStarted])

  // Determinar el tamaño de las burbujas según el tamaño de la pantalla
  const getBubbleSize = useCallback(() => {
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth

    // Ajuste más agresivo para pantallas pequeñas
    if (viewportHeight < 600 || viewportWidth < 400) {
      return isMobile ? BUBBLE_SIZE * 0.5 : BUBBLE_SIZE * 0.6
    } else if (viewportHeight < 800 || viewportWidth < 768) {
      return isMobile ? BUBBLE_SIZE * 0.6 : BUBBLE_SIZE * 0.75
    } else {
      return isMobile ? BUBBLE_SIZE * 0.65 : BUBBLE_SIZE * 0.9
    }
  }, [isMobile])

  // Renderizar las burbujas con aparición gradual
  return (
    <div
      className='bubble-navigation'
      ref={containerRef}>
      {containerSize.width > 0 &&
        getInitialPositions().map((position, index) => (
          <Bubble
            key={bubbleRoutes[index].to}
            to={bubbleRoutes[index].to}
            label={bubbleRoutes[index].label}
            color={bubbleRoutes[index].color}
            size={getBubbleSize()}
            initialPosition={position}
            containerRef={containerRef}
            bubbleRefs={bubbleRefs}
            index={index}
            isVisible={visibleBubbles.includes(index)}
            animationStarted={animationStarted}
          />
        ))}
    </div>
  )
}

export default BubbleNavigation
