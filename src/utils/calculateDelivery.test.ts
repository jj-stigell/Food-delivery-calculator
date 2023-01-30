import * as config from '../config/config'
import { calculateDeliveryFee } from './calculateDelivery'
import { Delivery } from '../types'

let testCart: Delivery = config.initialDeliveryState
let deliveryFee: number

afterEach(() => {
  testCart = config.initialDeliveryState
})

describe('Test delivery calculator', () => {
  it(`Delivery fee should be free (0 euro) when cart value is equal or higher than 'freeDeliveryLimit' ${config.freeDeliveryLimit}`, async () => {
    // should be 0 when equal to limit
    deliveryFee = calculateDeliveryFee({ ...testCart, cartValue: config.freeDeliveryLimit })
    expect(deliveryFee).toBe(0)

    // should be 0 when over the limit
    deliveryFee = calculateDeliveryFee({ ...testCart, cartValue: config.freeDeliveryLimit + 1 })
    expect(deliveryFee).toBe(0)
  })

  it(`Delivery fee should not be free (0 euro) when cart value is less than 'freeDeliveryLimit' ${config.freeDeliveryLimit}`, async () => {
    deliveryFee = calculateDeliveryFee({ ...testCart, cartValue: config.freeDeliveryLimit - 0.01 })
    expect(deliveryFee).toBeGreaterThan(0)
  })

  it(`Maximum delivery fee should not be over the 'maxDeliveryFee' ${config.maxDeliveryFee}`, async () => {
    deliveryFee = calculateDeliveryFee({ ...testCart, itemCount: 100 })
    expect(deliveryFee).toBe(config.maxDeliveryFee)

    deliveryFee = calculateDeliveryFee({ ...testCart, deliveryDistance: 10000000 })
    expect(deliveryFee).toBe(config.maxDeliveryFee)
  })
})
