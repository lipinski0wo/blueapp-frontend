import mockAxios from 'axios'
import { getComments, addComment } from './comment'
import {
  ADD_LOADING,
  ADD_MSG,
  REMOVE_LOADING,
  ADD_COMMENT,
  CLOSE_POPUP,
  GET_COMMENTS,
} from './types'

const addLoadingDispatch = {
  type: ADD_LOADING,
}

const getCommentsDispatch = {
  type: GET_COMMENTS,
  payload: [],
}

const removeLoadingDispatch = {
  type: REMOVE_LOADING,
}

const closePopupDispatch = {
  type: CLOSE_POPUP,
}
const comment = { id: 'id', name: 'name', body: 'body', email: 'email' }

describe('comment actions', () => {
  it('should GET_COMMENTS', async () => {
    const dispatch = jest.fn()
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [comment],
      })
    )
    await getComments('userId', 'postId')(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [getCommentsDispatch],
      [
        {
          type: GET_COMMENTS,
          payload: [comment],
        },
      ],
      [removeLoadingDispatch],
    ])
  })

  it('should emit error in GET_COMMENTS fail', async () => {
    const dispatch = jest.fn()
    mockAxios.get.mockImplementationOnce(() => Promise.reject({}))
    await getComments('userId', 'postId')(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [getCommentsDispatch],
      [
        {
          type: ADD_MSG,
          payload: { type: 'error', name: 'problem while loading comments.' },
        },
      ],
      [removeLoadingDispatch],
    ])
  })

  it('should ADD_COMMENT', async () => {
    const dispatch = jest.fn()
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: { id: comment.id } })
    )
    await addComment('userId', 'postId', 'name', 'body', 'email')(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [closePopupDispatch],
      [addLoadingDispatch],
      [
        {
          type: ADD_COMMENT,
          payload: comment,
        },
      ],
      [removeLoadingDispatch],
    ])
  })

  it('should emit error in ADD_COMMENT fail', async () => {
    const dispatch = jest.fn()
    mockAxios.post.mockImplementationOnce(() => Promise.reject({}))
    await addComment('userId', 'postId', 'name', 'body', 'email')(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [closePopupDispatch],
      [addLoadingDispatch],
      [
        {
          type: ADD_MSG,
          payload: { type: 'error', name: 'problem while adding comment.' },
        },
      ],
      [removeLoadingDispatch],
    ])
  })
})
