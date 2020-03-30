import '@testing-library/jest-dom'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Navbar } from './Navbar'

const setup = (isShowingDetails) => {
  const openPopup = jest.fn()
  const history = { push: jest.fn() }
  const userId = 'userId'
  const userName = 'userName'

  const utils = render(
    <Navbar
      openPopup={openPopup}
      history={history}
      userId={userId}
      userName={userName}
      isShowingDetails={isShowingDetails}
    />
  )
  const buttons = [].slice.call(utils.container.querySelectorAll('svg'))

  return {
    ...utils,
    buttons,
    openPopup,
    history,
  }
}

test('Navbar - when is showing details.', () => {
  const { buttons, history } = setup(true)

  expect(history.push).not.toHaveBeenCalled()
  fireEvent.click(buttons[0])
  expect(history.push).toHaveBeenCalledWith('/user/userId')

  expect(window.getComputedStyle(buttons[1]).visibility).toEqual('hidden')
})

test('Navbar - when is not showing details.', () => {
  const { buttons, openPopup, history } = setup(false)

  expect(openPopup).not.toHaveBeenCalled()
  fireEvent.click(buttons[1])
  expect(openPopup).toHaveBeenCalledTimes(1)

  expect(history.push).not.toHaveBeenCalled()
  fireEvent.click(buttons[0])
  expect(history.push).toHaveBeenCalledWith('/')

  expect(window.getComputedStyle(buttons[1]).visibility).toEqual('')
})
