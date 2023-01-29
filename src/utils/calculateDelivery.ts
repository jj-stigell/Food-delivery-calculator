import {
  freeDeliveryLimit,
  maxDeliveryFee,
  surchargeLimit,
  deliveryFeeBase,
  deliveryExtended,
  surcharge,
  bulkFee,
  rushHour
} from '../config/config'
import { Delivery } from '../types'
import { insideEvent, addSurcharge } from './helpers'

export function calculateDeliveryFee (data: Delivery): number {
  let deliveryFee: number = deliveryFeeBase.fee
  const deliveryDateAndTime: Date = new Date(`${data.orderDate.toString()}T${data.orderTime}`)

  if (data.cartValue >= freeDeliveryLimit) return 0

  deliveryFee += addSurcharge(data.cartValue, surchargeLimit)

  if (data.deliveryDistance > deliveryFeeBase.limit) {
    // If distance more than base limit, increase fee according to extended fee, round the multiplier up to closest whole number
    const extededFeeMultiplier: number = Math.ceil((data.deliveryDistance - deliveryFeeBase.limit) / deliveryExtended.limit)
    deliveryFee += extededFeeMultiplier * deliveryExtended.fee
  }

  if (data.itemCount >= surcharge.limit) {
    // Add surcharge fee if item count is equal or higher than sircharge item limit
    deliveryFee += (data.itemCount - surcharge.limit + 1) * surcharge.fee
  }

  if (data.itemCount >= bulkFee.limit) {
    // Add extra bulk fee if item count is equal or higher than bulk limit
    deliveryFee += (data.itemCount - bulkFee.limit + 1) * bulkFee.fee
  }

  if (insideEvent(deliveryDateAndTime, rushHour)) {
    // If rush hour add fee accordingly
    deliveryFee *= rushHour.multiplier
  }

  // Return minimum from delivery fee and maxFreeDelivery
  return Math.min(deliveryFee, maxDeliveryFee)
}
