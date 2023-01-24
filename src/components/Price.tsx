import React from 'react'
import { Delivery } from '../types'
import { calculateDeliveryFee } from '../utils/calculateDelivery'

const Price = (
  { deliveryData }:
  { deliveryData: Delivery }
): JSX.Element => {
  console.log(deliveryData)
  const calculationResult: number = calculateDeliveryFee(deliveryData)
  // const calculationResult: number = calculateDeliveryFee(deliveryData.cartValue, deliveryData.deliveryDistance, deliveryData.itemCount, deliveryData.orderDate, deliveryData.orderTime)

  return (
    <>
      <p>Price of delivery is {calculationResult}</p>
    </>
  )
}

export default Price
