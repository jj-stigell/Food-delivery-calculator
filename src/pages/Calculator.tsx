import React, { useState } from 'react'
import Form from '../components/Form'
import Visualize from '../components/Visualize'
import Price from '../components/Price'
import { Delivery } from '../types'
import { initialDeliveryState } from '../utils/config'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'

import {
  createTheme,
  ThemeProvider,
  Box,
  Container,
  CssBaseline,
  Avatar,
  Typography
} from '@mui/material'

function Calculator (): JSX.Element {
  const theme = createTheme()
  const [deliveryData, setDeliveryData] = useState<Delivery>(initialDeliveryState)

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ShoppingCartCheckoutIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Delivery fee calculator
          </Typography>
          <Form deliveryData={deliveryData} setDeliveryData={setDeliveryData} />
          <Price deliveryData={deliveryData} />
          <Visualize deliveryData={deliveryData} />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Calculator
