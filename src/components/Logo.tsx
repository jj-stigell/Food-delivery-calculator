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
      <Typography variant="h1" color="white" component="h2" fontFamily="Brush Script MT">
        Wolt
      </Typography>
    </Box>
  )
}

export default Logo
