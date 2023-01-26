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
      <Typography variant="h2" color="white" component="h2">
        Wolt
      </Typography>
    </Box>
  )
}

export default Logo
