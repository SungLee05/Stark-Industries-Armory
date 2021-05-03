import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {IconButton, Badge} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import {getUserShoppingCart} from '../store/userShoppingCart'

const Navbar = ({
  handleClick,
  isLoggedIn,
  userId,
  admin,
  loadUserCart,
  products
}) => {
  const userCart = products

  useEffect(
    () => {
      if (userId) {
        loadUserCart(userId)
      }
    },
    [loadUserCart]
  )

  return (
    <div>
      <h1>STARK INDUSTRIES ARMORY</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/home">My Account</Link>
            {admin ? <Link to="/admin"> Admin</Link> : <span />}
            {admin ? <Link to="/users">All Users</Link> : <span />}
            <Link to="/allproducts">ALL PRODUCTS</Link>
            <Link to={`/user/${userId}/orderhistory`}>Order History</Link>

            <IconButton
              component={Link}
              to={`/user/${userId}/shoppingcart`}
              aria-label="Show cart items"
              color="inherit"
              style={{
                fontSize: '2rem',
                padding: '0 0',
                alignSelf: 'center',
                marginBottom: '0.4rem',
                marginRight: '0.5rem'
              }}
            >
              <Badge
                badgeContent={userCart.reduce(
                  (quantity, product) =>
                    quantity + product.orders[0].orderHistory.quantity,
                  0
                )}
                color="secondary"
              >
                <ShoppingCart
                  style={{
                    fontSize: '2rem',
                    padding: '0 0'
                  }}
                />
              </Badge>
            </IconButton>

            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            <Link to="/">HOME</Link>
            <Link to="/allproducts">All PRODUCTS</Link>
            <Link to="/login">LOG IN</Link>
            <Link to="/signup">SIGN UP</Link>
            <Link to="/guest/shoppingcart">SHOPPING CART</Link>
          </div>
        )}
      </nav>
    </div>
  )
}

const mapState = state => {
  return {
    products: state.userShoppingCartReducer.userCart,
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    admin: !!state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    loadUserCart: userId => {
      dispatch(getUserShoppingCart(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
