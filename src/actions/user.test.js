import mockAxios from 'axios'
import { getUsers, getUser } from './user'
import {
  GET_USERS,
  GET_USER,
  ADD_MSG,
  ADD_LOADING,
  REMOVE_LOADING,
} from './types'

const addLoadingDispatch = {
  type: ADD_LOADING,
}

const getUsersDispatch = {
  type: GET_USERS,
  payload: [],
}

const getUserDispatch = {
  type: GET_USER,
  payload: null,
}

const removeLoadingDispatch = {
  type: REMOVE_LOADING,
}

const user = {
  name: 'user name',
  id: 'user id',
  email: 'email',
  phone: 'phone',
  website: 'website',
  company: { bs: 'bs', name: 'name', catchPhrase: 'catchPhrase' },
}

describe('post actions', () => {
  it('should GET_USERS', async () => {
    const dispatch = jest.fn()
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [user],
      })
    )
    await getUsers()(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [getUsersDispatch],
      [
        {
          type: GET_USERS,
          payload: [user],
        },
      ],
      [removeLoadingDispatch],
    ])
  })

  it('should emit error in GET_USERS fail', async () => {
    const dispatch = jest.fn()
    mockAxios.get.mockImplementationOnce(() => Promise.reject({}))
    await getUsers()(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [getUsersDispatch],
      [
        {
          type: ADD_MSG,
          payload: {
            type: 'error',
            name: 'problem while loading users.',
          },
        },
      ],
      [removeLoadingDispatch],
    ])
  })

  it('should emit error in GET_USER fail', async () => {
    const dispatch = jest.fn()
    const history = { replace: jest.fn() }
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: user }))
    await getUser('userId', history)(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [getUserDispatch],
      [
        {
          type: GET_USER,
          payload: user,
        },
      ],
      [removeLoadingDispatch],
    ])
    expect(history.replace).not.toHaveBeenCalledWith('/')
  })

  it('should emit error in GET_USER fail', async () => {
    const dispatch = jest.fn()
    const history = { replace: jest.fn() }
    mockAxios.get.mockImplementationOnce(() => Promise.reject({}))
    await getUser('userId', history)(dispatch)
    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [getUserDispatch],
      [
        {
          type: ADD_MSG,
          payload: {
            type: 'error',
            name: 'problem while loading user.',
          },
        },
      ],
      [removeLoadingDispatch],
    ])
    expect(history.replace).toHaveBeenCalledWith('/')
  })
})
