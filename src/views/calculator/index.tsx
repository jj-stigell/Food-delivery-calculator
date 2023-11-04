import React, { useState } from 'react'
import Form from './Form'
import Price from './Price'
import Hint from './Hint'
import { Delivery } from '../../types'
import { initialDeliveryState } from '../../config/config'
import {
  createTheme,
  ThemeProvider,
  Box,
  Container,
  CssBaseline,
  Typography
} from '@mui/material'

export default function Calculator (): JSX.Element {
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
          <Hint deliveryData={deliveryData} />
        </Box>
      </Container>
    </ThemeProvider>
  )
}
