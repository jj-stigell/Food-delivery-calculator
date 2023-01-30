import React from 'react'
import Calculator from './views/calculator'
import Logo from './components/Logo'
import { useTheme } from '@mui/material'

function App (): JSX.Element {
  const theme = useTheme()
  return (
    <div style={{ backgroundColor: theme.palette.primary.main }}>
      <Logo />
      <Calculator />
    </div>
  )
}

export default App
