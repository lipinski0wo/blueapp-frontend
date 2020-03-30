import reducer from './comment'
import { GET_COMMENTS, ADD_COMMENT } from '../actions/types'

const comment = {
  title: 'title',
  email: 'email',
  body: 'body',
  id: 'id',
}

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      comments: [],
    })
  })

  it('should handle GET_COMMENTS', () => {
    expect(
      reducer(undefined, {
        type: GET_COMMENTS,
        payload: [comment],
      })
    ).toEqual({
      comments: [comment],
    })
  })

  it('should handle ADD_COMMENT', () => {
    expect(
      reducer(undefined, {
        type: ADD_COMMENT,
        payload: comment,
      })
    ).toEqual({
      comments: [comment],
    })
  })
})
