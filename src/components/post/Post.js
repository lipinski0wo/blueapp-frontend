import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getUser } from '../../actions/user'
import { getPost } from '../../actions/post'
import { getComments } from '../../actions/comment'
import { openPopup } from '../../actions/general'
import Navbar from '../navbar/Navbar'
import Comment from './Comment'
import Info from '../general/Info'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px 40px;
`

const CommentsNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 20px 0px;
`

const BlueButtons = styled.button`
  border: none;
  background-color: transparent;
  text-decoration: underline;
  color: #00f;
  cursor: pointer;
`

export const Post = ({
  getUser,
  getPost,
  getComments,
  openPopup,
  user,
  post,
  comments,
  match: { params },
  history,
}) => {
  useEffect(() => {
    getUser(params.userId, history)
    getComments(params.userId, params.postId)
    getPost(params.userId, params.postId, history)
  }, [getUser, getPost, getComments, params.userId, params.postId, history])

  const [isShowingComments, toggleShowingComments] = useState(false)

  if (!user || !post) {
    return <Info>Nothing to display</Info>
  }

  return (
    <Wrapper>
      <Navbar userName={user.name} isShowingDetails={true} userId={user.id} />
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <CommentsNavigation>
        <BlueButtons onClick={() => toggleShowingComments(!isShowingComments)}>
          {isShowingComments ? 'hide' : 'show'} comments
        </BlueButtons>
        <BlueButtons
          onClick={() => openPopup('comment')}
          style={{ visibility: isShowingComments ? '' : 'hidden' }}
        >
          add comment
        </BlueButtons>
      </CommentsNavigation>
      {isShowingComments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      {isShowingComments && comments.length === 0 && (
        <Info>no comments available.</Info>
      )}
    </Wrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    post: state.post.post,
    comments: state.comment.comments,
  }
}

export default connect(mapStateToProps, {
  getUser,
  getPost,
  openPopup,
  getComments,
})(Post)
