/* Type for delivery information. */
export interface Delivery {
  cartValue: number
  deliveryDistance: number
  itemCount: number
  orderDate: Date
  orderTime: string
}

/* Type for fee, limit indicates when the fee becomes applicable. */
export interface Fee {
  limit: number
  fee: number
}

/* Type for weekly occurring event. */
export interface WeeklyEvent {
  weekday: number
  startHour: number
  endHour: number
  timeZone: string
  multiplier: number
}
