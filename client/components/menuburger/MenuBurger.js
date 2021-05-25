import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../store'

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/Ai'

const MenuBurger = ({handleClick, isLoggedIn, admin, userId}) => {
  const [open, setOpen] = useState(false)

  const openRightNavBar = () => {
    if (open === false) {
      document.getElementById('right-navbar-container').style.transform =
        'translateX(0%)'
      document.getElementById('menu-bar-open').style.display = 'none'
      document.getElementById('menu-bar-close').style.display = 'inline'
      setOpen(true)
    } else {
      document.getElementById('right-navbar-container').style.transform =
        'translateX(100%)'
      document.getElementById('menu-bar-open').style.display = 'inline'
      document.getElementById('menu-bar-close').style.display = 'none'
      setOpen(false)
    }
  }

  return (
    <div id="menu-bar-container">
      <FaIcons.FaBars id="menu-bar-open" onClick={openRightNavBar} />
      <AiIcons.AiOutlineClose id="menu-bar-close" onClick={openRightNavBar} />
      <div id="right-navbar-container" onClick={openRightNavBar}>
        {isLoggedIn ? (
          <>
            <Link to="/" className="bar-link-style">
              HOME
            </Link>
            <Link to="/profile" className="bar-link-style">
              PROFILE
            </Link>
            {admin ? (
              <>
                <Link to="/admin" className="bar-link-style">
                  ADMIN
                </Link>
                <Link to="/users" className="bar-link-style">
                  ALL USERS
                </Link>
              </>
            ) : null}
            <Link to="/allproducts" className="bar-link-style">
              ARMORY
            </Link>
            <Link
              to={`/user/${userId}/orderhistory`}
              className="bar-link-style"
            >
              ORDER HISTORY
            </Link>
            <Link
              to={`/user/${userId}/shoppingcart`}
              className="bar-link-style"
            >
              ORDERS
            </Link>

            <a href="#" onClick={handleClick} className="bar-link-style">
              LOGOUT
            </a>
          </>
        ) : (
          <>
            <Link to="/" className="bar-link-style">
              HOME
            </Link>
            <Link to="/allproducts" className="bar-link-style">
              ARMORY
            </Link>
            <Link to="/guest/shoppingcart" className="bar-link-style">
              ORDERS
            </Link>
            <Link to="/signup" className="bar-link-style">
              REGISTER
            </Link>
            <Link to="/login" className="bar-link-style">
              LOGIN
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    admin: !!state.user.admin,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}
export default connect(mapState, mapDispatch)(MenuBurger)
