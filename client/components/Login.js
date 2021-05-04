import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {FcGoogle} from 'react-icons/fc'
import {GrFacebookOption} from 'react-icons/gr'
import {FaTwitter} from 'react-icons/fa'

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
      <div className="login-BG">
        <div className="formWrap">
          <div className="login-wrap">
            <h2>LogIn</h2>
            <form
              onSubmit={handleSubmit}
              name={name}
              className="form-container"
            >
              <div>
                <label
                  htmlFor="email"
                  style={{fontSize: '1rem', marginLeft: '2rem'}}
                >
                  Email
                </label>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="formInput"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  style={{fontSize: '1rem', marginLeft: '2rem'}}
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="formInput"
                />
              </div>
              <div className="loginBtn-container">
                <button type="submit" className="loginBtn">
                  {displayName}
                </button>
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </form>

            <div className="socialSignin">
              <div className="row">
                <a href="/auth/google">
                  <FcGoogle className="social-icons" />
                </a>

                <GrFacebookOption
                  className="social-icons"
                  style={{backgroundColor: 'rgb(60,83,154)'}}
                />

                <FaTwitter
                  className="social-icons"
                  style={{backgroundColor: 'rgb(65,170,241)'}}
                />
              </div>
            </div>
          </div>
        </div>
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
