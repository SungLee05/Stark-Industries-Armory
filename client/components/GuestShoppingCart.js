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

  let total = guestCart
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toFixed(2)

  const roundDecimal = num => {
    return Number(num).toFixed(2)
  }

  useEffect(() => {
    loadGuestShoppingCart()
  }, [])

  return (
    <div>
      <h1>GUEST SHOPPING CART PAGE</h1>
      <div>
        {!guestCart.length || !guestCart ? (
          <div>Shopping Cart Is Empty!</div>
        ) : (
          <div>
            {guestCart.map(product => (
              <div key={product.id}>
                <h4>{product.name}</h4>
                <img src={product.imageUrl} height="150" />
                <h4>Quantity: {product.quantity}</h4>
                <h4>Price: ${roundDecimal(product.price)}</h4>

                <button type="button" onClick={() => addToCart(product.id)}>
                  +
                </button>
                <button
                  type="button"
                  onClick={() => subtractFromCart(product.id)}
                >
                  -
                </button>

                <button
                  type="button"
                  onClick={() => deleteFromCart(product.id)}
                >
                  Remove From Cart
                </button>
              </div>
            ))}
            <div>
              <div>TOTAL: ${total}</div>
              <Link to="/orderconfirmation">
                <button type="submit" onClick={() => checkout()}>
                  Place Your Order
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
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
