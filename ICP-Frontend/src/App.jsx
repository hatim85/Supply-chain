import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from "react-router-dom";
import { Distributor, Home, Hospital, Manufacturer, Wholesaler } from './pages'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/manufacturer" element={<Manufacturer />} />
        <Route path="/dashboard/wholesaler" element={<Wholesaler />} />
        <Route path="/dashboard/distributor" element={<Distributor />} />
        <Route path="/dashboard/hospital" element={<Hospital />} />
        {/* other routes... */}
      </Routes>
    </>
  )
}

export default App
