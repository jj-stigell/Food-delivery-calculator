import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Delivery } from '../../types'
import { TextField, Box } from '@mui/material'

export default function Form (
  { deliveryData, setDeliveryData }:
  { deliveryData: Delivery, setDeliveryData: React.Dispatch<React.SetStateAction<Delivery>> }
): JSX.Element {
  const validationSchema: yup.AnySchema = yup.object({
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

  const formik = useFormik({
    initialValues: deliveryData,
    validationSchema,
    onSubmit: (values: Delivery) => {
      setDeliveryData(values)
    }
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    formik.handleChange(e)
    formik.handleSubmit()
  }

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
      <TextField
        sx={{ p: 1 }}
        fullWidth
        id="cartValue"
        name="cartValue"
        label="Cart Value (€)"
        type="number"
        value={formik.values.cartValue}
        onChange={(e) => { onChange(e) }}
        error={(formik.touched.cartValue === true) && Boolean(formik.errors.cartValue)}
        helperText={(formik.touched.cartValue === true) && formik.errors.cartValue}
        inputProps={{ style: { backgroundColor: 'white', borderRadius: '5px' } }}
      />
      <TextField
        sx={{ p: 1 }}
        fullWidth
        id="deliveryDistance"
        name="deliveryDistance"
        label="Delivery Distance (meters)"
        type="number"
        value={formik.values.deliveryDistance}
        onChange={(e) => { onChange(e) }}
        error={(formik.touched.deliveryDistance === true) && Boolean(formik.errors.deliveryDistance)}
        helperText={(formik.touched.deliveryDistance === true) && formik.errors.deliveryDistance}
        inputProps={{ style: { backgroundColor: 'white', borderRadius: '5px' } }}
      />
      <TextField
        sx={{ p: 1 }}
        fullWidth
        id="itemCount"
        name="itemCount"
        label="Item Count (pcs)"
        type="number"
        value={formik.values.itemCount}
        onChange={(e) => { onChange(e) }}
        error={(formik.touched.itemCount === true) && Boolean(formik.errors.itemCount)}
        helperText={(formik.touched.itemCount === true) && formik.errors.itemCount}
        inputProps={{ style: { backgroundColor: 'white', borderRadius: '5px' } }}
      />
      <TextField
        sx={{ p: 1 }}
        fullWidth
        id="orderDate"
        name="orderDate"
        label="Date (yyyy/mm/dd)"
        type="date"
        value={formik.values.orderDate}
        onChange={(e) => { onChange(e) }}
        inputProps={{ style: { backgroundColor: 'white', borderRadius: '5px' } }}
      />
      <TextField
        sx={{ p: 1 }}
        fullWidth
        id="orderTime"
        name="orderTime"
        label="Time (hh:mm)"
        type="time"
        value={formik.values.orderTime}
        onChange={(e) => { onChange(e) }}
        inputProps={{ style: { backgroundColor: 'white', borderRadius: '5px' } }}
      />
    </Box>
  )
}
