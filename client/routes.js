import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Login,
  Signup,
  LandingPage,
  Products,
  SingleProduct,
  GuestShoppingCart,
  AdminDashboard,
  AllUsers,
  UserProfile,
  OrderHistory,
  UserShoppingCart,
  Checkout,
  PostCheckout,
  StripeFailure,
  UnderConstruction,
  Page404
} from './components'

import {me} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const {admin} = this.props

    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/allproducts" component={Products} />
          <Route exact path="/product/:id" component={SingleProduct} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/guest/shoppingcart"
            component={GuestShoppingCart}
          />
          <Route exact path="/thank-you" component={PostCheckout} />
          <Route
            exact
            path="/underconstruction"
            component={UnderConstruction}
          />
          <Route exact path="/pagenotfound" component={Page404} />

          {admin && (
            <Switch>
              <Route exact path="/profile" component={UserProfile} />
              <Route exact path="/users" component={AllUsers} />
              <Route exact path="/admin" component={AdminDashboard} />
              <Route exact path="/allproducts" component={Products} />
              <Route exact path="/product/:id" component={SingleProduct} />
              <Route
                exact
                path="/user/:id/orderhistory"
                component={OrderHistory}
              />
              <Route
                exact
                path="/user/:id/shoppingcart"
                component={UserShoppingCart}
              />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/thank-you" component={PostCheckout} />
              <Route exact path="/stripe-failure" component={StripeFailure} />
            </Switch>
          )}

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/profile" component={UserProfile} />
              <Route exact path="/allproducts" component={Products} />
              <Route exact path="/product/:id" component={SingleProduct} />
              <Route
                exact
                path="/user/:id/orderhistory"
                component={OrderHistory}
              />
              <Route
                exact
                path="/user/:id/shoppingcart"
                component={UserShoppingCart}
              />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/thank-you" component={PostCheckout} />
              <Route exact path="/stripe-failure" component={StripeFailure} />
            </Switch>
          )}
          <Route component={LandingPage} />
        </Switch>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    admin: !!state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
