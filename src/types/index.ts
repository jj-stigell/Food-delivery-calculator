export interface Delivery {
  cartValue: number
  deliveryDistance: number
  itemCount: number
  orderDate: Date
  orderTime: string
}

export interface Fee {
  limit: number
  fee: number
}

export interface WeeklyEvent {
  weekday: number
  startHour: number
  endHour: number
  timeZone: string
  multiplier: number
}
