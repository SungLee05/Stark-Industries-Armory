/* eslint-disable max-statements */
import React from 'react'
import {Link} from 'react-router-dom'
import {RiLogoutBoxRFill} from 'react-icons/Ri'
import {FaSkull, FaHistory} from 'react-icons/fa'
import {AiFillStar} from 'react-icons/ai'
import {SiGoogleanalytics} from 'react-icons/si'
import {CgMenuRound} from 'react-icons/cg'

const HexagonMenu = () => {
  let open = false

  const expand = () => {
    if (open === false) {
      document.getElementById('hex-main-container').style.transform =
        'perspective(200px) rotateY(0deg) rotateX(10deg) translate(-5rem, -10rem)'
      document.getElementById('hex-icon').style.transform =
        'rotate(90deg) translate(.5rem, -5.5rem)'
      document.getElementById('hex-icon').style.color = '#fbca03'

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

      open = true
    } else {
      document.getElementById('hex-main-container').style.transform = ''
      document.getElementById('hex-icon').style.transform = `rotate(0deg)`
      document.getElementById('hex-icon').style.color = '#ffffff'

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

      // document.getElementById('second-layer-container').style.zIndex = '-1'

      open = false
    }
  }

  return (
    <>
      <div id="hex-main-container">
        <div className="hex-container" onClick={() => expand()}>
          <div id="hex-icon">
            <CgMenuRound />
          </div>
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
              <a className="hex-link" href="#">
                <FaHistory id="order-history-icon" />
              </a>
            </div>
            <div className="hex-items" id="hex-item-8">
              <a className="hex-link" href="#">
                <RiLogoutBoxRFill id="profile-logout-icon" />
              </a>
            </div>
            <div className="hex-items" id="hex-item-9">
              <a className="hex-link" href="#">
                <img
                  src="/ironmanicon.png"
                  alt="ironman-icon"
                  id="ironman-icon"
                />
              </a>
            </div>
            <div className="hex-items" id="hex-item-10">
              <a className="hex-link" href="#">
                <AiFillStar id="profile-favorite-icon" />
              </a>
            </div>
            <div className="hex-items" id="hex-item-11">
              <a className="hex-link" href="#">
                <FaSkull id="profile-delete-icon" />
              </a>
            </div>
            <div className="hex-items" id="hex-item-12">
              <a className="hex-link" href="#">
                <SiGoogleanalytics id="profile-analytics-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HexagonMenu
