import React from 'react'

const Intro = () => {
  return (
    <div className="intro">
      <img src="/ironmanAboutUs.jpeg" alt="introImg" className="introImg" />
      <div className="about-us">
        <div className="about-us-text-container">
          at
          <strong
            style={{
              fontSize: '2.5rem',
              fontStyle: 'italic',
              letterSpacing: '0.1rem'
            }}
          >
            stark industries
          </strong>
        </div>

        <div className="about-us-text-container">
          we design, manufacture, and deliver
        </div>

        <div className="about-us-text-container">
          advanced
          <strong
            className="pseudo"
            style={{letterSpacing: '0.1rem', fontSize: '2.5rem'}}
          >
            pseudo-armor.
          </strong>
        </div>
      </div>
    </div>
  )
}

export default Intro
