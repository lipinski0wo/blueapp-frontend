import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { closePopup } from '../../actions/general'
import { addPost } from '../../actions/post'
import { addComment } from '../../actions/comment'
import PopupInput from './PopupInput'

const Wrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`

const PopupContainer = styled.div`
  background-color: #fff;
  display: flex;
  width: 400px;
  min-height: 200px;
  flex-direction: column;
  border: 2px solid #000;
`

const Label = styled.div`
  border-bottom: 2px solid #000;
  height: 20px;
  padding-left: 20px;
`

const Footer = styled.div`
  border-top: 2px solid #000;
  height: 20px;
  margin-top: 20px;
`

const Title = styled.h3`
  text-align: center;
`

const GeneralButton = css`
  float: right;
  margin: 0 20px 0 0;
  border: 2px solid #000;
  padding: 5px 20px;
  width: 100px;
  cursor: pointer;
`

const ButtonCancel = styled.button`
  ${GeneralButton}
  background-color: #fff;
  color: #000;
`

const ButtonSave = styled.button`
  ${GeneralButton}
  background-color: #00f;
  color: #fff;
`

export const Popup = ({
  popupType,
  closePopup,
  addComment,
  addPost,
  post,
  user,
}) => {
  const [values, setValues] = useState({ head: '', body: '', email: '' })
  const [valid, setValid] = useState({ head: false, body: false, email: false })

  const submit = () => {
    if (popupType === 'comment' && !valid.email) {
      return
    }
    if (!valid.head) {
      return
    }
    if (!valid.body) {
      return
    }

    if (popupType === 'post') {
      addPost(user.id, values.head, values.body)
    } else {
      addComment(user.id, post.id, values.head, values.body, values.email)
    }
  }
  const onChange = (name, isValid, value) => {
    setValues({ ...values, [name]: value })
    setValid({ ...valid, [name]: isValid })
  }
  return (
    <Wrapper>
      <PopupContainer>
        <Label>Add {popupType}</Label>
        <Title>Add {popupType}</Title>
        <PopupInput
          type='text'
          name='head'
          label={popupType === 'post' ? 'Title' : 'Name'}
          onChange={onChange}
        />
        {popupType !== 'post' && (
          <PopupInput
            type='email'
            name='email'
            label='Email'
            onChange={onChange}
          />
        )}
        <PopupInput type='text' name='body' label='Body' onChange={onChange} />
        <div>
          <ButtonSave onClick={submit}>Save</ButtonSave>
          <ButtonCancel onClick={closePopup}>Cancel</ButtonCancel>
        </div>
        <Footer />
      </PopupContainer>
    </Wrapper>
  )
}

const mapStateToProps = (state) => ({
  popupType: state.general.popupType,
  user: state.user.user,
  post: state.post.post,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { closePopup, addPost, addComment })
)(Popup)
