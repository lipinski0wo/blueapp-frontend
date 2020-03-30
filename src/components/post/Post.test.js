import '@testing-library/jest-dom'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Post } from './Post'

const setup = (noData, noComments) => {
  const getUser = jest.fn()
  const getPost = jest.fn()
  const getComments = jest.fn()
  const openPopup = jest.fn()
  let history = 'history'
  let user = { name: 'user name', id: 'user id' }
  let post = { title: 'post title', body: 'post body' }
  let comments = [
    {
      name: 'user name',
      email: 'user email',
      body: 'text body',
      id: 'comment id',
    },
  ]
  const match = { params: { postId: 'post id', userId: 'user id' } }
  if (noData) {
    user = null
    post = null
  }
  if (noComments) {
    comments = []
  }
  const initialState = {}
  const utils = render(
    <Router history={createMemoryHistory()}>
      <Provider store={createStore((state) => state, initialState)}>
        <Post
          getUser={getUser}
          getPost={getPost}
          getComments={getComments}
          openPopup={openPopup}
          user={user}
          comments={comments}
          post={post}
          match={match}
          history={history}
        />
      </Provider>
    </Router>
  )

  const buttons = [].slice.call(utils.container.querySelectorAll('button'))

  return {
    ...utils,
    getUser,
    getPost,
    getComments,
    openPopup,
    buttons,
  }
}
test('Post - check default behaviour', () => {
  const { getUser, getPost, getComments, openPopup, buttons } = setup()

  expect(getUser).toHaveBeenCalledWith('user id', 'history')
  expect(getPost).toHaveBeenCalledWith('user id', 'post id', 'history')
  expect(getComments).toHaveBeenCalledWith('user id', 'post id')

  expect(openPopup).not.toHaveBeenCalled()
  fireEvent.click(buttons[2])
  expect(openPopup).toHaveBeenCalledWith('comment')
})

test('Post - display message when user or post is not available', () => {
  const { buttons } = setup(true)
  expect(buttons.length).toEqual(0)
})

test('Post - toggle comments', () => {
  const { buttons } = setup(false, true)
  expect(window.getComputedStyle(buttons[2]).visibility).toEqual('hidden')
  fireEvent.click(buttons[1])
  expect(window.getComputedStyle(buttons[2]).visibility).not.toEqual('hidden')
})
