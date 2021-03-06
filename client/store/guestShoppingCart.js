const SET_GUEST_SHOPPING_CART = 'SET_GUEST_SHOPPING_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const INCREASE_PRODUCT_QTY = 'INCREASE_PRODUCT_QTY'
const DECREASE_PRODUCT_QTY = 'DECREASE_PRODUCT_QTY'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const GUEST_CHECKOUT = 'GUEST_CHECKOUT'

export const setGuestShoppingCart = products => ({
  type: SET_GUEST_SHOPPING_CART,
  products
})
export const addProductToCart = guestCart => ({
  type: ADD_PRODUCT_TO_CART,
  guestCart
})
export const increaseProductQty = guestCart => ({
  type: INCREASE_PRODUCT_QTY,
  guestCart
})
export const decreaseProductQty = guestCart => ({
  type: DECREASE_PRODUCT_QTY,
  guestCart
})
export const deleteFromCart = guestCart => ({
  type: DELETE_FROM_CART,
  guestCart
})
export const guestCheckout = () => ({
  type: GUEST_CHECKOUT
})

export const getGuestShoppingCart = () => {
  return async dispatch => {
    try {
      const products = await JSON.parse(localStorage.getItem('shoppingCart'))
      dispatch(setGuestShoppingCart(products))
    } catch (err) {
      console.log(err)
    }
  }
}
export const addProductToCartThunk = product => {
  return dispatch => {
    try {
      let cart = JSON.parse(localStorage.getItem('shoppingCart'))
      if (cart) {
        const productArray = [...cart].map(item => item.id)
        // checking id to see if product is not in the cart
        if (!productArray.includes(product.id)) {
          cart.push(product)
        }
      } else {
        cart = []
        cart.push(product)
      }
      localStorage.setItem('shoppingCart', JSON.stringify(cart))
      dispatch(addProductToCart(cart))
    } catch (err) {
      console.log(err)
    }
  }
}
export const increaseProductQtyThunk = productId => {
  return dispatch => {
    try {
      let cart = JSON.parse(localStorage.getItem('shoppingCart'))
      cart.filter(item => {
        // filter through cart to see and increase the quantity of the product
        if (productId === item.id) {
          return (item.quantity += 1)
        }
      })
      localStorage.setItem('shoppingCart', JSON.stringify(cart))
      dispatch(increaseProductQty(cart))
    } catch (err) {
      console.log(err)
    }
  }
}
export const decreaseProductQtyThunk = productId => {
  return dispatch => {
    try {
      let cart = JSON.parse(localStorage.getItem('shoppingCart'))
      cart.filter(item => {
        // filter through cart to see and decrease the quantity of the product
        if (productId === item.id && item.quantity !== 1) {
          return (item.quantity -= 1)
        }
      })
      localStorage.setItem('shoppingCart', JSON.stringify(cart))
      dispatch(decreaseProductQty(cart))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deletingFromCart = productId => {
  return dispatch => {
    try {
      let cart = JSON.parse(localStorage.getItem('shoppingCart'))
      let newCart = cart.filter(item => {
        // filter through cart and return items that are not the product
        if (productId !== item.id) return item
      })
      localStorage.setItem('shoppingCart', JSON.stringify(newCart))
      dispatch(deleteFromCart(newCart))
    } catch (err) {
      console.log(err)
    }
  }
}
export const guestCartCheckout = () => {
  return dispatch => {
    try {
      let cart = []
      localStorage.setItem('shoppingCart', JSON.stringify(cart))
      dispatch(deleteFromCart(cart))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {
  cart: []
}

export default function guestShoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GUEST_SHOPPING_CART:
      return {...state, cart: action.products}
    case ADD_PRODUCT_TO_CART:
      return {...state, cart: action.guestCart}
    case INCREASE_PRODUCT_QTY:
      return {...state, cart: action.guestCart}
    case DECREASE_PRODUCT_QTY:
      return {...state, cart: action.guestCart}
    case DELETE_FROM_CART:
      return {...state, cart: action.guestCart}
    case GUEST_CHECKOUT:
      return state
    default:
      return state
  }
}
