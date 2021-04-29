import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, userId, admin}) => (
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
          <Link to="/guest/shoppingcart">GUEST CART</Link>
        </div>
      )}
    </nav>
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    admin: !!state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
