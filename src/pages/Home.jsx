import React, { useState, useEffect } from 'react'
import './HomeStyles.css'

function Home() {
  // Configuración de las páginas disponibles con sus rutas, títulos y colores
  const pages = [
    {
      path: '/dad-jokes',
      title: 'Dad Jokes',
      colors: {
        start: '#673ab7',
        end: '#9c27b0',
        shadow: 'rgba(103, 58, 183, 0.7)',
      },
    },
    {
      path: '/yee-quote',
      title: 'Yee Quote',
      colors: {
        start: '#009688',
        end: '#4caf50',
        shadow: 'rgba(0, 150, 136, 0.7)',
      },
    },
    {
      path: '/events',
      title: 'Eventos',
      colors: {
        start: '#e91e63',
        end: '#f44336',
        shadow: 'rgba(233, 30, 99, 0.7)',
      },
    },
    {
      path: '/toys',
      title: 'Juguetes',
      colors: {
        start: '#ff5722',
        end: '#ff9800',
        shadow: 'rgba(255, 87, 34, 0.7)',
      },
    },
  ]

  // Estado para almacenar las páginas en orden aleatorio
  const [randomPages, setRandomPages] = useState([])

  // Barajar las páginas al montar el componente usando el algoritmo Fisher-Yates
  useEffect(() => {
    const shuffleArray = (array) => {
      const newArray = [...array]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
      }
      return newArray
    }

    setRandomPages(shuffleArray(pages))
    console.log('¡Páginas barajadas aleatoriamente! ¿A dónde te llevará cada botón? 🎲')
  }, [])

  // Función para manejar el clic con mensaje humorístico
  const handleClick = (page) => {
    // Mensajes humorísticos aleatorios
    const messages = [
      `¡Vaya! Has elegido ${page.title}. ¿Seguro que era lo que querías? 😜`,
      `¡${page.title} te espera! O eso crees tú... 🤔`,
      `Navegando a ${page.title}... ¡Espero que tengas suerte! 🍀`,
      `${page.title} cargando... ¿O quizás no? 🙃`,
      `¡Has descubierto ${page.title}! ¡Premio sorpresa! 🎁`,
    ]

    // Mostrar mensaje aleatorio en consola
    console.log(messages[Math.floor(Math.random() * messages.length)])

    // Navegar a la página
    window.location.href = page.path
  }

  return (
    <div className='home-container'>
      {/* Contenido principal */}
      <div className='home-content'>
        <h1>¡Seleccione una opción para comenzar!</h1>
        <p className='home-subtitle'>Cada vez que recargue la página, ¡los botones llevan a lugares diferentes! 🎲</p>

        <div className='home-links'>
          {randomPages.map((page, index) => (
            <div
              key={index}
              className='pulse-link'
              onClick={() => handleClick(page)}
              title={`¿Será realmente ${page.title}? 🤔`}
              style={{
                '--pulse-color-start': page.colors.start,
                '--pulse-color-end': page.colors.end,
                '--pulse-shadow-color': page.colors.shadow,
                animationDelay: `${index * 0.15}s`,
              }}>
              <span className='pulse-link-text'>{page.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Decoración de fondo */}
      <div className='home-background'>
        <div className='bg-gradient-1'></div>
        <div className='bg-gradient-2'></div>
      </div>
    </div>
  )
}

export default Home
