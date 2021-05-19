import React from 'react'
import Fade from 'react-reveal/Fade'

const UnderConstruction = () => {
  return (
    <div className="under-construction-container">
      <div className="UC-background-img-container">
        <img
          src="/images/broken-helmet.jpeg"
          alt="broken-helmet"
          className="UC-background-img"
        />
      </div>
      <Fade bottom delay={2000} duration={2000} distance="25%">
        <div className="under-construction-wrapper">
          <h1>
            We apologize for the inconvenience.
            <br />This page is currently <strong>under construction.</strong>
          </h1>
        </div>
      </Fade>
    </div>
  )
}

export default UnderConstruction
