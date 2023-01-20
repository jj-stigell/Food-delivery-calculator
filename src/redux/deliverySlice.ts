// https://redux.js.org/usage/usage-with-typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface DeliveryState {
  cartValue: number
  deliverDistance: number
  itemCount: number
  orderTime: Date
}

const initialState: DeliveryState = {
  cartValue: 1,
  deliverDistance: 900,
  itemCount: 1,
  orderTime: new Date()
}

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<DeliveryState>) => {
      state = action.payload
    }
  }
})

export const { updateState } = deliverySlice.actions

export const cartValue = (state: RootState): number => state.delivery.cartValue
export const deliverDistance = (state: RootState): number => state.delivery.deliverDistance
export const itemCount = (state: RootState): number => state.delivery.itemCount
export const orderTime = (state: RootState): Date => state.delivery.orderTime

export default deliverySlice.reducer
