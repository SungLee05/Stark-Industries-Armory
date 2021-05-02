import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {
  getUserShoppingCart,
  increaseProductQtyUserThunk,
  decreaseProductQtyUserThunk,
  deletingFromUserCart
} from '../store/userShoppingCart'
import {me} from '../store'

import Checkout from './Checkout'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import axios from 'axios'
import Modal from 'react-modal'

const stripePromise = loadStripe(
  'pk_test_51IFsCyF8Oat62uvTXBKuxWngn5AJoyQk4aA7nTNOST7Y1CONvcFzaYbUZuvM1G5XjxoZHxl3z1ADsSR3lnNVFtlt00k8XT8AHB'
)

Modal.setAppElement('#app')

const UserShoppingCart = props => {
  const {
    loadUserCart,
    increaseQty,
    decreaseQty,
    deleteFromUserCart,
    products,
    user
  } = props
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const userCart = products
  const userId = props.match.params.id

  const roundDecimal = num => {
    return Number(num).toFixed(2)
  }

  useEffect(
    () => {
      loadUserCart(userId)
    },
    [loadUserCart]
  )

  const startCheckout = async total => {
    const {data: clientSecrets} = await axios.post('/stripe/secret', {
      total: Math.round(total * 100)
    })
    setClientSecret(clientSecrets)
    setPaymentOpen(true)
  }

  const hideCheckout = () => {
    setPaymentOpen(false)
  }

  const pushToThankYouPage = total => {
    props.history.push('/thank-you', total)
  }

  const handleStripe = async (cart, userInfo) => {
    const stripe = await stripePromise
    const {data} = await axios.post('/stripe/create-session', {
      cart,
      userInfo
    })
    const result = await stripe.redirectToCheckout({
      sessionId: data.id
    })
    if (result.error) {
      props.history.push('/stripe-failure', result.error.message)
    }
  }
  return (
    <div>
      <h1>USER SHOPPING CART</h1>

      <div>
        {!userCart.length || !userCart ? (
          <div>Shopping Cart Is Empty!</div>
        ) : (
          <div>
            {userCart.map(product => (
              <div key={product.id}>
                <h4>{product.name}</h4>
                <img src={product.imageUrl} height="150" />
                <h4>Quantity: {product.orders[0].orderHistory.quantity}</h4>
                <h4>
                  Price: ${roundDecimal(product.price * product.quantity)}
                </h4>

                <button
                  type="button"
                  value="increment"
                  onClick={() => increaseQty(product.id, product.orders[0].id)}
                >
                  +
                </button>
                <button
                  type="button"
                  value="decrement"
                  onClick={() =>
                    decreaseQty(product.id, product.orders[0].id, userId)
                  }
                >
                  -
                </button>

                <button
                  type="button"
                  onClick={() => deleteFromUserCart(product.id, userId)}
                >
                  Remove From Cart
                </button>
              </div>
            ))}
            <div>
              <div>
                TOTAL: $
                {userCart
                  .reduce(
                    (acc, product) =>
                      acc +
                      product.price * product.orders[0].orderHistory.quantity,
                    0
                  )
                  .toFixed(2)}
              </div>
              <button
                type="submit"
                onClick={() =>
                  startCheckout(
                    userCart
                      .reduce(
                        (acc, product) =>
                          acc +
                          product.price *
                            product.orders[0].orderHistory.quantity,
                        0
                      )
                      .toFixed(2)
                  )
                }
              >
                Place Your Order
              </button>
              <Modal
                isOpen={paymentOpen}
                onRequestClose={hideCheckout}
                style={{
                  overlay: {
                    backgroundColor: 'rgba(41, 41, 41, 0.728)'
                  },
                  content: {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    margin: '-15vh 0px 0px -30vw',
                    backgroundColor: 'rgba(255, 255, 255)',
                    border: '3px solid #d2b041',
                    borderRadius: '15px',
                    width: '60vw',
                    height: '30vh'
                  }
                }}
              >
                {paymentOpen && (
                  <Elements stripe={stripePromise}>
                    <Checkout
                      user={user}
                      cart={userCart}
                      total={userCart
                        .reduce(
                          (acc, product) =>
                            acc +
                            product.price *
                              product.orders[0].orderHistory.quantity,
                          0
                        )
                        .toFixed(2)}
                      clientSecret={clientSecret}
                      cancel={hideCheckout}
                      pushToThankYouPage={pushToThankYouPage}
                    />
                  </Elements>
                )}
              </Modal>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    products: state.userShoppingCartReducer.userCart,
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    loadInitialData: () => {
      dispatch(me())
    },
    loadUserCart: userId => {
      dispatch(getUserShoppingCart(userId))
    },
    increaseQty: (productId, orderId, userId) => {
      dispatch(increaseProductQtyUserThunk(productId, orderId, userId))
    },
    decreaseQty: (productId, orderId, userId) => {
      dispatch(decreaseProductQtyUserThunk(productId, orderId, userId))
    },
    deleteFromUserCart: (productId, userId) => {
      dispatch(deletingFromUserCart(productId, userId))
    }
  }
}
export default connect(mapState, mapDispatch)(UserShoppingCart)
