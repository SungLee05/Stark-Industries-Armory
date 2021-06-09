import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Flip from 'react-reveal/Flip'

import {
  increaseProductQtyThunk,
  decreaseProductQtyThunk,
  deletingFromCart,
  guestCartCheckout,
  getGuestShoppingCart
} from '../store/guestShoppingCart'

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

const GuestShoppingCart = props => {
  const {
    products,
    loadGuestShoppingCart,
    addToCart,
    subtractFromCart,
    deleteFromCart,
    checkout
  } = props

  const [paymentOpen, setPaymentOpen] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const guestCart = products
  const user = {
    email: ''
  }

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
    checkout()
    props.history.push('/thank-you', total)
  }

  useEffect(() => {
    loadGuestShoppingCart()
  }, [])

  return (
    <>
      <div className="ironman-gif-container">
        <img className="ironman" src="/images/ironmangif.gif" alt="ironman" />
      </div>
      <div className="cart-main-container">
        <div>
          {!guestCart || guestCart.length === 0 ? (
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
                {guestCart.map(product => (
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
                        <div className="cart-quantity-text">
                          {product.quantity}
                        </div>

                        <div className="increment-decrement-container">
                          <button
                            className="cart-btn"
                            type="button"
                            value="increment"
                            onClick={() => addToCart(product.id)}
                          >
                            <CgMathPlus />
                          </button>

                          <button
                            className="cart-btn"
                            type="button"
                            value="decrement"
                            onClick={() => subtractFromCart(product.id)}
                          >
                            <CgMathMinus />
                          </button>
                        </div>
                      </div>

                      <div className="cart-price-wrapper">
                        <div>
                          {accounting.formatMoney(roundDecimal(product.price))}
                        </div>
                      </div>
                    </div>
                    <div className="remove-btn-container">
                      <button
                        className="cart-btn"
                        type="button"
                        onClick={() => deleteFromCart(product.id)}
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
                        guestCart
                          .reduce(
                            (acc, product) =>
                              acc + product.price * product.quantity,
                            0
                          )
                          .toFixed(2)
                      )}
                    </div>
                  </div>

                  <button
                    className="checkout-btn"
                    type="submit"
                    onClick={() => {
                      startCheckout(
                        guestCart
                          .reduce(
                            (acc, product) =>
                              acc + product.price * product.quantity,
                            0
                          )
                          .toFixed(2)
                      )
                    }}
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
                            cart={guestCart}
                            total={guestCart
                              .reduce(
                                (acc, product) =>
                                  acc + product.price * product.quantity,
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
    products: state.guestShoppingCartReducer.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadGuestShoppingCart: () => {
      dispatch(getGuestShoppingCart())
    },
    addToCart: productId => {
      dispatch(increaseProductQtyThunk(productId))
    },
    subtractFromCart: productId => {
      dispatch(decreaseProductQtyThunk(productId))
    },
    deleteFromCart: productId => {
      dispatch(deletingFromCart(productId))
    },
    checkout: () => dispatch(guestCartCheckout())
  }
}

export default connect(mapState, mapDispatch)(GuestShoppingCart)
