import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {FcGoogle} from 'react-icons/fc'
import {GrFacebookOption} from 'react-icons/gr'
import {FaGithub} from 'react-icons/fa'
import Fade from 'react-reveal/Fade'

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
      <Fade top cascade>
        <div className="login-BG">
          <div className="formWrap">
            <Fade top cascade>
              <div className="login-wrap">
                <h2>LogIn</h2>
                <form
                  onSubmit={handleSubmit}
                  name={name}
                  className="form-container"
                >
                  <div className="label-container">
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      type="text"
                      placeholder="Email"
                      className="formInput"
                    />
                  </div>
                  <div className="label-container">
                    <label htmlFor="password">Password</label>
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
                  {error &&
                    error.response && (
                      <div style={{textAlign: 'center'}}>
                        {' '}
                        {error.response.data}{' '}
                      </div>
                    )}
                </form>

                <div className="socialSignin">
                  <div className="row">
                    <a href="/auth/google">
                      <FcGoogle
                        className="social-icons"
                        style={{
                          backgroundColor: 'rgb(255,255,255)'
                        }}
                      />
                    </a>

                    <a href="/auth/facebook">
                      <GrFacebookOption
                        className="social-icons"
                        style={{backgroundColor: 'rgb(60,83,154)'}}
                      />
                    </a>

                    <a href="/auth/github">
                      <FaGithub
                        className="social-icons"
                        style={{backgroundColor: 'white', color: 'black'}}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </Fade>
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
