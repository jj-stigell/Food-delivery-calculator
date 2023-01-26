import {
  freeDeliveryLimit,
  deliveryFeeBase,
  surcharge,
  bulkFee,
  rushHour
} from '../config/config'
import { Delivery } from '../types'

/**
 * Normalizes value to be between MIN and MAX.
 * @param {number} value - value between the MIN and MAX.
 * @param {number} MIN - Minimum value of the range.
 * @param {number} MAX - Maximum value of the range.
 * @returns {number} - Normalized value.
 */
export const normalize = (value: number, MIN: number, MAX: number): number => ((value - MIN) * 100) / (MAX - MIN)

/**
 * Returns short hint message concerning the delivery status.
 * @param {Delivery} data - Delivery data.
 * @returns {string} - String message.
 */
export function hintCreator (data: Delivery): string {
  if (data.cartValue >= freeDeliveryLimit) {
    return 'FREE DELIVERY!!! 😍😍😍'
  }

  // There is exists a limit to laziness...
  if (data.deliveryDistance < 100) {
    return 'At this distance maybe it would be better to just walk... 🙄'
  }

  // If delivery is close to free delivery, give a hint to add some stuff
  if (freeDeliveryLimit - data.cartValue < 10) {
    return `You are close to free delivery, just add ${freeDeliveryLimit - data.cartValue} € worth of stuff in the cart and the delivery is free! 👀🔥🔥`
  }

  const deliveryDate: Date = new Date(`${data.orderDate.toString()}T${data.orderTime}`)

  if (deliveryDate.getDay() === rushHour.weekday) {
    if (deliveryDate.getHours() >= rushHour.startHour && deliveryDate.getHours() <= rushHour.endHour) {
      return `It is rush hour time, delivery fee will be multiplied by ${rushHour.multiplier} 😱`
    }

    // Give heads up, if rush hour day but not rush hour time
    return `Fridays can be quite busy, beware of the rush hour fee between ${rushHour.startHour} - ${rushHour.endHour}! 😓`
  }

  if (data.itemCount >= bulkFee.limit) {
    return `If item count is equal or over ${bulkFee.limit}, a separate bulk fee of ${bulkFee.fee} € is added per item over ${bulkFee.limit}. 😵`
  }

  if (data.itemCount >= surcharge.limit) {
    return `If item count is equal or over ${surcharge.limit}, a separate surcharge fee of ${surcharge.fee} € is added per item over ${surcharge.limit}. 🫣`
  }

  return `Let's calculate the delivery fees! Base fee is ${deliveryFeeBase.fee} € 🚴🏻‍♀️🚴🏽‍♀️`
}
