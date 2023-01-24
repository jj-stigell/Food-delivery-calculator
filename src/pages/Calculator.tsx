import React, { useState } from 'react'
import Form from '../components/Form'
import Price from '../components/Price'
import Tip from '../components/Tip'
import { Delivery } from '../types'
import { initialDeliveryState } from '../utils/config'

import {
  createTheme,
  ThemeProvider,
  Box,
  Container,
  CssBaseline,
  Typography,
  Avatar
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
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box sx={{ border: 1, borderRadius: '16px', borderColor: '#bef0ff' }}>
            <Avatar alt="Wolt logo" src="../static/wolt-logo-vector-2021.png" />
            <Typography component="h1" variant="h5">
              Delivery fee calculator
            </Typography>
            <Form deliveryData={deliveryData} setDeliveryData={setDeliveryData} />
            <Price deliveryData={deliveryData} />
            <Tip deliveryData={deliveryData} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Calculator
