import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

const Login = props => {
  const {name, displayName, authDispatch, error, guestCart} = props

  const handleSubmit = async evt => {
    evt.preventDefault()
    const formName = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value
    await authDispatch(email, password, formName, guestCart)
  }

  return (
    <div>
      <h1>LOG IN PAGE</h1>
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small className="loginput">Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small className="loginput">Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a id="GOOGLE" href="/auth/google">
          {displayName} with Google
        </a>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    guestCart: state.guestShoppingCartReducer.cart
  }
}

const mapDispatch = dispatch => {
  return {
    authDispatch: (email, password, formName, guestCart) => {
      dispatch(auth(email, password, formName, guestCart))
    }
  }
}

export default connect(mapState, mapDispatch)(Login)
