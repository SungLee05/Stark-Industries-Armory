import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {BsChevronDoubleLeft} from 'react-icons/bs'
import {me} from '../store'

import accounting from 'accounting'

export const PostCheckout = props => {
  const total = props.history.location.state
  const {isLoggedIn, loadInitialData} = props

  useEffect(() => {
    loadInitialData()
  }, [])

  return (
    <div className="post-checkout-container">
      <div className="post-checkout-wrapper">
        <span style={{fontWeight: 'bold', color: 'green'}}>
          Payment Succeeded!
        </span>
        <br />
        <div className="post-checkout-thankyou-text">
          Thank you for choosing <br />Stark Industries Armory.
        </div>
        <br />
        <div>
          Your total today was <strong>{accounting.formatMoney(total)}.</strong>
        </div>
        {isLoggedIn ? (
          <span />
        ) : (
          <div id="post-guest-checkout-container">
            <div>
              To experience the full checkout process with <br />confirmation
              email of order receipt, <br />please register here{' '}
              <Link to="/signup">
                <strong
                  style={{
                    color: '#fbca03'
                  }}
                >
                  REGISTER
                </strong>
              </Link>
              .
            </div>
          </div>
        )}
        <div className="checkout-back-link-container">
          <Link className="checkout-back-link" to="/allproducts">
            <BsChevronDoubleLeft />
            <div className="checkout-back-link-btn">Back to Armory</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}
export default connect(mapState, mapDispatch)(PostCheckout)
