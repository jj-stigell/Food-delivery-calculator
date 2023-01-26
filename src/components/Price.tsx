import React from 'react'
import { Delivery } from '../types'
import { calculateDeliveryFee } from '../utils/calculateDelivery'
import { freeDeliveryLimit } from '../config/config'
import ProgressBar from './ProgressBar'

const Price = (
  { deliveryData }:
  { deliveryData: Delivery }
): JSX.Element => {
  const calculationResult: number = calculateDeliveryFee(deliveryData)

  return (
    <>
      <p>Price of delivery is {calculationResult.toFixed(2)} €</p>
      { deliveryData.cartValue < freeDeliveryLimit &&
      <ProgressBar value={deliveryData.cartValue} MIN={0} MAX={freeDeliveryLimit} message={`${freeDeliveryLimit - deliveryData.cartValue} € until free delivery! 😎`} />
      }
    </>
  )
}

export default Price
