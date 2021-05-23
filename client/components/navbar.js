/* eslint-disable complexity */
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {IconButton, Badge} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import {getUserShoppingCart} from '../store/userShoppingCart'
import {getGuestShoppingCart} from '../store/guestShoppingCart'
import MenuBurger from './menuburger/MenuBurger'

const Navbar = ({
  handleClick,
  isLoggedIn,
  userId,
  admin,
  loadUserCart,
  loadGuestCart,
  products,
  guestProducts
}) => {
  const userCart = products
  const guestCart = guestProducts

  useEffect(
    () => {
      if (userId) {
        loadUserCart(userId)
      } else {
        loadGuestCart()
      }
    },
    [loadUserCart, loadGuestCart]
  )

  return (
    <div className="navbar-BG">
      <nav className="navbar-container">
        {admin ? (
          <Link
            to="/allproducts"
            className="logo-link-container"
            style={{marginRight: '20rem'}}
          >
            <div className="logo-container">
              <img
                src="/starkIndustriesLogo.png"
                className="company-logo"
                alt="company-logo"
              />
            </div>
          </Link>
        ) : (
          <Link to="/allproducts" className="logo-link-container">
            <div className="logo-container">
              <img
                src="/starkIndustriesLogo.png"
                alt="company-logo"
                className="company-logo"
              />
            </div>
          </Link>
        )}

        {isLoggedIn ? (
          <div className="link-container">
            <Link to="/" className="link-style">
              HOME
            </Link>
            <Link to="/profile" className="link-style">
              PROFILE
            </Link>
            {admin ? (
              <Link to="/admin" className="link-style">
                ADMIN
              </Link>
            ) : null}
            {admin ? (
              <Link to="/users" className="link-style">
                ALL USERS
              </Link>
            ) : null}
            <Link to="/allproducts" className="link-style">
              ARMORY
            </Link>
            <Link to={`/user/${userId}/orderhistory`} className="link-style">
              ORDER HISTORY
            </Link>

            <IconButton
              component={Link}
              to={`/user/${userId}/shoppingcart`}
              aria-label="Show cart items"
              color="inherit"
              style={{
                fontSize: '0.5rem',
                padding: '0 1.3rem 0 0',
                alignSelf: 'center',
                margin: '0 0'
              }}
              className="link-style"
            >
              <Badge
                badgeContent={
                  !userCart || !userCart.length
                    ? 0
                    : userCart.reduce(
                        (quantity, product) =>
                          quantity + product.orders[0].orderHistory.quantity,
                        0
                      )
                }
                color="secondary"
              >
                <ShoppingCart
                  style={{
                    fontSize: '1.5rem',
                    padding: '0 0'
                  }}
                />
              </Badge>
            </IconButton>

            <a href="#" onClick={handleClick} className="link-style">
              LOGOUT
            </a>
          </div>
        ) : (
          <div className="link-container">
            <Link to="/" className="link-style">
              HOME
            </Link>
            <Link to="/allproducts" className="link-style">
              ARMORY
            </Link>
            <IconButton
              component={Link}
              to="/guest/shoppingcart"
              aria-label="Show cart items"
              color="inherit"
              style={{
                fontSize: '0.5rem',
                padding: '0 1.3rem 0 0',
                alignSelf: 'center',
                margin: '0 0'
              }}
              className="link-style"
            >
              <Badge
                badgeContent={
                  !guestCart || !guestCart.length
                    ? 0
                    : guestCart.reduce(
                        (quantity, product) => quantity + product.quantity,
                        0
                      )
                }
                color="secondary"
              >
                <ShoppingCart
                  style={{
                    fontSize: '1.5rem',
                    padding: '0 0'
                  }}
                />
              </Badge>
            </IconButton>

            <Link to="/signup" className="link-style">
              REGISTER
            </Link>
            <Link to="/login" className="link-style">
              LOGIN
            </Link>
          </div>
        )}
      </nav>

      <MenuBurger />
    </div>
  )
}

const mapState = state => {
  return {
    products: state.userShoppingCartReducer.userCart,
    guestProducts: state.guestShoppingCartReducer.cart,
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
    },
    loadGuestCart: () => {
      dispatch(getGuestShoppingCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
