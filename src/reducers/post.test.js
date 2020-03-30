import reducer from './post'
import { GET_POSTS, DELETE_POST, GET_POST, ADD_POST } from '../actions/types'

const post = {
  title: 'title',
  body: 'body',
  id: 'id',
}

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      posts: [],
      post: null,
    })
  })

  it('should handle GET_POSTS', () => {
    expect(
      reducer(undefined, {
        type: GET_POSTS,
        payload: [post, post],
      })
    ).toEqual({
      posts: [post, post],
      post: null,
    })
  })

  it('should handle GET_POST', () => {
    expect(
      reducer(undefined, {
        type: GET_POST,
        payload: post,
      })
    ).toEqual({
      posts: [],
      post,
    })
  })

  it('should handle ADD_POST', () => {
    expect(
      reducer(undefined, {
        type: ADD_POST,
        payload: post,
      })
    ).toEqual({
      posts: [post],
      post: null,
    })
  })

  it('should handle DELETE_POST', () => {
    expect(
      reducer(
        { posts: [post], post: null },
        {
          type: DELETE_POST,
          payload: 'id',
        }
      )
    ).toEqual({
      posts: [],
      post: null,
    })
  })
})
