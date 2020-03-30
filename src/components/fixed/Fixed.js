import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import Loading from './Loading'
import Message from './Message'
import Popup from './Popup'
import { closePopup } from '../../actions/general'

export const Fixed = ({ general, closePopup, match }) => {
  useEffect(() => {
    closePopup()
  }, [closePopup, match])

  return (
    <Fragment>
      {general.popupType !== '' && <Popup />}
      {general.loading !== 0 && <Loading />}
      {general.msg.length !== 0 &&
        general.msg.map((msg, index) => (
          <Message key={msg.id} msg={msg} index={index} />
        ))}
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  general: state.general,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { closePopup })
)(Fixed)
