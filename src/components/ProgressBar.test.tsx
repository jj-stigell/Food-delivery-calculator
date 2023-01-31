/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import ProgressBar from './ProgressBar'
import '@testing-library/jest-dom'

test('renders the progress bar component with message', () => {
  const { getByText } = render(<ProgressBar value={10} MIN={0} MAX={100} message={'free delivery'} />)
  const progressBarElement = getByText(/free delivery/)
  expect(progressBarElement).toBeInTheDocument()
})
