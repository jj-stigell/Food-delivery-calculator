import { Delivery, Fee, WeeklyEvent } from '../types'

export const initialDeliveryState: Delivery = {
  cartValue: 1,
  deliveryDistance: 900,
  itemCount: 1,
  orderDate: new Date('2023-01-01'),
  orderTime: '10:00'
}

/**
 * If the cart value is less than surchargeLimit, a small order surcharge is added to the delivery price.
 * The surcharge is the difference between the cart value and surchargeLimit. For example if the cart value
 * is 8.90€ and surchargeLimit is 10€, the surcharge will be 1.10€.
 */
export const surchargeLimit: number = 10

/** The delivery fee can never be more than maxDeliveryFee, including possible surcharges. */
export const maxDeliveryFee: number = 15

/** The delivery is free (0€) when the cart value is equal or more than freeDeliveryLimit. */
export const freeDeliveryLimit: number = 100

/**
 * A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than
 * that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching
 * the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.
 *
 * Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
 * Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
 * Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€
 */
export const deliveryFeeBase: Fee = { limit: 1000, fee: 2 }
export const deliveryExtended: Fee = { limit: 500, fee: 1 }

/**
 * If the number of items is 5 or more, an additional 50 cent surcharge is added for each item
 * above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€.
 *
 * Example 1: If the number of items is 4, no extra surcharge
 * Example 2: If the number of items is 5, 50 cents surcharge is added
 * Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added
 * Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)
 */
export const surcharge: Fee = { limit: 5, fee: 0.50 }
export const bulkFee: Fee = { limit: 12, fee: 1.20 }

/**
 * During the Friday rush (3 - 7 PM UTC), the delivery fee (the total fee including possible surcharges)
 * will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€).
 * Weekday is expressed as number, 0 = 'sunday', 1 = 'monday',..., 6 = 'Saturday'.
 */
export const rushHour: WeeklyEvent = {
  weekday: 5,
  startHour: 15,
  endHour: 19,
  timeZone: 'UTC',
  multiplier: 1.2
}

export const foodEmoji: string[] = [
  '&#127846;',
  '&#127849;',
  '&#127829;',
  '&#127828;',
  '&#127789;',
  '&#127791;',
  '&#129369;',
  '&#127857;',
  '&#127837;',
  '&#127843;'
]
