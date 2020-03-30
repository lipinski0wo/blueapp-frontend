import customAxios from './customAxios'

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

export const getPosts = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_LOADING,
    })
    dispatch({
      type: GET_POSTS,
      payload: [],
    })
    const res = await customAxios.get(`posts/${userId}`)
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
  } catch {
    dispatch({
      type: ADD_MSG,
      payload: {
        type: 'error',
        name: 'problem while loading posts.',
      },
    })
  } finally {
    dispatch({
      type: REMOVE_LOADING,
    })
  }
}

export const getPost = (userId, postId, history) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_LOADING,
    })
    dispatch({
      type: GET_POST,
      payload: null,
    })

    const res = await customAxios.get(`posts/${userId}/${postId}`)
    dispatch({
      type: GET_POST,
      payload: res.data,
    })
  } catch (err) {
    history.replace('/')
    dispatch({
      type: ADD_MSG,
      payload: {
        type: 'error',
        name: 'problem while loading post.',
      },
    })
  } finally {
    dispatch({
      type: REMOVE_LOADING,
    })
  }
}

export const addPost = (userId, title, body) => async (dispatch) => {
  try {
    dispatch({
      type: CLOSE_POPUP,
    })
    dispatch({
      type: ADD_LOADING,
    })
    const res = await customAxios.post(`posts/${userId}`, { title, body })
    dispatch({
      type: ADD_POST,
      payload: { id: res.data.id, userId, title, body },
    })
    dispatch({
      type: ADD_MSG,
      payload: { type: 'success', name: 'post added.' },
    })
  } catch (err) {
    dispatch({
      type: ADD_MSG,
      payload: {
        type: 'error',
        name: 'problem while adding post.',
      },
    })
  } finally {
    dispatch({
      type: REMOVE_LOADING,
    })
  }
}

export const deletePost = (postId, userId) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_LOADING,
    })
    await customAxios.post(`posts/${userId}/${postId}`)
    // await customAxios.delete(`posts/${userId}/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    })
    dispatch({
      type: ADD_MSG,
      payload: { type: 'success', name: 'post deleted.' },
    })
  } catch (err) {
    dispatch({
      type: ADD_MSG,
      payload: {
        type: 'error',
        name: 'problem while deleting post.',
      },
    })
  } finally {
    dispatch({
      type: REMOVE_LOADING,
    })
  }
}
