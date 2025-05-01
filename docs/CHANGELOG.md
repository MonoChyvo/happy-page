# Registro de Cambios (CHANGELOG)

Este archivo documenta todos los cambios notables realizados en el proyecto. El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

## [Unreleased]

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
