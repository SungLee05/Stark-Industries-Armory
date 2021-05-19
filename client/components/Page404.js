import React from 'react'

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
      <div className="page404-wrapper">
        <h1 id="text-404">404</h1>
        <h1 id="text-not-found">PAGE NOT FOUND</h1>
      </div>
    </div>
  )
}

export default Page404
