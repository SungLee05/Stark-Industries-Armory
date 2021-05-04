import React from 'react'
import {Link} from 'react-router-dom'

const Directory = () => {
  return (
    <div className="directory">
      <div className="wrap">
        <img src="/starkindustriescompound.png" className="item" />
        <Link to="/allproducts" id="robotics-link">
          <div id="robotic-link-text">Armory</div>
        </Link>
      </div>
    </div>
  )
}

export default Directory
