import React from 'react'
import { Box } from '@mui/material'
import logo from '../static/logo.png'

function Logo (): JSX.Element {
  return (
    <Box
      sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <img alt="Wolt logo" src={logo} style={{ width: 130, height: 60 }} />
    </Box>
  )
}

export default Logo
