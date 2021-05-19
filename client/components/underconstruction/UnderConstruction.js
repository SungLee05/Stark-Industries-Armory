import React from 'react'

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
      <div className="under-construction-wrapper">
        <h1>
          We apologize for the inconvenience. <br />
          This page is currently <strong>under construction.</strong>
        </h1>
      </div>
    </div>
  )
}

export default UnderConstruction
