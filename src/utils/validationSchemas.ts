import * as yup from 'yup'

export const validateDeliveryInput: yup.AnySchema = yup.object({
  cartValue: yup
    .number()
    .min(1, 'must be bigger than 0')
    .required('cart value required'),
  deliveryDistance: yup
    .number()
    .min(1, 'must be bigger than 0')
    .required('delivery distance value required'),
  itemCount: yup
    .number()
    .min(1, 'must be bigger than 0')
    .required('item count value required'),
  orderDate: yup
    .date()
    .required('delivery date required'),
  orderTime: yup
    .string()
    .required('delivery time required')
})
