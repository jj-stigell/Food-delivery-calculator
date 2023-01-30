import React from 'react'
import { Delivery } from '../../types'
import { hintCreator } from '../../utils/helpers'

const Hint = (
  { deliveryData }:
  { deliveryData: Delivery }
): JSX.Element => {
  const hint: string = hintCreator(deliveryData)

  return (
    <>
      {hint}
    </>
  )
}

export default Hint
