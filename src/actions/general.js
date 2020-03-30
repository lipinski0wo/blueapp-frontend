import { REMOVE_LOADING, REMOVE_MSG, OPEN_POPUP, CLOSE_POPUP } from './types'

export const removeLoading = () => async (dispatch) => {
  dispatch({
    type: REMOVE_LOADING,
  })
}

export const removeMsg = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_MSG,
    payload: id,
  })
}

export const openPopup = (type) => (dispatch) => {
  dispatch({
    type: OPEN_POPUP,
    payload: type,
  })
}

export const closePopup = () => (dispatch) => {
  dispatch({
    type: CLOSE_POPUP,
  })
}
