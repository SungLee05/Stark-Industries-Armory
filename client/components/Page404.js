import React from 'react'
import Fade from 'react-reveal/Fade'

const Page404 = () => {
  return (
    <div className="page404-container">
      <div className="page404-img-container">
        <img
          src="/images/404notfound.jpeg"
          alt="floating-in-space"
          className="page404-img"
        />
      </div>
      <Fade left cascade delay={2000} distance="10%">
        <div className="page404-wrapper">
          <h1 id="text-404">404</h1>
          <h1 id="text-not-found">PAGE NOT FOUND</h1>
        </div>
      </Fade>
    </div>
  )
}

export default Page404
