import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px 0 0 0;
  border: 2px solid #000;
  padding: 10px;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

const Title = styled.h5`
  margin: 0;
`

const Paragraph = styled.p`
  overflow-wrap: break-word;
`

const Comment = ({ comment: { name, email, body } }) => {
  return (
    <Wrapper>
      <Top>
        <Title>{name}</Title>
        <a href={'email:' + email}>{email}</a>
      </Top>
      <Paragraph>{body}</Paragraph>
    </Wrapper>
  )
}

export default Comment
