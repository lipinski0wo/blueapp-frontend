import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled, { css } from 'styled-components'
import { ArrowBack, AddCircle } from '@styled-icons/material'
import { openPopup } from '../../actions/general'

const sharedStyle = css`
  color: blue;
  margin: 0 10px;
  cursor: pointer;
`

const BlueAddCircle = styled(AddCircle)`
  ${sharedStyle}
  width: 30px;
  height: 30px;
  margin-right: 20px;
`

const BlueArrowLeft = styled(ArrowBack)`
  ${sharedStyle}
  width: 40px;
  height: 40px;
  margin-left: 0;
`

const GoBackButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  font-weight: 800;
  display: flex;
  align-items: center;
  color: blue;
  cursor: pointer;
`

const UserName = styled.h4`
  flex: 1;
  display: flex;
  justify-content: center;
`

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
`

export const Navbar = ({
  userName,
  isShowingDetails,
  userId,
  history,
  openPopup,
}) => {
  const goBack = () => {
    history.push(isShowingDetails ? `/user/${userId}` : '/')
  }
  return (
    <Wrapper>
      <GoBackButton onClick={(e) => goBack()}>
        <BlueArrowLeft />
        Back
      </GoBackButton>
      <UserName>{userName}</UserName>
      <BlueAddCircle
        onClick={() => openPopup('post')}
        style={{ visibility: isShowingDetails ? 'hidden' : '' }}
      />
    </Wrapper>
  )
}

export default compose(withRouter, connect(null, { openPopup }))(Navbar)
