import React from 'react'
import Calculator from './views/calculator'
import Logo from './components/Logo'
import { useTheme } from '@mui/material'

export default function App (): JSX.Element {
  const theme = useTheme()
  return (
    <div style={{ backgroundColor: theme.palette.primary.main, minHeight: '100vh' }}>
      <Logo />
      <Calculator />
    </div>
  )
}
