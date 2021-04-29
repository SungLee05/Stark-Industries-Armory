import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

const Signup = props => {
  const {name, displayName, authDispatch, error} = props

  const handleSubmit = async evt => {
    evt.preventDefault()
    const formName = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value
    authDispatch(email, password, formName)
  }

  return (
    <div>
      <h1>SIGN UP FORM</h1>
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
              <small>Password</small>
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
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    authDispatch: (email, password, formName) => {
      dispatch(auth(email, password, formName))
    }
  }
}

export default connect(mapState, mapDispatch)(Signup)
