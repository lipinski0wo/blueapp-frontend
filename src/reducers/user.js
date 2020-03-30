import { GET_USERS, GET_USER } from '../actions/types'

const initialState = {
  users: [],
  user: null,
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
      }
    case GET_USERS:
      return {
        ...state,
        users: payload,
      }
    default:
      return state
  }
}
