import { GET_POSTS, DELETE_POST, GET_POST, ADD_POST } from '../actions/types'

const initialState = {
  posts: [],
  post: null,
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_POST:
      return {
        ...state,
        post: payload,
      }
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
      }

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      }

    case DELETE_POST:
      const indexOf = state.posts.findIndex((post) => post.id === payload)
      const posts = state.posts

      if (indexOf > -1) {
        posts.splice(indexOf, 1)
      }
      return {
        ...state,
        posts: [...posts],
      }
    default:
      return state
  }
}
