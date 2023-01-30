import {
  freeDeliveryLimit,
  maxDeliveryFee,
  surchargeLimit,
  deliveryFeeBase,
  deliveryExtended,
  itemSurcharge,
  bulkItemFee,
  rushHour
} from '../config/config'
import { Delivery } from '../types'
import { insideEvent, addSurcharge, addExtraItemFee } from './helpers'

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

  deliveryFee += addExtraItemFee(data.itemCount, itemSurcharge)
  deliveryFee += addExtraItemFee(data.itemCount, bulkItemFee)

  if (insideEvent(deliveryDateAndTime, rushHour)) {
    // If rush hour, multiply fee accordingly
    deliveryFee *= rushHour.multiplier
  }

  // Return minimum from delivery fee and maxFreeDelivery
  return Math.min(deliveryFee, maxDeliveryFee)
}
