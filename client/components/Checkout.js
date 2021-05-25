import React, {useState} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {connect} from 'react-redux'
import {userCartCheckout} from '../store/userShoppingCart'
import axios from 'axios'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#e8e8e8e4',
      fontFamily: '"Poppins", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '15px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: 'rgb(253, 212, 132)',
      iconColor: 'rgb(253, 212, 132)'
    }
  }
}

const Checkout = ({
  user,
  cart,
  total,
  clientSecret,
  userCheckout,
  cancel,
  pushToThankYouPage
}) => {
  const [isPaymentLoading, setPaymentLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const payMoney = async evt => {
    evt.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setPaymentLoading(true)

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.email
        }
      }
    })
    setPaymentLoading(false)
    if (paymentResult.error) {
      alert(paymentResult.error.message)
    } else if (paymentResult.paymentIntent.status === 'succeeded') {
      userCheckout(user.id)
      pushToThankYouPage(total)
      await axios.post('/nodemailer', {
        email: user.email,
        total,
        cart
      })
    }
  }

  return (
    <div>
      <label>
        Payment Method
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
      <div className="payment-btn-container">
        <button
          type="button"
          variant="outlined"
          disabled={isPaymentLoading}
          onClick={payMoney}
        >
          {isPaymentLoading ? 'Loading...' : 'Confirm Order'}
        </button>
        <button type="button" variant="outlined" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    userCheckout: userId => dispatch(userCartCheckout(userId))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
