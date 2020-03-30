import '@testing-library/jest-dom'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { User } from './User'

const setup = (noUser, noPosts) => {
  const getUser = jest.fn()
  const getPosts = jest.fn()
  const openPopup = jest.fn()
  let history = 'history'
  let user = { name: 'user name', id: 'user id' }
  let posts = [{ title: 'post title', body: 'post body', id: 'post id' }]
  const match = { params: { postId: 'post id', id: 'user id' } }
  if (noUser) {
    user = null
  }
  if (noPosts) {
    posts = []
  }

  const initialState = {}
  const utils = render(
    <Router history={createMemoryHistory()}>
      <Provider store={createStore((state) => state, initialState)}>
        <User
          getUser={getUser}
          getPosts={getPosts}
          user={user}
          posts={posts}
          match={match}
          history={history}
        />
      </Provider>
    </Router>
  )

  return {
    ...utils,
    getUser,
    getPosts,
    openPopup,
  }
}

test('User - default behaviour', () => {
  const { getUser, getPosts } = setup()
  expect(getUser).toHaveBeenCalledWith('user id', 'history')
  expect(getPosts).toHaveBeenCalledWith('user id')

  expect(screen.queryByText('Nothing to display')).not.toBeInTheDocument()
  expect(screen.queryByText('No posts available')).not.toBeInTheDocument()
})

test('User - no user to display', () => {
  setup(true)
  expect(screen.queryByText('Nothing to display')).toBeInTheDocument()
})

test('User - no posts available', () => {
  setup(false, true)
  expect(screen.queryByText('No posts available')).toBeInTheDocument()
})
