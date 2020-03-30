import '@testing-library/jest-dom'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Comment from './Comment'

test('Comment component.', () => {
  render(
    <Comment
      comment={{ name: 'user name', email: 'user email', body: 'text body' }}
    />
  )

  expect(screen.queryByText('user name')).toBeInTheDocument()
  expect(screen.queryByText('user email')).toBeInTheDocument()
  expect(screen.queryByText('text body')).toBeInTheDocument()
})
