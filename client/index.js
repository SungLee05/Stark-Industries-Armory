import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

// establishes socket connection
import './socket'

const stripe = loadStripe(
  'pk_test_51IFsCyF8Oat62uvTXBKuxWngn5AJoyQk4aA7nTNOST7Y1CONvcFzaYbUZuvM1G5XjxoZHxl3z1ADsSR3lnNVFtlt00k8XT8AHB'
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Elements stripe={stripe}>
        <App />
      </Elements>
    </Router>
  </Provider>,
  document.getElementById('app')
)
