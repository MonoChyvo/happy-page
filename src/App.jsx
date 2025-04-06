import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Páginas
import Home from './pages/Home'
import DadJokes from './pages/DadJokes'
import YeeQuote from './pages/YeeQuote'
import Events from './pages/Events'
import Toys from './pages/Toys'

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <main className='main-content'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/dad-jokes'
              element={<DadJokes />}
            />
            <Route
              path='/yee-quote'
              element={<YeeQuote />}
            />
            <Route
              path='/events'
              element={<Events />}
            />
            <Route
              path='/toys'
              element={<Toys />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
