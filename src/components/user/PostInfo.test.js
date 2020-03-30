import '@testing-library/jest-dom'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { PostInfo } from './PostInfo'

test('Comment component.', () => {
  const post = { id: 'post id', userId: 'user id', title: 'post title' }
  const deletePost = jest.fn()

  const { container } = render(
    <Router history={createMemoryHistory()}>
      <PostInfo post={post} deletePost={deletePost} />
    </Router>
  )

  const svgs = [].slice.call(container.querySelectorAll('svg'))

  expect(screen.queryByText('post title')).toBeInTheDocument()

  expect(deletePost).not.toHaveBeenCalled()
  fireEvent.click(svgs[0])
  expect(deletePost).toHaveBeenCalledTimes(1)
})
