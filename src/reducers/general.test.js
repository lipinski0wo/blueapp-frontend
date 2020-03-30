import reducer from './general'

import {
  ADD_LOADING,
  REMOVE_LOADING,
  ADD_MSG,
  REMOVE_MSG,
  CLOSE_POPUP,
  OPEN_POPUP,
} from '../actions/types'

jest.mock('uuidv4', () => {
  return {
    uuid: jest.fn(() => 'uuid-id'),
  }
})

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: 0,
      msg: [],
      popupType: '',
    })
  })

  it('should handle ADD_LOADING', () => {
    expect(
      reducer(
        {
          loading: 0,
          msg: [],
          popupType: '',
        },
        {
          type: ADD_LOADING,
          payload: null,
        }
      )
    ).toEqual({
      loading: 1,
      msg: [],
      popupType: '',
    })
  })

  it('should handle REMOVE_LOADING', () => {
    expect(
      reducer(
        {
          loading: 1,
          msg: [],
          popupType: '',
        },
        {
          type: REMOVE_LOADING,
          payload: null,
        }
      )
    ).toEqual({
      loading: 0,
      msg: [],
      popupType: '',
    })
  })

  it('should handle ADD_MSG', () => {
    expect(
      reducer(
        {
          loading: 0,
          msg: [],
          popupType: '',
        },
        {
          type: ADD_MSG,
          payload: { type: 'error', name: 'msg' },
        }
      )
    ).toEqual({
      loading: 0,
      msg: [{ type: 'error', name: 'msg', id: 'uuid-id' }],
      popupType: '',
    })
  })
  it('should handle REMOVE_MSG', () => {
    expect(
      reducer(
        {
          loading: 0,
          msg: [{ type: 'error', name: 'msg', id: 'uuid-id' }],
          popupType: '',
        },
        {
          type: REMOVE_MSG,
          payload: 'uuid-id',
        }
      )
    ).toEqual({
      loading: 0,
      msg: [],
      popupType: '',
    })
  })
  it('should handle OPEN_POPUP', () => {
    expect(
      reducer(
        {
          loading: 0,
          msg: [],
          popupType: '',
        },
        {
          type: OPEN_POPUP,
          payload: 'post',
        }
      )
    ).toEqual({
      loading: 0,
      msg: [],
      popupType: 'post',
    })
  })
  it('should handle CLOSE_POPUP', () => {
    expect(
      reducer(
        {
          loading: 0,
          msg: [],
          popupType: 'post',
        },
        {
          type: CLOSE_POPUP,
          payload: 'post',
        }
      )
    ).toEqual({
      loading: 0,
      msg: [],
      popupType: '',
    })
  })
})
