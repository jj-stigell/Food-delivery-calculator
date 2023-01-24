/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
import {
  freeDeliveryLimit,
  maxDeliveryFee,
  surchargeLimit,
  deliveryFeeBase,
  deliveryExtended,
  surcharge,
  bulkFee,
  rushHour
} from './config'
import { Delivery } from '../types'

export function hintCreator (data: Delivery): string {

  if (data.deliveryDistance < 10) {
    return 'At this distance maybe it would be better to just walk... 🙄'
  }

  if (freeDeliveryLimit === data.cartValue) {
    return 'FREE DELIVERY!!! 😍😍😍'
  }

  // If delivery is close to free delivery, give a hint to add some stuff
  if (freeDeliveryLimit - data.cartValue < 10) {
    return `You are close to free delivery, just add ${freeDeliveryLimit - data.cartValue} € worth of stuff in cart and the delivery is free! 👀🔥🔥`
  }

  const deliveryDate: Date = new Date(`${data.orderDate.toString()}T${data.orderTime}`)

  if (
    deliveryDate.getDay() === rushHour.weekday &&
    deliveryDate.getHours() >= rushHour.startHour &&
    deliveryDate.getHours() <= rushHour.endHour
  ) {
    // return `It is rush hour time, delivery fee will be multiplied by ${rushHour.multiplier} 😱`
    return 'It is rush hour time, delivery fee will be multiplied by 1.3 😱'
  }

  return 'Fridays can be quite busy, beware of the rush hour fee! 😓'
}
