import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import Loading from './Loading'

test('show loading', () => {
  render(<Loading />)
  expect(screen.queryByText('Please wait, loading...')).toBeInTheDocument()
})
