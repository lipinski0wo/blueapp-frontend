import mockAxios from 'axios'
import { getPosts, getPost, addPost, deletePost } from './post'
import {
  ADD_LOADING,
  ADD_MSG,
  REMOVE_LOADING,
  GET_POSTS,
  DELETE_POST,
  GET_POST,
  ADD_POST,
  CLOSE_POPUP,
} from './types'

const addLoadingDispatch = {
  type: ADD_LOADING,
}

const getPostsDispatch = {
  type: GET_POSTS,
  payload: [],
}

const getPostDispatch = {
  type: GET_POST,
  payload: null,
}

const removeLoadingDispatch = {
  type: REMOVE_LOADING,
}

const closePopupDispatch = {
  type: CLOSE_POPUP,
}

const deletePostDispatch = {
  type: DELETE_POST,
  payload: 'postId',
}

const post = { id: 'id', title: 'title', body: 'body', userId: 'userId' }

describe('post actions', () => {
  it('should GET_POSTS', async () => {
    const dispatch = jest.fn()
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [post],
      })
    )
    await getPosts('userId')(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [getPostsDispatch],
      [
        {
          type: GET_POSTS,
          payload: [post],
        },
      ],
      [removeLoadingDispatch],
    ])
  })

  it('should emit error in GET_POSTS fail', async () => {
    const dispatch = jest.fn()
    mockAxios.get.mockImplementationOnce(() => Promise.reject({}))
    await getPosts('userId')(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [getPostsDispatch],
      [
        {
          type: ADD_MSG,
          payload: {
            type: 'error',
            name: 'problem while loading posts.',
          },
        },
      ],
      [removeLoadingDispatch],
    ])
  })

  it('should GET_POST', async () => {
    const dispatch = jest.fn()
    const history = { replace: jest.fn() }
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: post }))
    await getPost('userId', 'postId', history)(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [getPostDispatch],
      [
        {
          type: GET_POST,
          payload: post,
        },
      ],
      [removeLoadingDispatch],
    ])
    expect(history.replace).not.toHaveBeenCalledWith('/')
  })

  it('should emit error in GET_POST fail', async () => {
    const dispatch = jest.fn()
    const history = { replace: jest.fn() }
    mockAxios.get.mockImplementationOnce(() => Promise.reject({}))
    await getPost('userId', 'postId', history)(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [getPostDispatch],
      [
        {
          type: ADD_MSG,
          payload: {
            type: 'error',
            name: 'problem while loading post.',
          },
        },
      ],
      [removeLoadingDispatch],
    ])
    expect(history.replace).toHaveBeenCalledWith('/')
  })

  it('should ADD_POST', async () => {
    const dispatch = jest.fn()
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: { id: 'id' } })
    )
    await addPost('userId', 'title', 'body')(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [closePopupDispatch],
      [addLoadingDispatch],
      [
        {
          type: ADD_POST,
          payload: post,
        },
      ],
      [
        {
          type: ADD_MSG,
          payload: { type: 'success', name: 'post added.' },
        },
      ],
      [removeLoadingDispatch],
    ])
  })

  it('should emit error in ADD_POST fail', async () => {
    const dispatch = jest.fn()
    mockAxios.post.mockImplementationOnce(() => Promise.reject({}))
    await addPost('userId', 'title', 'body')(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [closePopupDispatch],
      [addLoadingDispatch],
      [
        {
          type: ADD_MSG,
          payload: {
            type: 'error',
            name: 'problem while adding post.',
          },
        },
      ],
      [removeLoadingDispatch],
    ])
  })

  it('should DELETE_POST', async () => {
    const dispatch = jest.fn()
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({}))
    await deletePost('postId', 'userId')(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [deletePostDispatch],
      [
        {
          type: ADD_MSG,
          payload: { type: 'success', name: 'post deleted.' },
        },
      ],
      [removeLoadingDispatch],
    ])
  })

  it('should emit error in DELETE_POST fail', async () => {
    const dispatch = jest.fn()
    mockAxios.post.mockImplementationOnce(() => Promise.reject({}))
    await deletePost('postId', 'userId')(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [
        {
          type: ADD_MSG,
          payload: {
            type: 'error',
            name: 'problem while deleting post.',
          },
        },
      ],
      [removeLoadingDispatch],
    ])
  })
})
