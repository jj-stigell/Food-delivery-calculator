import React from 'react'
// import './App.css'
import Calculator from './pages/Calculator'
import Logo from './components/Logo'

function App (): JSX.Element {
  return (
    <div className="App" style={{ backgroundColor: '#00c2e8' }}>
      <Logo />
      <Calculator />
    </div>
  )
}

export default App
