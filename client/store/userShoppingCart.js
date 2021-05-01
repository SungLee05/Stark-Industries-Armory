import axios from 'axios'

const SET_USER_CART = 'SET_USER_CART'
const ADD_PRODUCT_TO_USER_CART = 'ADD_PRODUCT_TO_USER_CART'
const INCREASE_PRODUCT_QTY_USER = 'INCREASE_PRODUCT_QTY_USER'
const DECREASE_PRODUCT_QTY_USER = 'DECREASE_PRODUCT_QTY_USER'
const DELETE_FROM_USER_CART = 'DELETE_FROM_USER_CART'
const USER_CHECKOUT = 'USER_CHECKOUT'

export const setUserCart = products => ({
  type: SET_USER_CART,
  products
})
export const addProductToUserCart = userCart => ({
  type: ADD_PRODUCT_TO_USER_CART,
  userCart
})
export const increaseProductQtyUser = productId => ({
  type: INCREASE_PRODUCT_QTY_USER,
  productId
})
export const decreaseProductQtyUser = productId => ({
  type: DECREASE_PRODUCT_QTY_USER,
  productId
})
export const deleteFromUserCart = productId => ({
  type: DELETE_FROM_USER_CART,
  productId
})
export const userCheckout = () => ({
  type: USER_CHECKOUT
})

export const getUserShoppingCart = () => {
  return async dispatch => {
    try {
      const data = await axios.get(`/api/users/cart`)
      dispatch(setUserCart(data.data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const addProductToUserCartThunk = ProductId => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/users/cart', {
        ProductId: ProductId
      })
      dispatch(addProductToUserCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const increaseProductQtyUserThunk = (ProductId, OrderId) => {
  return async dispatch => {
    try {
      await axios.put('/api/users/cart/increment', {ProductId, OrderId})
      dispatch(increaseProductQtyUser(ProductId))
    } catch (err) {
      console.log(err)
    }
  }
}
export const decreaseProductQtyUserThunk = (ProductId, OrderId) => {
  return async dispatch => {
    try {
      await axios.put('/api/users/cart/decrement', {ProductId, OrderId})
      dispatch(decreaseProductQtyUser(ProductId))
    } catch (err) {
      console.log(err)
    }
  }
}
export const deletingFromUserCart = ProductId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/cart/${ProductId}`)
      dispatch(deleteFromUserCart(ProductId))
    } catch (err) {
      console.log(err)
    }
  }
}
export const userCartCheckout = () => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/checkout`)
      dispatch(userCheckout(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {
  userCart: []
}

export default function userShoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_CART:
      return {...state, userCart: [...action.products]}
    case ADD_PRODUCT_TO_USER_CART:
      return {...state, userCart: [...state.userCart, action.userCart]}
    case INCREASE_PRODUCT_QTY_USER: {
      const addedProducts = state.userCart.map(function add(product) {
        if (product.id === action.productId) {
          product.Orders[0].OrderHistory.quantity++
          return product
        } else {
          return product
        }
      })
      return {...state, userCart: addedProducts}
    }
    case DECREASE_PRODUCT_QTY_USER: {
      const subtractedProduct = state.userCart.map(function subtract(product) {
        if (
          product.id === action.productId &&
          product.Orders[0].OrderHistory.quantity > 1
        ) {
          product.Orders[0].OrderHistory.quantity--
          return product
        } else {
          return product
        }
      })
      return {...state, userCart: subtractedProduct}
    }
    case DELETE_FROM_USER_CART: {
      const deletedCart = state.userCart.filter(
        product => product.id !== action.productId
      )
      return {...state, userCart: deletedCart}
    }
    case USER_CHECKOUT:
      return initialState
    default:
      return state
  }
}
