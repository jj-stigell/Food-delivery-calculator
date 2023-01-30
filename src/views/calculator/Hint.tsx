import React from 'react'
import { Typography } from '@mui/material'
import { Delivery } from '../../types'
import { hintCreator } from '../../utils/helpers'

const Hint = (
  { deliveryData }:
  { deliveryData: Delivery }
): JSX.Element => {
  const hint: string = hintCreator(deliveryData)

  return (
    <Typography sx={{ p: 2 }}>
      {hint}
    </Typography>
  )
}

export default Hint
