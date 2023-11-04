import React from 'react'
import { Delivery } from '../../types'
import { calculateDeliveryFee } from '../../utils/calculateDelivery'
import { freeDeliveryLimit } from '../../config/config'
import ProgressBar from '../../components/ProgressBar'
import { Typography } from '@mui/material'

export default function Price (
  { deliveryData }:
  { deliveryData: Delivery }
): JSX.Element {
  const calculationResult: number = calculateDeliveryFee(deliveryData)

  return (
    <>
      <Typography sx={{ p: 1 }}>
        Price of delivery is {calculationResult.toFixed(2)} €
      </Typography>
      { deliveryData.cartValue < freeDeliveryLimit &&
        <ProgressBar
          value={deliveryData.cartValue}
          MIN={0}
          MAX={freeDeliveryLimit}
          message={`${freeDeliveryLimit - deliveryData.cartValue} € until free delivery! 😎`}
        />
      }
    </>
  )
}
