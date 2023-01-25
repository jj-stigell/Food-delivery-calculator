import React from 'react'
import { Delivery } from '../types'
import { hintCreator } from '../utils/helpers'

const Tip = (
  { deliveryData }:
  { deliveryData: Delivery }
): JSX.Element => {
  const hint: string = hintCreator(deliveryData)

  return (
    <>
      <p>{hint}</p>
    </>
  )
}

export default Tip