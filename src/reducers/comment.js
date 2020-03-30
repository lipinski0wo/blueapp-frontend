import { GET_COMMENTS, ADD_COMMENT } from '../actions/types'

const initialState = {
  comments: [],
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, payload],
      }
    default:
      return state
  }
}
