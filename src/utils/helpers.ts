import {
  freeDeliveryLimit,
  deliveryFeeBase,
  maxDeliveryFee,
  surchargeLimit,
  itemSurcharge,
  bulkItemFee,
  rushHour
} from '../config/config'
import { Delivery, Fee, WeeklyEvent } from '../types'
import { calculateDeliveryFee } from './calculateDelivery'

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
 * Add extra fee for each item over the extraCharge limit.
 * Multiply by extraCharge fee with the amount of items over the limit.
 * @param {number} itemCount - How many items.
 * @param {Fee} extraCharge - Contains the limit after which extra charge is added and fee per item.
 */
export function addExtraItemFee (itemCount: number, extraCharge: Fee): number {
  if (itemCount >= extraCharge.limit) {
    return (itemCount - extraCharge.limit + 1) * extraCharge.fee
  }
  return 0
}
/**
 * Calculate delivery fee based on initial distance + extented distance.
 * @param {Delivery} deliveryData - Delivery data.
 * @param {Fee} deliveryFeeBase - Base delivery starting distance and unit price.
 * @param {Fee} deliveryExtended - Extended delivery starting distance and unit price.
 * @returns {number} - Delivery fee amount for particular distance.
 */
export function distanceFee (deliveryData: Delivery, deliveryFeeBase: Fee, deliveryExtended: Fee): number {
  // If distance more than base limit, increase fee according to extended fee, round the multiplier up to closest whole number
  if (deliveryData.deliveryDistance > deliveryFeeBase.limit) {
    const extendedFeeMultiplier: number = Math.ceil((deliveryData.deliveryDistance - deliveryFeeBase.limit) / deliveryExtended.limit)
    return extendedFeeMultiplier * deliveryExtended.fee
  }
  return deliveryFeeBase.fee
}

/**
 * Returns short hint message concerning the delivery status.
 * @param {Delivery} deliveryData - Delivery data.
 * @returns {string} - String message.
 */
export function hintCreator (deliveryData: Delivery): string {
  const deliveryFee = calculateDeliveryFee(deliveryData)

  if (deliveryData.cartValue >= freeDeliveryLimit) {
    return 'FREE DELIVERY!!! 😍😍😍'
  }

  if (deliveryFee >= maxDeliveryFee) {
    return `Maximum delivery fee of ${maxDeliveryFee} € reached 🤑`
  }

  // There is exists a limit to laziness...
  if (deliveryData.deliveryDistance < 100) {
    return 'At this distance maybe it would be better to just walk... 🙄'
  }

  // If delivery is close to free delivery, give a hint to add some stuff
  if (freeDeliveryLimit - deliveryData.cartValue < 10) {
    return `You are close to free delivery, just add ${freeDeliveryLimit - deliveryData.cartValue} € worth of stuff in the cart and the delivery is free! 👀🔥🔥`
  }

  const deliveryDateAndTime: Date = new Date(`${deliveryData.orderDate.toString()}T${deliveryData.orderTime}`)

  if (deliveryDateAndTime.getDay() === rushHour.weekday) {
    if (insideEvent(deliveryDateAndTime, rushHour)) {
      return `It is rush hour time, delivery fee will be multiplied by ${rushHour.multiplier} 😱`
    }

    // Give heads up, if rush hour day but not rush hour time
    return `Fridays can be quite busy, beware of the rush hour fee between ${rushHour.startHour} - ${rushHour.endHour}! 😓`
  }

  if (deliveryData.itemCount >= bulkItemFee.limit) {
    return `If item count is equal or over ${bulkItemFee.limit}, a separate bulk fee of ${bulkItemFee.fee} € is added per item over ${bulkItemFee.limit}. 😵`
  }

  if (deliveryData.itemCount >= itemSurcharge.limit) {
    return `If item count is equal or over ${itemSurcharge.limit}, a separate surcharge fee of ${itemSurcharge.fee} € is added per item over ${itemSurcharge.limit}. 🫣`
  }

  return `Let's calculate the delivery fees! Base fee is ${deliveryFeeBase.fee} € + possible surcharge when when cart value less than surcharge limit ${surchargeLimit} € 🚴🏻‍♀️🚴🏽‍♀️`
}
