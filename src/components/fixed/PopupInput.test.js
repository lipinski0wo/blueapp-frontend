import '@testing-library/jest-dom'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import PopupInput from './PopupInput'

const onChange = jest.fn()
const labelName = 'Label'

const setup = (name, type) => {
  const utils = render(
    <PopupInput onChange={onChange} type={type} label={labelName} name={name} />
  )
  const input = utils.container.querySelector(
    name === 'body' ? 'textarea' : 'input'
  )
  const label = utils.container.querySelector('span[style]')

  return {
    input,
    label,
    ...utils,
  }
}

test('PopupInput - correct input value.', () => {
  const { input, label } = setup('head', 'text')
  fireEvent.change(input, { target: { value: 'text' } })

  expect(input.value).toBe('text')
  expect(window.getComputedStyle(label).color).toBe('rgb(0, 255, 0)')
  expect(onChange).toHaveBeenCalledWith('head', true, 'text')
})

test('PopupInput - incorrect input value.', () => {
  const { input, label } = setup('email', 'email')
  fireEvent.change(input, { target: { value: 'wrongemail@' } })

  expect(input.value).toBe('wrongemail@')
  expect(window.getComputedStyle(label).color).toBe('rgb(255, 0, 0)')
  expect(onChange).toHaveBeenCalledWith('email', false, 'wrongemail@')
})

test('PopupInput - correct email value.', () => {
  const { input } = setup('email', 'email')
  fireEvent.change(input, { target: { value: 'correct@email.com' } })

  expect(onChange).toHaveBeenCalledWith('email', true, 'correct@email.com')
})
