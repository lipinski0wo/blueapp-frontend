import React, { useState } from 'react'
import styled, { css } from 'styled-components'

const GeneralInput = css`
  border: 2px solid #000;
  flex: 1;
  margin-left: 10px;
  width: 200px;
`

const InputSplit = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 20px;
`

const Input = styled.input`
  ${GeneralInput}
`

const Textarea = styled.textarea`
  ${GeneralInput}
  min-height: 100px;
`

const InputLabel = styled.span`
  width: 30px;
`

const PopupInput = ({ type, name, onChange, label }) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const [value, setValue] = useState('')
  const [valid, setValid] = useState(false)

  const validate = (e) => {
    setValue(e.target.value)
    let isValid = false
    if (type === 'email' && re.test(e.target.value)) {
      isValid = true
    }
    if (type !== 'email' && e.target.value.length > 0) {
      isValid = true
    }
    setValid(isValid)
    onChange(name, isValid, e.target.value)
  }

  return (
    <InputSplit>
      <InputLabel style={{ color: valid ? '#0f0' : '#f00' }}>
        {label}
      </InputLabel>
      {name !== 'body' && (
        <Input type={type} onChange={validate} value={value} />
      )}
      {name === 'body' && <Textarea onChange={validate} value={value} />}
    </InputSplit>
  )
}

export default PopupInput
