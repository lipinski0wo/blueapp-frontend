import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { KeyboardArrowRight, DeleteOutline } from '@styled-icons/material'
import { deletePost } from '../../actions/post'

const BlueDeleteOutline = styled(DeleteOutline)`
  width: 30px;
  height: 30px;
  color: blue;
  margin: 0 10px;
  cursor: pointer;
`

const BlueKeyboardArrowRight = styled(KeyboardArrowRight)`
  width: 40px;
  height: 40px;
  color: blue;
  margin: 0 10px;
  cursor: pointer;
`

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  border: 2px solid #000;
  margin: 10px 0;
  box-sizing: border-box;
`

const Headline = styled.h4`
    flex: 1;
    margin-right: 40;x
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

export const PostInfo = ({ post, deletePost }) => {
  return (
    <Wrapper>
      <BlueDeleteOutline onClick={() => deletePost(post.id, post.userId)} />
      <Headline>{post.title}</Headline>
      <Link to={`/user/${post.userId}/${post.id}`}>
        <BlueKeyboardArrowRight />
      </Link>
    </Wrapper>
  )
}

export default connect(null, { deletePost })(PostInfo)
