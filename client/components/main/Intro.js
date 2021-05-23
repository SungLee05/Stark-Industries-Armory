import React from 'react'

const Intro = () => {
  return (
    <div className="intro">
      <img src="/ironmanAboutUs.jpeg" alt="introImg" className="introImg" />
      <div className="about-us">
        <div className="block">
          <div className="about-us-text-container">
            at
            <strong id="intro-text">stark industries</strong>
          </div>
        </div>

        <div className="block">
          <div className="about-us-text-container">
            we design, manufacture, and deliver
          </div>
        </div>

        <div className="block">
          <div className="about-us-text-container">
            advanced
            <strong className="pseudo">pseudo-armor.</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Intro
