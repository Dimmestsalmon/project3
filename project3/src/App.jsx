import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Queue from './components/Queue';
import Events from './components/Events';
import Users from './components/Users';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/events" element={<Events />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  )
}

export default App
