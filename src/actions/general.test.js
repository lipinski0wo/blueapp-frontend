import { REMOVE_LOADING, REMOVE_MSG, OPEN_POPUP, CLOSE_POPUP } from './types'
import { removeLoading, removeMsg, openPopup, closePopup } from './general'

describe('general actions', () => {
  it('should REMOVE_LOADING', async () => {
    const dispatch = jest.fn()
    await removeLoading()(dispatch)
    expect(dispatch).toBeCalledWith({
      type: REMOVE_LOADING,
    })
  })

  it('should REMOVE_MSG', async () => {
    const dispatch = jest.fn()
    await removeMsg('id')(dispatch)
    expect(dispatch).toBeCalledWith({
      type: REMOVE_MSG,
      payload: 'id',
    })
  })

  it('should OPEN_POPUP', async () => {
    const dispatch = jest.fn()
    await openPopup('post')(dispatch)
    expect(dispatch).toBeCalledWith({
      type: OPEN_POPUP,
      payload: 'post',
    })
  })

  it('should CLOSE_POPUP', async () => {
    const dispatch = jest.fn()
    await closePopup()(dispatch)
    expect(dispatch).toBeCalledWith({
      type: CLOSE_POPUP,
    })
  })
})
