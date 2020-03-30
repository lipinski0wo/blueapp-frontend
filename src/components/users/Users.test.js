import '@testing-library/jest-dom'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Users } from './Users'

const setup = (noUsers) => {
  const getUsers = jest.fn()

  let users = [
    {
      name: 'user name',
      id: 'user id',
      email: 'email',
      phone: 'phone',
      website: 'website',
      company: { bs: 'bs', name: 'name', catchPhrase: 'catchPhrase' },
    },
  ]
  if (noUsers) {
    users = []
  }

  const utils = render(
    <Router history={createMemoryHistory()}>
      <Users getUsers={getUsers} users={users} />
    </Router>
  )

  return {
    ...utils,
    getUsers,
  }
}

test('Users - default behaviour', () => {
  const { getUsers } = setup()
  expect(getUsers).toHaveBeenCalledWith()

  expect(screen.queryByText('Nothing to display')).not.toBeInTheDocument()
})

test('Users - nothing to display', () => {
  const { getUsers } = setup(true)
  expect(getUsers).toHaveBeenCalledWith()

  expect(screen.queryByText('Nothing to display')).toBeInTheDocument()
})
