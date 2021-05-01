import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getUserShoppingCart,
  increaseProductQtyUserThunk,
  decreaseProductQtyUserThunk,
  deletingFromUserCart,
  userCartCheckout
} from '../store/userShoppingCart'

const UserShoppingCart = props => {
  const {
    loadUserCart,
    increaseQty,
    decreaseQty,
    deleteFromUserCart,
    userCheckout,
    products
  } = props

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
              <Link to="/orderconfirmation">
                <button type="submit" onClick={() => userCheckout(userId)}>
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
    products: state.userShoppingCartReducer.userCart
  }
}
const mapDispatch = dispatch => {
  return {
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
    },
    userCheckout: userId => dispatch(userCartCheckout(userId))
  }
}
export default connect(mapState, mapDispatch)(UserShoppingCart)
