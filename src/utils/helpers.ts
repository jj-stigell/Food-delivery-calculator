import {
  freeDeliveryLimit,
  deliveryFeeBase,
  surchargeLimit,
  surcharge,
  bulkFee,
  rushHour
} from '../config/config'
import { Delivery, WeeklyEvent } from '../types'

/**
 * Normalizes value to range of 0 to 100.
 * @param {number} value - value between the MIN and MAX.
 * @param {number} MIN - Minimum value of the range.
 * @param {number} MAX - Maximum value of the range.
 * @returns {number} - Normalized value.
 */
export function normalize (value: number, MIN: number, MAX: number): number {
  let fixedValue = value
  if (value > MAX) fixedValue = MAX
  if (value < MIN) fixedValue = MIN
  return ((fixedValue - MIN) * 100) / (MAX - MIN)
}

/**
 * Check is date and time falls under the events time slot.
 * @param {Date} dateAndTime - Date and time to which the event time is compared to.
 * @param {WeeklyEvent} event - Event information.
 * @returns {boolean} - True if date and time are inside the events period of time, false if outside of that time period.
 */
export function insideEvent (dateAndTime: Date, event: WeeklyEvent): boolean {
  return (dateAndTime.getDay() === event.weekday &&
  dateAndTime.getHours() >= event.startHour &&
  dateAndTime.getHours() <= event.endHour &&
  dateAndTime.getMinutes() === 0)
}

/**
 * Calculate and return surcharge amount, which is the difference of cart value and surchargeLimit.
 * @param {number} cartValue - Current value of the users cart.
 * @param {number} surchargeLimit - Limit under which the surcharge is added.
 * @returns {number} - Amount of surcharge added.
 */
export function addSurcharge (cartValue: number, surchargeLimit: number): number {
  return Math.max(0, surchargeLimit - cartValue)
}

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

  const deliveryDateAndTime: Date = new Date(`${data.orderDate.toString()}T${data.orderTime}`)

  if (deliveryDateAndTime.getDay() === rushHour.weekday) {
    if (insideEvent(deliveryDateAndTime, rushHour)) {
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

  return `Let's calculate the delivery fees! Base fee is ${deliveryFeeBase.fee} € + possible surcharge when when cart value less than surcharge limit ${surchargeLimit} € 🚴🏻‍♀️🚴🏽‍♀️`
}
