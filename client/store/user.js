import axios from 'axios'
import history from '../history'
import {addProductToUserCartThunk} from './userShoppingCart'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const defaultUser = {}

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, guestCart) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    const userId = res.data.id
    if (guestCart && guestCart.length) {
      migrateGuestCart(dispatch, userId, guestCart)
    }
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

async function migrateGuestCart(dispatch, userId, guestCart) {
  const guestCartItems = guestCart.map(product => {
    return dispatch(addProductToUserCartThunk(product, userId))
  })

  await Promise.all(guestCartItems)
  window.localStorage.removeItem('shoppingCart')
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
