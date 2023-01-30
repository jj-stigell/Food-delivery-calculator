/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import Logo from './Logo'
import '@testing-library/jest-dom'

test('renders the logo component', () => {
  const { getByText } = render(<Logo />)
  const logoElement = getByText(/Wolt/)
  expect(logoElement).toBeInTheDocument()
})
