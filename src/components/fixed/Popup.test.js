import '@testing-library/jest-dom'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Popup } from './Popup'

const closePopup = jest.fn()
const post = { id: 'postId' }
const user = { id: 'userId' }

const setup = (popupType) => {
  const addComment = jest.fn()
  const addPost = jest.fn()
  const utils = render(
    <Popup
      closePopup={closePopup}
      addComment={addComment}
      addPost={addPost}
      post={post}
      user={user}
      popupType={popupType}
    />
  )

  const textInput = utils.container.querySelector('input[type="text"]')
  const emailInput = utils.container.querySelector('input[type="email"]')
  const bodyInput = utils.container.querySelector('textarea')
  const saveButton = utils.getByText('Save')
  const cancelButton = utils.getByText('Cancel')

  return {
    textInput,
    emailInput,
    bodyInput,
    saveButton,
    cancelButton,
    addComment,
    addPost,
    ...utils,
  }
}

test('Popup - click cancel button.', () => {
  const { cancelButton } = setup('post')

  fireEvent.click(cancelButton)

  expect(closePopup).toHaveBeenCalledTimes(1)
})

test('Popup - fail when saving with default values.', () => {
  const { saveButton, addComment, addPost } = setup('post')

  fireEvent.click(saveButton)

  expect(addComment).not.toHaveBeenCalled()
  expect(addPost).not.toHaveBeenCalled()
})

test('Popup - save post with correct values', () => {
  const { textInput, bodyInput, saveButton, addComment, addPost } = setup(
    'post'
  )

  fireEvent.change(textInput, { target: { value: 'correct text' } })
  fireEvent.change(bodyInput, { target: { value: 'correct body' } })
  fireEvent.click(saveButton)

  expect(addPost).toHaveBeenCalledWith('userId', 'correct text', 'correct body')
  expect(addComment).not.toHaveBeenCalled()
})

test('Popup - save comment with correct values', () => {
  const {
    textInput,
    emailInput,
    bodyInput,
    saveButton,
    addComment,
    addPost,
  } = setup('comment')

  fireEvent.change(textInput, { target: { value: 'correct text' } })
  fireEvent.change(bodyInput, { target: { value: 'correct body' } })
  fireEvent.change(emailInput, { target: { value: 'correct@email.com' } })
  fireEvent.click(saveButton)

  expect(addComment).toHaveBeenCalledWith(
    'userId',
    'postId',
    'correct text',
    'correct body',
    'correct@email.com'
  )
  expect(addPost).not.toHaveBeenCalled()
})
