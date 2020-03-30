import '@testing-library/jest-dom'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Info from './Info'

test('Info component.', () => {
  render(<Info>testing text</Info>)

  expect(screen.queryByText('testing text')).toBeInTheDocument()
})
