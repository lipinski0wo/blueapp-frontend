import { combineReducers } from 'redux'
import user from './user'
import post from './post'
import comment from './comment'
import general from './general'

export default combineReducers({
  user,
  post,
  comment,
  general,
})
