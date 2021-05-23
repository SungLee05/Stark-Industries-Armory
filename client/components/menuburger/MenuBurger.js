import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/Ai'

const MenuBurger = () => {
  const [open, setOpen] = useState(false)

  const openRightNavBar = () => {
    console.log('openbarClicked!')
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
        <Link to="/" className="bar-link-style">
          HOME
        </Link>
        <Link to="/allproducts" className="bar-link-style">
          ARMORY
        </Link>
        <Link to="/signup" className="bar-link-style">
          REGISTER
        </Link>
        <Link to="/login" className="bar-link-style">
          LOGIN
        </Link>
      </div>
    </div>
  )
}

export default MenuBurger
