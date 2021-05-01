import React from 'react'
import {Link} from 'react-router-dom'
import accounting from 'accounting'

export const PostCheckout = props => {
  const total = props.history.location.state

  return (
    <div>
      <p>
        <span style={{fontWeight: 'bold', color: 'green'}}>
          Payment Succeeded!
        </span>{' '}
        Thank you for choosing Stark Industries Armory. Your total today was
        <span style={{fontWeight: 'bold'}}>
          {accounting.formatMoney(total)}.
        </span>
      </p>
      <p>
        <Link to="/allproducts">Continue Shopping</Link>
      </p>
    </div>
  )
}

export default PostCheckout
