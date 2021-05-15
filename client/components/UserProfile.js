import React, {useEffect} from 'react'
import {me} from '../store/user'
import {connect, useDispatch} from 'react-redux'
import dateFormat from 'dateformat'
import Clock from './clock/Clock'
import HexagonMenu from './hexmenu/HexagonMenu'

import Fade from 'react-reveal/Fade'

const UserProfile = props => {
  const dispatch = useDispatch()
  const {user} = props

  useEffect(() => {
    dispatch(me())
  }, [])

  return (
    <div className="profile-main-container">
      <div id="hud1-container">
        <img src="/gifs/hud1.gif" alt="hud2" />
      </div>
      <div id="hud5-container">
        <img src="/gifs/hud5.gif" alt="hud2" />
      </div>
      <div id="hud6-container">
        <img src="/gifs/hud6.gif" alt="hud2" />
      </div>
      <div id="hud9-container">
        <img src="/gifs/hud9.gif" alt="hud2" />
      </div>
      <div id="hud10-container">
        <img src="/gifs/hud10.gif" alt="hud2" />
      </div>

      <div id="hud33-container">
        <img src="/gifs/hud33.gif" alt="hud33" />
      </div>
      <div id="hud34-container">
        <img src="/gifs/hud34.gif" alt="hud34" />
      </div>
      <div id="hud40-container">
        <img src="/gifs/hud40.gif" alt="hud40" />
      </div>
      <div id="hud42-container">
        <img src="/gifs/hud42.gif" alt="hud42" />
      </div>
      <div id="hud43-container">
        <img src="/gifs/hud43.gif" alt="hud43" />
      </div>
      <div id="hud44-container">
        <img src="/gifs/hud44.gif" alt="hud44" />
      </div>
      <div id="profile-clock">
        <Clock />
      </div>
      <HexagonMenu />
      <div className="profile-info-wrapper">
        <Fade>
          <div className="profile-info-container">
            <div>Welcome, {user.email}</div>
            <div>Member since {dateFormat(user.createdAt, 'mmm yyyy')}</div>
          </div>
        </Fade>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}
export default connect(mapState)(UserProfile)
