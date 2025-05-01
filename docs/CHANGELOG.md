# Registro de Cambios (CHANGELOG)

Este archivo documenta todos los cambios notables realizados en el proyecto. El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

## [Unreleased]

### Añadido

- Iconos visuales para cada burbuja (emoji) para mejorar la experiencia visual
- Efecto de "salto" al hacer hover sobre las burbujas
- Efecto de "presionar" al hacer clic en las burbujas
- Indicador visual de enlace (flecha) al hacer hover
- Colores más vibrantes para las burbujas
- Sombras de texto para mejor legibilidad
- Efecto 3D con borde exterior en las burbujas
- Sistema de pruebas automatizadas con logging detallado para el componente de burbujas
- Botón visual para ejecutar pruebas (🧪) en la esquina inferior derecha
- Atajo de teclado (Alt+B) para ejecutar pruebas automatizadas
- Pruebas de rendimiento, comportamiento y optimizaciones para las burbujas
- Implementación completamente nueva de burbujas flotantes utilizando Canvas HTML5
- Las burbujas flotan libremente desde el inicio con física natural
- Sistema de colisiones con los bordes del contenedor para mantener las burbujas visibles
- Efectos visuales mejorados con gradientes para simular burbujas reales
- Interacción mejorada con efectos de hover y clic
- Mayor opacidad en las burbujas para mejor visibilidad (95%)
- Efecto de brillo y sombra al hacer hover similar al diseño original
- Atributos ARIA para mejorar la accesibilidad en el componente Canvas

### Optimizado

- Mejora en la implementación de caché de gradientes:
  - Invalidación selectiva basada en cambios significativos de posición
  - Seguimiento de posiciones anteriores para comparación eficiente
  - Reducción drástica en la creación de objetos por frame
- Optimización de cálculos matemáticos usando distancias al cuadrado en lugar de raíces cuadradas
- Reducción de la frecuencia de aceleraciones aleatorias (cada 5 frames en lugar de cada frame)
- Implementación de debounce para el evento de redimensionamiento de ventana
- Preservación de posiciones de burbujas durante el redimensionamiento
- Verificación de hover solo cuando el mouse se mueve, no en cada frame
- Uso de `useCallback` para memoizar funciones y evitar recreaciones innecesarias
- Eliminación de timeouts innecesarios en la animación de burbujas para evitar pausas perceptibles
- Mejora en la fluidez de la animación de burbujas con transición desde el centro
- Optimización del rendimiento de las animaciones utilizando técnicas avanzadas de JavaScript
- Reducción del tiempo de animación para una experiencia más ágil
- Implementación de interpolación suave entre posiciones iniciales y finales
- Mejora en la gestión de referencias a elementos DOM para mayor eficiencia

### Corregido

- Solucionado problema de visibilidad de las burbujas: ahora todas las burbujas son visibles desde el inicio con alta opacidad (0.8)
- Eliminada la animación de aparición gradual para mostrar todas las burbujas inmediatamente
- Simplificada la lógica de animación para mantener las burbujas en sus posiciones finales con pequeños movimientos aleatorios
- Corregido problema potencial de burbujas saliendo de los límites de la pantalla durante el redimensionamiento

### Mejorado

- Limpieza de código y eliminación de variables no utilizadas
- Optimización del renderizado con mejores prácticas de React
- Uso de técnicas modernas de optimización para Canvas
- Añadidos atributos ARIA para mejorar la accesibilidad
- Eliminación de archivos no utilizados y código redundante
- Separación clara de responsabilidades con componentes modulares
- Mejora en la estructura del proyecto con archivos CSS específicos
- Implementación de estructura de código más mantenible y escalable

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
