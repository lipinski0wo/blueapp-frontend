import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getUsers } from '../../actions/user'
import User from './User'
import Info from '../general/Info'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

export const Users = ({ getUsers, users }) => {
  useEffect(() => {
    getUsers()
  }, [getUsers])

  if (users.length === 0) {
    return <Info>Nothing to display</Info>
  }

  return (
    <Wrapper>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </Wrapper>
  )
}

const mapStateToProps = (state) => ({
  users: state.user.users,
})
export default connect(mapStateToProps, { getUsers })(Users)
