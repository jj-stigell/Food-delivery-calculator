import React from 'react'
import { Delivery } from '../types'

const Visualize = (
  { deliveryData }:
  { deliveryData: Delivery }
): JSX.Element => {
  return (
    <>
      <p>{deliveryData.cartValue}</p>
      <br />
      <p>{deliveryData.deliveryDistance}</p>
      <br />
      <p>{deliveryData.itemCount}</p>
      <br />
    </>
  )
}

export default Visualize
