import React, { useEffect, useRef } from 'react'

/**
 * Componente de burbujas flotantes utilizando Canvas para mejor rendimiento
 * - Implementación basada en Canvas para animaciones fluidas
 * - Física simple para simular movimiento natural de burbujas
 * - Optimizado para rendimiento con requestAnimationFrame
 */
class Bubble {
  constructor(x, y, radius, dx, dy, color, route) {
    this.x = x
    this.y = y
    this.radius = radius
    this.originalRadius = radius
    this.dx = dx
    this.dy = dy
    this.color = color
    this.route = route
    this.opacity = 0.8 // Mayor opacidad como en la versión anterior
    this.hovered = false
    this.glowSize = 0 // Para el efecto de brillo al hacer hover
  }

  draw(ctx) {
    // Dibujar sombra si está en hover
    if (this.hovered) {
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
      ctx.shadowBlur = 20
    } else {
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
    }

    // Dibujar el círculo principal
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.opacity
    ctx.fill()

    // Añadir brillo para efecto de burbuja (similar al efecto anterior)
    const gradient = ctx.createRadialGradient(
      this.x - this.radius * 0.3,
      this.y - this.radius * 0.3,
      this.radius * 0.1,
      this.x,
      this.y,
      this.radius
    )
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)')
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.globalAlpha = 0.6 // Mayor opacidad para el brillo
    ctx.fillStyle = gradient
    ctx.fill()

    // Efecto de brillo adicional al hacer hover (similar al anterior)
    if (this.hovered) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius + this.glowSize, 0, Math.PI * 2, false)
      const glowGradient = ctx.createRadialGradient(
        this.x,
        this.y,
        this.radius,
        this.x,
        this.y,
        this.radius + this.glowSize + 5
      )
      glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
      glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = glowGradient
      ctx.globalAlpha = 0.7
      ctx.fill()

      // Incrementar el tamaño del brillo para animación
      this.glowSize = Math.min(this.glowSize + 0.2, 10)
    } else {
      this.glowSize = Math.max(this.glowSize - 0.5, 0)
    }

    // Dibujar texto con mejor contraste
    ctx.globalAlpha = 1
    ctx.font = `bold ${this.radius * 0.35}px Arial`
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(this.route.label, this.x, this.y)

    // Restaurar opacidad global
    ctx.globalAlpha = 1
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
  }

  update(canvas) {
    // Rebotar en los bordes
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx * 0.9
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy * 0.9
    }

    // Mantener dentro del canvas
    if (this.x + this.radius > canvas.width) this.x = canvas.width - this.radius
    if (this.x - this.radius < 0) this.x = this.radius
    if (this.y + this.radius > canvas.height) this.y = canvas.height - this.radius
    if (this.y - this.radius < 0) this.y = this.radius

    // Aplicar velocidad
    this.x += this.dx
    this.y += this.dy

    // Añadir pequeña aceleración aleatoria para movimiento más natural
    this.dx += (Math.random() - 0.5) * 0.05
    this.dy += (Math.random() - 0.5) * 0.05

    // Limitar velocidad máxima
    const maxSpeed = 1.5
    const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy)
    if (speed > maxSpeed) {
      this.dx = (this.dx / speed) * maxSpeed
      this.dy = (this.dy / speed) * maxSpeed
    }

    // Aplicar fricción
    this.dx *= 0.99
    this.dy *= 0.99
  }

  checkHover(mouseX, mouseY) {
    const distance = Math.sqrt(Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2))

    // Verificar si el mouse está sobre la burbuja
    if (distance < this.radius) {
      if (!this.hovered) {
        this.hovered = true
        this.radius = this.originalRadius * 1.1
        this.opacity = 1 // Opacidad completa en hover
      }
      return true
    } else {
      if (this.hovered) {
        this.hovered = false
        this.radius = this.originalRadius
        this.opacity = 0.8 // Mantener opacidad alta incluso sin hover
      }
      return false
    }
  }
}

const FloatingBubblesCanvas = ({ routes }) => {
  const canvasRef = useRef(null)
  const bubblesRef = useRef([])
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const hoveredBubbleRef = useRef(null)

  // Inicializar burbujas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Reiniciar burbujas cuando cambia el tamaño
      initBubbles()
    }

    const initBubbles = () => {
      bubblesRef.current = []

      // Crear burbujas para cada ruta
      routes.forEach((route, index) => {
        // Posición inicial en un patrón circular
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const angle = (index / routes.length) * Math.PI * 2
        const radius = Math.min(canvas.width, canvas.height) * 0.25

        // Tamaño de la burbuja basado en el ancho de la pantalla
        const bubbleRadius = canvas.width > 768 ? 70 : canvas.width > 480 ? 60 : 50

        // Posición inicial
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        // Velocidad inicial aleatoria
        const dx = (Math.random() - 0.5) * 1
        const dy = (Math.random() - 0.5) * 1

        // Color basado en la ruta
        const color = route.color

        // Crear burbuja
        const bubble = new Bubble(x, y, bubbleRadius, dx, dy, color, route)
        bubblesRef.current.push(bubble)
      })
    }

    // Manejar eventos del mouse
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleClick = () => {
      if (hoveredBubbleRef.current) {
        window.location.href = hoveredBubbleRef.current.route.to
      }
    }

    // Configurar canvas y eventos
    handleResize()
    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    // Limpiar eventos al desmontar
    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [routes])

  // Animar burbujas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Resetear burbuja hover
      hoveredBubbleRef.current = null

      // Actualizar y dibujar cada burbuja
      bubblesRef.current.forEach((bubble) => {
        bubble.update(canvas)
        bubble.draw(ctx)

        // Verificar hover
        if (bubble.checkHover(mouseRef.current.x, mouseRef.current.y)) {
          hoveredBubbleRef.current = bubble
          canvas.style.cursor = 'pointer'
        } else if (!hoveredBubbleRef.current) {
          canvas.style.cursor = 'default'
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className='floating-bubbles-canvas'
    />
  )
}

export default FloatingBubblesCanvas
