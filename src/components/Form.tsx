/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'
import { useFormik } from 'formik'
import { Delivery } from '../types'
import { validateDeliveryInput as validationSchema } from '../utils/validationSchemas'

import {
  Button,
  TextField,
  Box,
  Container,
  CssBaseline,
  Avatar,
  Typography
} from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { on } from 'events'

const theme = createTheme()

const Form = (
  { deliveryData, setDeliveryData }:
  { deliveryData: Delivery, setDeliveryData: React.Dispatch<React.SetStateAction<Delivery>> }
): JSX.Element => {
  const formik = useFormik({
    initialValues: deliveryData,
    validationSchema,
    onSubmit: (values) => {
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
        label="Cart Value"
        type="number"
        value={formik.values.cartValue}
        onChange={(e) => { onChange(e) }}
        error={formik.touched.cartValue && Boolean(formik.errors.cartValue)}
        helperText={formik.touched.cartValue && formik.errors.cartValue}
      />
      <TextField
        sx={{ p: 1 }}
        fullWidth
        id="deliveryDistance"
        name="deliveryDistance"
        label="Delivery Distance"
        type="number"
        value={formik.values.deliveryDistance}
        onChange={(e) => { onChange(e) }}
        error={formik.touched.deliveryDistance && Boolean(formik.errors.deliveryDistance)}
        helperText={formik.touched.deliveryDistance && formik.errors.deliveryDistance}
      />
      <TextField
        sx={{ p: 1 }}
        fullWidth
        id="itemCount"
        name="itemCount"
        label="Item Count"
        type="number"
        value={formik.values.itemCount}
        onChange={(e) => { onChange(e) }}
        error={formik.touched.itemCount && Boolean(formik.errors.itemCount)}
        helperText={formik.touched.itemCount && formik.errors.itemCount}
      />
      <TextField
        sx={{ p: 1 }}
        fullWidth
        id="orderDate"
        name="orderDate"
        label="Date"
        type="date"
        value={formik.values.orderDate}
        onChange={(e) => { onChange(e) }}
      />
      <TextField
        sx={{ p: 1 }}
        fullWidth
        id="orderTime"
        name="orderTime"
        label="Time"
        type="time"
        value={formik.values.orderTime}
        onChange={(e) => { onChange(e) }}
      />
    </Box>
  )
}

export default Form
