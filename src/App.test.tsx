/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

test('renders main app page with the calculator', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Delivery fee calculator/)
  expect(linkElement).toBeInTheDocument()
})
