/* eslint-disable max-statements */
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {logout} from '../../store'

import {RiLogoutBoxRFill} from 'react-icons/Ri'
import {FaSkull, FaHistory} from 'react-icons/fa'
import {AiFillStar} from 'react-icons/ai'
import {SiGoogleanalytics} from 'react-icons/si'

const HexagonMenu = ({user}) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [hexText, setHexText] = useState('OPEN')

  const expand = () => {
    if (open === false) {
      document.getElementById('hex-main-container').style.transform =
        'perspective(200px) rotateY(0deg) rotateX(10deg) translate(-5rem, -10rem)'
      document.getElementById('hex-icon').style.transform = 'rotate(120deg)'
      document.getElementById('hex-text').style.transform =
        'translate(-3px, 0px);'

      // 1st layer
      document.getElementById('hex-item-1').style.transform =
        'translateY(-8rem)'
      document.getElementById('hex-item-2').style.transform =
        'translate(-7rem, -4rem)'
      document.getElementById('hex-item-3').style.transform =
        'translate(7rem, 4rem)'
      document.getElementById('hex-item-4').style.transform = 'translateY(8rem)'
      document.getElementById('hex-item-5').style.transform =
        'translate(-7rem, 4rem)'
      document.getElementById('hex-item-6').style.transform =
        'translate(7rem, -4rem)'

      // 2nd layer
      document.getElementById('hex-item-7').style.transform =
        'translate(0.25rem, -7.75rem)'
      document.getElementById('hex-item-8').style.transform =
        'translate(-7rem, -3.75rem)'
      document.getElementById('hex-item-9').style.transform =
        'translate(7.25rem, 4rem)'
      document.getElementById('hex-item-10').style.transform =
        'translate(0.15rem, 8.25rem)'
      document.getElementById('hex-item-11').style.transform =
        'translate(-7rem, 4rem)'
      document.getElementById('hex-item-12').style.transform =
        'translate(7.25rem, -3.75rem)'

      document.getElementById('hex-item-7').style.zIndex = '3'
      document.getElementById('hex-item-8').style.zIndex = '3'
      document.getElementById('hex-item-9').style.zIndex = '3'
      document.getElementById('hex-item-10').style.zIndex = '3'
      document.getElementById('hex-item-11').style.zIndex = '3'
      document.getElementById('hex-item-12').style.zIndex = '3'
      setHexText('CLOSE')
      setOpen(true)
    } else {
      document.getElementById('hex-main-container').style.transform = ''
      document.getElementById('hex-icon').style.transform = 'rotate(0deg)'
      document.getElementById('hex-text').style.transform = ''

      document.getElementById('hex-item-1').style.transform = 'translateY(0)'
      document.getElementById('hex-item-2').style.transform = 'translate(0)'
      document.getElementById('hex-item-3').style.transform = 'translate(0)'
      document.getElementById('hex-item-4').style.transform = 'translateY(0)'
      document.getElementById('hex-item-5').style.transform = 'translate(0)'
      document.getElementById('hex-item-6').style.transform = 'translate(0)'
      document.getElementById('hex-item-7').style.transform = 'translate(0)'
      document.getElementById('hex-item-8').style.transform = 'translate(0)'
      document.getElementById('hex-item-9').style.transform = 'translate(0)'
      document.getElementById('hex-item-10').style.transform = 'translate(0)'
      document.getElementById('hex-item-11').style.transform = 'translate(0)'
      document.getElementById('hex-item-12').style.transform = 'translate(0)'

      document.getElementById('hex-item-7').style.zIndex = '-1'
      document.getElementById('hex-item-8').style.zIndex = '-1'
      document.getElementById('hex-item-9').style.zIndex = '-1'
      document.getElementById('hex-item-10').style.zIndex = '-1'
      document.getElementById('hex-item-11').style.zIndex = '-1'
      document.getElementById('hex-item-12').style.zIndex = '-1'

      setHexText('OPEN')
      setOpen(false)
    }
  }

  return (
    <>
      <div id="hex-main-container">
        <div className="hex-container" onClick={() => expand()}>
          <div id="hex-icon">
            <img src="/images/arc-reactor.png" id="profile-arc-reactor" />
          </div>
          <div id="hex-text">{hexText}</div>
        </div>

        <div className="hex-menu" id="hex-menus">
          <div className="hex-items" id="hex-item-1" />
          <div className="hex-items" id="hex-item-2" />
          <div className="hex-items" id="hex-item-3" />
          <div className="hex-items" id="hex-item-4" />
          <div className="hex-items" id="hex-item-5" />
          <div className="hex-items" id="hex-item-6" />

          <div id="second-layer-container">
            <div className="hex-items" id="hex-item-7">
              <Link to={`/user/${user.id}/orderhistory`} className="hex-link">
                <FaHistory id="order-history-icon" />
              </Link>
            </div>
            <div className="hex-items" id="hex-item-8">
              <a
                className="hex-link"
                href="#"
                onClick={() => {
                  dispatch(logout())
                }}
              >
                <RiLogoutBoxRFill id="profile-logout-icon" />
              </a>
            </div>
            <div className="hex-items" id="hex-item-9">
              <Link to="/allproducts" className="hex-link">
                <img
                  src="/images/ironmanicon.png"
                  alt="ironman-icon"
                  id="ironman-icon"
                />
              </Link>
            </div>

            <div className="hex-items" id="hex-item-10">
              <Link to="/underconstruction" className="hex-link">
                <AiFillStar id="profile-favorite-icon" />
              </Link>
            </div>

            <div className="hex-items" id="hex-item-11">
              <Link to="/underconstruction" className="hex-link">
                <FaSkull id="profile-delete-icon" />
              </Link>
            </div>

            <div className="hex-items" id="hex-item-12">
              <Link to="/underconstruction" className="hex-link">
                <SiGoogleanalytics id="profile-analytics-icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HexagonMenu
