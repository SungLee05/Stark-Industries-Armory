import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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

const GuestShoppingCart = props => {
  const {
    products,
    loadGuestShoppingCart,
    addToCart,
    subtractFromCart,
    deleteFromCart,
    checkout
  } = props

  const guestCart = products

  const roundDecimal = num => {
    return Number(num).toFixed(2)
  }

  useEffect(() => {
    loadGuestShoppingCart()
  }, [])

  return (
    <>
      <div className="ironman-gif-container">
        <img className="ironman" src="/ironmangif.gif" alt="ironman" />
      </div>
      <div className="cart-main-container">
        <div>
          {!guestCart || guestCart.length === 0 ? (
            <div className="cart-empty-container">
              <div className="cart-empty">There are no orders to fulfill.</div>
            </div>
          ) : (
            <div>
              {guestCart.map(product => (
                <div key={Math.random()} className="cart-info-container">
                  <div className="cart-glass-container">
                    <div className="cart-img-wrapper">
                      <img src={product.singleInfoImageUrl} height="150" />
                    </div>

                    <div className="cart-name-wrapper">
                      <div className="cart-fullname">{product.fullName}</div>
                    </div>

                    <div className="cart-quantity-container">
                      <div style={{padding: '1rem', width: '1rem'}}>
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
                  <div style={{marginRight: '2rem'}}>TOTAL :</div>

                  <div style={{width: '10rem', textAlign: 'center'}}>
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
                <Link
                  to="/orderconfirmation"
                  style={{textDecoration: 'none', color: 'black', zIndex: 3}}
                >
                  <button
                    className="checkout-btn"
                    type="submit"
                    onClick={() => checkout()}
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
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
