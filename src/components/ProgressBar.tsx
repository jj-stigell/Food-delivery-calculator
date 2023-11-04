import React from 'react'
import { LinearProgress, Box, linearProgressClasses } from '@mui/material'
import { styled } from '@mui/material/styles'
import { normalize } from '../utils/helpers'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[300]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#308fe8'
  }
}))

export default function ProgressBar (
  { value, MIN, MAX, message }:
  { value: number, MIN: number, MAX: number, message: string | null }
): JSX.Element {
  const normalizedValue: number = normalize(value, MIN, MAX)

  return (
    <Box sx={{ width: '50%', mr: 1 }}>
      <BorderLinearProgress variant="determinate" value={normalizedValue} /> {message}
    </Box>
  )
}
