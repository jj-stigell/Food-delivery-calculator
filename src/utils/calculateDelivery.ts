import { insideEvent, addSurcharge, addExtraItemFee, distanceFee } from './helpers'
import { Delivery } from '../types'
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

/**
 * Calculates the order delivery fee based on cart value, distance, item count and time of the order.
 * Uses helper functions for calculations.
 * @param {Delivery} deliveryData - Delivery data.
 * @returns {number} - Delivery fee amount.
 */
export function calculateDeliveryFee (deliveryData: Delivery): number {
  // Return 0 if cart value reaches the freeDeliveryLimit
  if (deliveryData.cartValue >= freeDeliveryLimit) return 0

  // Initialize delivery fee with the distance fee included
  let deliveryFee: number = distanceFee(deliveryData.deliveryDistance, deliveryFeeBase, deliveryExtended)

  // Add surcharges
  deliveryFee += addSurcharge(deliveryData.cartValue, surchargeLimit)

  // Add item surcharges and bulk fees accordingly
  deliveryFee += addExtraItemFee(deliveryData.itemCount, itemSurcharge)
  deliveryFee += addExtraItemFee(deliveryData.itemCount, bulkItemFee)

  // If during rush hour time, multiply fee accordingly
  if (insideEvent(new Date(`${deliveryData.orderDate.toString()}T${deliveryData.orderTime}`), rushHour)) deliveryFee *= rushHour.multiplier

  // Return minimum from delivery fee and maxFreeDelivery
  return Math.min(deliveryFee, maxDeliveryFee)
}
