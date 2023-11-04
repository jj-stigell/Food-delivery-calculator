import React from 'react'
import { Box, Typography } from '@mui/material'

export default function Logo (): JSX.Element {
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
        fontFamily: 'Yellowtail'
      }} variant="h1" component="h2">
        Wolt
      </Typography>
    </Box>
  )
}
