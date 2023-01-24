import React from 'react'
import { Delivery } from '../types'
import { calculateDeliveryFee } from '../utils/calculateDelivery'

const Price = (
  { deliveryData }:
  { deliveryData: Delivery }
): JSX.Element => {
  const calculationResult: number = calculateDeliveryFee(deliveryData)

  return (
    <>
      <p>Price of delivery is {calculationResult} €</p>
    </>
  )
}

export default Price
