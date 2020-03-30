import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  margin: 20px;
  border: 2px solid #000;
  box-sizing: border-box;
  padding: 10px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  border: 2px solid #000;
  background-color: #fff;
  padding: 20px 40px;
  margin-top: 5px;
  box-shadow: 2px 2px 1px #000;
  cursor: pointer;
`

const User = ({ user: { name, website, email, phone, company, id } }) => {
  return (
    <Wrapper>
      <h4>{name}</h4>
      <a href={'email:' + email}>{email}</a>
      <a href={'tel:' + phone}>{phone}</a>
      <a href={'http://' + website}>{website}</a>
      <p>
        {company.name} <br />
        {company.catchPhrase} <br />
        {company.bs}
      </p>
      <Link to={`/user/${id}`}>
        <ButtonWrapper>
          <Button>Details</Button>
        </ButtonWrapper>
      </Link>
    </Wrapper>
  )
}

export default User
