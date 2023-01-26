import React, { useState } from 'react'
import Form from '../components/Form'
import Price from '../components/Price'
import Tip from '../components/Tip'
import { Delivery } from '../types'
import { initialDeliveryState } from '../config/config'
import {
  createTheme,
  ThemeProvider,
  Box,
  Container,
  CssBaseline,
  Typography
} from '@mui/material'

function Calculator (): JSX.Element {
  const theme = createTheme()
  const [deliveryData, setDeliveryData] = useState<Delivery>(initialDeliveryState)

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ backgroundColor: '#00c2e8' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5">
            Delivery fee calculator
          </Typography>
          <Form deliveryData={deliveryData} setDeliveryData={setDeliveryData} />
          <Price deliveryData={deliveryData} />
          <Tip deliveryData={deliveryData} />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Calculator
