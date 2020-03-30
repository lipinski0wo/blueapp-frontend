import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getUser } from '../../actions/user'
import { getPosts } from '../../actions/post'
import PostInfo from './PostInfo'
import Navbar from '../navbar/Navbar'
import Info from '../general/Info'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px 40px;
`

export const User = ({ getUser, getPosts, user, posts, match, history }) => {
  useEffect(() => {
    getUser(match.params.id, history)
    getPosts(match.params.id)
  }, [getUser, getPosts, match.params.id, history])

  if (!user) {
    return <Info>Nothing to display</Info>
  }

  return (
    <Wrapper>
      <Navbar userName={user.name} isShowingDetails={false} userId={user.id} />
      {posts.map((post) => (
        <PostInfo key={post.id} post={post} />
      ))}
      {posts.length === 0 && <Info>No posts available</Info>}
    </Wrapper>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  posts: state.post.posts,
})

export default connect(mapStateToProps, { getUser, getPosts })(User)
