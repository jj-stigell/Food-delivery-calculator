/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
import {
  freeDeliveryLimit,
  maxDeliveryFee,
  surchargeLimit,
  deliveryFeeBase,
  deliveryExtended,
  surcharge,
  bulkFee

} from './config'
import { Delivery } from '../types'

/*
If the cart value is less than 10€, a small order surcharge is added to the delivery price.
The surcharge is the difference between the cart value and 10€. For example if the cart value
is 8.90€, the surcharge will be 1.10€.

A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than
that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching
the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.

Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€

If the number of items is five or more, an additional 50 cent surcharge is added for each item
above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€

Example 1: If the number of items is 4, no extra surcharge
Example 2: If the number of items is 5, 50 cents surcharge is added
Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added
Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)

The delivery fee can never be more than 15€, including possible surcharges.

The delivery is free (0€) when the cart value is equal or more than 100€.

During the Friday rush (3 - 7 PM UTC), the delivery fee (the total fee including possible surcharges)
will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€).
*/

export function calculateDeliveryFee (data: Delivery): number {
  let deliveryFee: number = deliveryFeeBase.fee

  if (data.cartValue >= freeDeliveryLimit) return 0

  if (data.cartValue < surchargeLimit) {
    // Add surcharge to the deliveryFee
    deliveryFee += surchargeLimit - data.cartValue
  }

  if (data.deliveryDistance > deliveryFeeBase.limit) {
    // If distance more than base limit, increase fee according to extended fee, round the multiplyer up to closest whole number
    const extededFeeMultiplyer: number = Math.ceil((data.deliveryDistance - deliveryFeeBase.limit) / deliveryExtended.limit)
    deliveryFee += extededFeeMultiplyer * deliveryExtended.fee
  }

  if (data.itemCount >= surcharge.limit) {
    // Add surcharge fee if item count is equal or higher than sircharge item limit
    deliveryFee += (data.itemCount - surcharge.limit + 1) * surcharge.fee
  }

  if (data.itemCount >= bulkFee.limit) {
    // Add extra bulk fee if item count is equal or higher than bulk limit
    deliveryFee += (data.itemCount - bulkFee.limit + 1) * bulkFee.fee
  }






  /*
During the Friday rush (3 - 7 PM UTC), the delivery fee (the total fee including possible surcharges)
will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€).
  */












  

  return Math.min(deliveryFee, maxDeliveryFee)
}
