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
