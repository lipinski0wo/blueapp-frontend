import customAxios from './customAxios'

import {
  ADD_LOADING,
  ADD_MSG,
  REMOVE_LOADING,
  ADD_COMMENT,
  CLOSE_POPUP,
  GET_COMMENTS,
} from './types'

export const getComments = (userId, postId) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_LOADING,
    })
    dispatch({
      type: GET_COMMENTS,
      payload: [],
    })
    const res = await customAxios.get(`comments/${userId}/${postId}`)
    dispatch({
      type: GET_COMMENTS,
      payload: res.data,
    })
  } catch {
    dispatch({
      type: ADD_MSG,
      payload: { type: 'error', name: 'problem while loading comments.' },
    })
  } finally {
    dispatch({
      type: REMOVE_LOADING,
    })
  }
}

export const addComment = (userId, postId, name, body, email) => async (
  dispatch
) => {
  try {
    dispatch({
      type: CLOSE_POPUP,
    })
    dispatch({
      type: ADD_LOADING,
    })
    const res = await customAxios.post(`comments/${userId}/${postId}`, {
      name,
      body,
      email,
    })
    dispatch({
      type: ADD_COMMENT,
      payload: { id: res.data.id, name, body, email },
    })
  } catch (err) {
    dispatch({
      type: ADD_MSG,
      payload: { type: 'error', name: 'problem while adding comment.' },
    })
  } finally {
    dispatch({
      type: REMOVE_LOADING,
    })
  }
}
