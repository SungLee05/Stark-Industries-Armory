import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Flip from 'react-reveal/Flip'

import {
  getUserShoppingCart,
  increaseProductQtyUserThunk,
  decreaseProductQtyUserThunk,
  deletingFromUserCart
} from '../store/userShoppingCart'
import {me} from '../store'

import {CgMathPlus, CgMathMinus} from 'react-icons/cg'
import {AiOutlineClose} from 'react-icons/ai'
import {BsChevronDoubleLeft} from 'react-icons/bs'
import accounting from 'accounting'

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

  useEffect(
    () => {
      loadUserCart(userId)
    },
    [loadUserCart]
  )

  return (
    <>
      <div className="ironman-gif-container">
        <img className="ironman" src="/ironmangif.gif" alt="ironman" />
      </div>

      <div className="cart-main-container">
        <div>
          {!userCart.length || !userCart ? (
            <div className="cart-empty-container">
              <Fade bottom delay={1100}>
                <div className="cart-empty">
                  There are no orders to fulfill.
                </div>
                <Link className="empty-cart-back-link" to="/allproducts">
                  <BsChevronDoubleLeft />
                  <div className="empty-cart-back-btn">Back to Armory</div>
                </Link>
              </Fade>
            </div>
          ) : (
            <>
              <h1>ORDER DETAIL</h1>
              <div>
                {userCart.map(product => (
                  <div key={Math.random()} className="cart-info-container">
                    <div className="cart-glass-container">
                      <div className="cart-img-wrapper">
                        <img
                          src={product.singleInfoImageUrl}
                          className="cart-img"
                        />
                      </div>

                      <div className="cart-name-wrapper">
                        <div className="cart-fullname">{product.fullName}</div>
                      </div>

                      <div className="cart-quantity-container">
                        <div style={{padding: '1rem', width: '1rem'}}>
                          {product.orders[0].orderHistory.quantity}
                        </div>

                        <div className="increment-decrement-container">
                          <button
                            className="cart-btn"
                            type="button"
                            value="increment"
                            onClick={() =>
                              increaseQty(product.id, product.orders[0].id)
                            }
                          >
                            <CgMathPlus />
                          </button>
                          <button
                            className="cart-btn"
                            type="button"
                            value="decrement"
                            onClick={() =>
                              decreaseQty(
                                product.id,
                                product.orders[0].id,
                                userId
                              )
                            }
                          >
                            <CgMathMinus />
                          </button>
                        </div>
                      </div>

                      <div className="cart-price-wrapper">
                        <div>
                          {accounting.formatMoney(
                            roundDecimal(product.price * product.quantity)
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="remove-btn-container">
                      <button
                        className="cart-btn"
                        type="button"
                        onClick={() => deleteFromUserCart(product.id, userId)}
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="cart-subtotal-container">
                  <div className="cart-subtotal-wrapper">
                    <Link className="cart-back-link" to="/allproducts">
                      <BsChevronDoubleLeft />
                      <div className="cart-back-btn">Back to Armory</div>
                    </Link>
                    <div className="cart-total-text">TOTAL :</div>

                    <div className="cart-total-price">
                      {accounting.formatMoney(
                        userCart
                          .reduce(
                            (acc, product) =>
                              acc +
                              product.price *
                                product.orders[0].orderHistory.quantity,
                            0
                          )
                          .toFixed(2)
                      )}
                    </div>
                  </div>
                  <button
                    className="checkout-btn"
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
                    Checkout
                  </button>

                  <Modal
                    className="modal-container"
                    isOpen={paymentOpen}
                    onRequestClose={hideCheckout}
                    style={{
                      overlay: {
                        backgroundColor: 'transparent'
                      },
                      content: {
                        backgroundColor: 'rgba(70,190,200,0.25)'
                      }
                    }}
                  >
                    {paymentOpen && (
                      <Flip top delay={1500}>
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
                      </Flip>
                    )}
                  </Modal>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
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
