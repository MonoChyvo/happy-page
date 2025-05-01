# Registro de Cambios (CHANGELOG)

Este archivo documenta todos los cambios notables realizados en el proyecto. El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

## [Unreleased]

### Añadido

- Implementación completamente nueva de burbujas flotantes utilizando Canvas HTML5
- Las burbujas flotan libremente desde el inicio con física natural
- Sistema de colisiones con los bordes del contenedor para mantener las burbujas visibles
- Efectos visuales mejorados con gradientes para simular burbujas reales
- Interacción mejorada con efectos de hover y clic
- Mayor opacidad en las burbujas para mejor visibilidad (95%)
- Efecto de brillo y sombra al hacer hover similar al diseño original

### Optimizado

- Eliminación de timeouts innecesarios en la animación de burbujas para evitar pausas perceptibles
- Mejora en la fluidez de la animación de burbujas con transición desde el centro
- Optimización del rendimiento de las animaciones utilizando técnicas avanzadas de JavaScript
- Reducción del tiempo de animación para una experiencia más ágil (800ms)
- Implementación de interpolación suave entre posiciones iniciales y finales
- Mejora en la gestión de referencias a elementos DOM para mayor eficiencia

### Corregido

- Solucionado problema de visibilidad de las burbujas: ahora todas las burbujas son visibles desde el inicio con una opacidad de 0.4
- Eliminada la animación de aparición gradual para mostrar todas las burbujas inmediatamente
- Simplificada la lógica de animación para mantener las burbujas en sus posiciones finales con pequeños movimientos aleatorios

### Mejorado

- Limpieza de código y eliminación de variables no utilizadas
- Optimización del renderizado con mejores prácticas de React
- Uso de `translate3d` para mejor rendimiento en la animación
- Añadidos atributos ARIA para mejorar la accesibilidad
- Optimización de CSS con `backface-visibility: hidden` y `transform-style: preserve-3d` para mejor rendimiento
- Eliminación de archivos no utilizados y código redundante
- Separación clara de responsabilidades con componentes modulares
- Mejora en la estructura del proyecto con archivos CSS específicos

## [1.0.0] - 2025-05-01

### Añadido

- Implementación del componente `EnhancedBubbleNavigation` para mejorar la experiencia de usuario
- Nuevas animaciones optimizadas para las burbujas de navegación
- Efectos visuales mejorados para los estados hover de las burbujas

### Cambiado

- Rediseño completo del sistema de navegación de burbujas
- Optimización de la aparición de burbujas para que sea más rápida y fluida
- Mayor transparencia en el estado normal de las burbujas (opacidad 0.4)
- Reducción de los tiempos de animación para una experiencia más ágil

### Eliminado

- Componentes redundantes de navegación (`BubbleNavigation`, `BubbleNavigationAlt`, etc.)
- Mecanismo de respaldo que cambiaba entre componentes después de 3 segundos
- Código no utilizado y archivos CSS duplicados

### Optimizado

- Uso de `useMemo` y `useCallback` para mejorar el rendimiento
- Implementación de `requestAnimationFrame` para animaciones más fluidas
- Limitación de la duración de las animaciones para ahorrar recursos
- Mejor estructura de código y documentación
