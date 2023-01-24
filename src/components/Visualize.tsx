/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
import React from 'react'
import { Delivery } from '../types'
// import { foodEmoji } from '../utils/config'

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
      <p>&#128054;</p>
      <p>😀</p>
      <br />
    </>
  )
}

export default Visualize
