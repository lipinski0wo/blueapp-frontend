import customAxios from './customAxios'

import {
  GET_USERS,
  GET_USER,
  ADD_MSG,
  ADD_LOADING,
  REMOVE_LOADING,
} from './types'

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: ADD_LOADING,
    })
    dispatch({
      type: GET_USERS,
      payload: [],
    })
    const res = await customAxios.get('users')
    dispatch({
      type: GET_USERS,
      payload: res.data,
    })
  } catch {
    dispatch({
      type: ADD_MSG,
      payload: {
        type: 'error',
        name: 'problem while loading users.',
      },
    })
  } finally {
    dispatch({
      type: REMOVE_LOADING,
    })
  }
}

export const getUser = (userId, history) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_LOADING,
    })
    dispatch({
      type: GET_USER,
      payload: null,
    })

    const res = await customAxios.get(`users/${userId}`)
    dispatch({
      type: GET_USER,
      payload: res.data,
    })
  } catch (err) {
    history.replace('/')
    dispatch({
      type: ADD_MSG,
      payload: {
        type: 'error',
        name: 'problem while loading user.',
      },
    })
  } finally {
    dispatch({
      type: REMOVE_LOADING,
    })
  }
}
