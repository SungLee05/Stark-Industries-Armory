import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {loadStripe} from '@stripe/stripe-js'
import {Element} from '@stripe/react-stripe-js'

// establishes socket connection
import './socket'

const stripe = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Element stripe={stripe}>
        <App />
      </Element>
    </Router>
  </Provider>,
  document.getElementById('app')
)
