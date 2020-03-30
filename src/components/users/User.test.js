import '@testing-library/jest-dom'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import User from './User'

test('User component.', () => {
  const user = {
    name: 'user name',
    website: 'website',
    email: 'email',
    phone: 'phone',
    company: {
      catchPhrase: 'cp',
      bs: 'bs',
      name: 'name',
    },
    id: 'user id',
  }

  render(
    <Router history={createMemoryHistory()}>
      <User user={user} />
    </Router>
  )

  expect(screen.queryByText('user name')).toBeInTheDocument()
  expect(screen.queryByText('email')).toBeInTheDocument()
})
