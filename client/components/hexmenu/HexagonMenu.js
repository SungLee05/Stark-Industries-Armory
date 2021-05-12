/* eslint-disable max-statements */
import React from 'react'
import {Link} from 'react-router-dom'

const HexagonMenu = () => {
  let open = false

  const expand = () => {
    if (open === false) {
      document.getElementById('hex-main-container').style.transform =
        'perspective(700px) rotateY(-15deg) rotateX(55deg) translate(15rem, 4rem)'
      document.getElementById('hex-icon').style.transform = `rotate(45deg)`
      document.getElementById('hex-menus').style.transform = 'scale(1)'

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

      open = true
    } else {
      document.getElementById('hex-main-container').style.transform =
        'perspective(140px) rotateY(25deg) rotateX(-20deg) translate(0)'
      document.getElementById('hex-icon').style.transform = `rotate(0deg)`
      document.getElementById('hex-menus').style.transform = 'scale(0.9)'

      document.getElementById('hex-item-1').style.transform = 'translateY(0)'
      document.getElementById('hex-item-2').style.transform = 'translate(0)'
      document.getElementById('hex-item-3').style.transform = 'translate(0)'
      document.getElementById('hex-item-4').style.transform = 'translateY(0)'
      document.getElementById('hex-item-5').style.transform = 'translate(0)'
      document.getElementById('hex-item-6').style.transform = 'translate(0)'
      open = false
    }
  }

  return (
    <>
      <div id="hex-main-container">
        <div className="hex-container" onClick={() => expand()}>
          <div className="hex-toggle" id="hex-toggle">
            <div id="hex-icon">ICON</div>
          </div>
        </div>
        <div className="hex-menu" id="hex-menus">
          <div className="hex-items" id="hex-item-1">
            <a className="hex-link" href="#">
              <div>ITEM</div>
            </a>
          </div>

          <div className="hex-items" id="hex-item-2">
            <a className="hex-link" href="#">
              <div>ITEM</div>
            </a>
          </div>

          <div className="hex-items" id="hex-item-3">
            <a className="hex-link" href="#">
              <div>ITEM</div>
            </a>
          </div>

          <div className="hex-items" id="hex-item-4">
            <a className="hex-link" href="#">
              <div>ITEM</div>
            </a>
          </div>

          <div className="hex-items" id="hex-item-5">
            <a className="hex-link" href="#">
              <div>ITEM</div>
            </a>
          </div>

          <div className="hex-items" id="hex-item-6">
            <a className="hex-link" href="#">
              <div>ITEM</div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default HexagonMenu
