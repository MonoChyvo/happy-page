import React from 'react'
import './PageStyles.css'

function Events() {
  return (
    <div className='page-container events-container'>
      <h1>Eventos</h1>
      <p>Descubre los próximos eventos y no te pierdas ninguna actividad.</p>

      <div className='content-card'>
        <h2>Próximo Evento</h2>
        <p>Conferencia de Desarrollo Web - 15 de Diciembre, 2023</p>
        <p>Aprende las últimas tendencias en desarrollo web con expertos de la industria.</p>
      </div>

      <div className='content-card'>
        <h2>Calendario</h2>
        <p>Consulta nuestro calendario completo de eventos para los próximos meses.</p>
      </div>
    </div>
  )
}

export default Events
