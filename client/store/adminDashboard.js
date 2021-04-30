import axios from 'axios'

const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const SET_PRODUCTS = 'SET_PRODUCT'

export const adminSetProducts = products => ({
  type: SET_PRODUCTS,
  products
})
export const deletingProduct = product => ({
  type: DELETE_PRODUCT,
  product
})
export const creatingProduct = product => ({
  type: CREATE_PRODUCT,
  product
})
export const updatingProduct = product => ({
  type: UPDATE_PRODUCT,
  product
})

export const adminFetchProductsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(adminSetProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const deleteProductThunk = product => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${product.id}`)
      dispatch(deletingProduct(product))
    } catch (error) {
      console.log(error.message)
    }
  }
}
export const createProductThunk = product => {
  return async dispatch => {
    try {
      const created = await axios.post('/api/products', product)
      dispatch(creatingProduct(created.data))
    } catch (error) {
      console.log(error.message)
    }
  }
}
export const updateProductThunk = product => {
  return async dispatch => {
    try {
      const updated = await axios.put(`/api/products`, product)
      dispatch(updatingProduct(updated.data))
    } catch (error) {
      console.log(error.message)
    }
  }
}

const initialState = {
  all: []
}

export default function adminDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, all: action.products}
    case UPDATE_PRODUCT:
      return {
        ...state,
        all: state.all.map(
          product =>
            product.id === action.product.id ? action.product : product
        )
      }
    case CREATE_PRODUCT:
      return {...state, all: [...state.all, action.product]}
    case DELETE_PRODUCT:
      return {
        ...state,
        all: state.all.filter(product => product.id !== action.product.id)
      }
    default:
      return state
  }
}
