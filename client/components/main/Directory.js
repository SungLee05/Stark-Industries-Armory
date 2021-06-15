import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

const Directory = () => {
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#robotic-link-text',
        toggleActions: 'restart none none none',
        start: 'top bottom'
      }
    })
    timeline.from('#robotic-link-text', {
      x: -1000,
      duration: 3
    })
  })

  return (
    <div className="directory">
      <div className="wrap">
        <img src="/images/starkindustriescompound.png" className="item" />
        <Link to="/allproducts" id="robotics-link">
          <div id="robotic-link-text">
            <div>Stark</div>
            <div>Armory</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Directory
