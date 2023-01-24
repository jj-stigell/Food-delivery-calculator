/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */

import * as config from './config'
import { calculateDeliveryFee } from './calculateDelivery'
import { Delivery } from '../types'

/*
export interface Delivery {
  cartValue: number
  deliveryDistance: number
  itemCount: number
  orderDate: Date
  orderTime: string
}
*/

describe('Test delivery calculator', () => {
  
  it('Delivery should be free (0 euro) when cart value is equal or higher than freeDeliveryLimit', async () => {

    const testCart: Delivery = config.initialDeliveryState

    // should be free when equal to limit
    let deliveryFee: number = calculateDeliveryFee({ ...testCart, cartValue: config.freeDeliveryLimit })
    expect(deliveryFee).toBe(0)

    // should be free when over the limit
    deliveryFee = calculateDeliveryFee({ ...testCart, cartValue: config.freeDeliveryLimit + 1 })
    expect(deliveryFee).toBe(0)

    // should be not be free when over the limit
    deliveryFee = calculateDeliveryFee({ ...testCart, cartValue: config.freeDeliveryLimit - 1 })
    expect(deliveryFee).not.toBe(0)
  })

})
