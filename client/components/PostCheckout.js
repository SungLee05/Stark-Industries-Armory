import React from 'react'
import {Link} from 'react-router-dom'
import {BsChevronDoubleLeft} from 'react-icons/bs'

import accounting from 'accounting'

export const PostCheckout = props => {
  const total = props.history.location.state

  return (
    <div className="post-checkout-container">
      <div className="post-checkout-wrapper">
        <span style={{fontWeight: 'bold', color: 'green'}}>
          Payment Succeeded!
        </span>
        <br />
        Thank you for choosing Stark Industries Armory.
        <br />
        <div>
          Your total today was <strong>{accounting.formatMoney(total)}.</strong>
        </div>
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

export default PostCheckout
