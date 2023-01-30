import React from 'react'
import { Box, Typography } from '@mui/material'

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
      <Typography sx={{
        textShadow: '3px 3px #1167a8',
        color: 'white',
        fontFamily: 'Brush Script MT'
      }} variant="h1" component="h2">
        Wolt
      </Typography>
    </Box>
  )
}

export default Logo
