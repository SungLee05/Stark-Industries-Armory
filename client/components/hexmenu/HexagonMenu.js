/* eslint-disable max-statements */
import React from 'react'
import {Link} from 'react-router-dom'

const HexagonMenu = () => {
  let open = false

  const expand = () => {
    if (open === false) {
      document.getElementById('hex-main-container').style.transform =
        'translate(19rem, 2rem)'
      document.getElementById('hex-icon').style.transform = `rotate(45deg)`
      document.getElementById('hex-menus').style.transform = 'scale(1)'

      document.getElementById('hex-item-1').style.transform =
        'translateY(-7rem)'
      document.getElementById('hex-item-2').style.transform =
        'translate(-6rem, -3.5rem)'
      document.getElementById('hex-item-3').style.transform =
        'rotate(-60deg) translate(-1.5rem, 6rem)'
      document.getElementById('hex-item-4').style.transform = 'translateY(7rem)'
      document.getElementById('hex-item-5').style.transform =
        'rotate(60deg) translate(1.5rem, 6rem)'
      document.getElementById('hex-item-6').style.transform =
        'translate(6rem, -3.5rem)'
      document.getElementById('hex-item-7').style.transform =
        'translateY(14.25rem)'
      document.getElementById('hex-item-8').style.transform =
        'rotate(60deg) translate(7.5rem, 9.5rem)'
      document.getElementById('hex-item-9').style.transform =
        'rotate(-60deg) translate(-7.5rem, 9.5rem)'
      document.getElementById('hex-item-10').style.transform =
        'rotate(180deg) translateY(10.5rem)'
      document.getElementById('hex-item-11').style.transform =
        'rotate(-120deg) translate(4.55rem, 7.75rem)'
      document.getElementById('hex-item-12').style.transform =
        'rotate(120deg) translate(-4.55rem, 7.75rem)'
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
      document.getElementById('hex-item-7').style.transform = 'translate(0)'
      document.getElementById('hex-item-8').style.transform = 'translate(0)'
      document.getElementById('hex-item-9').style.transform = 'translate(0)'
      document.getElementById('hex-item-10').style.transform = 'translate(0)'
      document.getElementById('hex-item-11').style.transform = 'translate(0)'
      document.getElementById('hex-item-12').style.transform = 'translate(0)'

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

          <div className="hex-items" id="hex-item-7">
            <a className="hex-link" href="#">
              <div>ITEM</div>
            </a>
          </div>

          <div className="hex-items" id="hex-item-8">
            <a className="hex-link" href="#">
              <div>ITEM</div>
            </a>
          </div>

          <div className="hex-items" id="hex-item-9">
            <a className="hex-link" href="#">
              <div>ITEM</div>
            </a>
          </div>

          <div className="hex-items" id="hex-item-10">
            <a className="hex-link" href="#">
              <div>ITEM</div>
            </a>
          </div>

          <div className="hex-items" id="hex-item-11">
            <a className="hex-link" href="#">
              <div>ITEM</div>
            </a>
          </div>

          <div className="hex-items" id="hex-item-12">
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
