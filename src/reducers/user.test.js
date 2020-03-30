import reducer from './user'
import { GET_USERS, GET_USER } from '../actions/types'

const user = {
  name: 'user name',
  id: 'user id',
  email: 'email',
  phone: 'phone',
  website: 'website',
  company: { bs: 'bs', name: 'name', catchPhrase: 'catchPhrase' },
}

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      users: [],
      user: null,
    })
  })

  it('should handle GET_USER', () => {
    expect(
      reducer(undefined, {
        type: GET_USER,
        payload: user,
      })
    ).toEqual({
      users: [],
      user,
    })
  })

  it('should handle GET_USERS', () => {
    expect(
      reducer(undefined, {
        type: GET_USERS,
        payload: [user],
      })
    ).toEqual({
      users: [user],
      user: null,
    })
  })
})
