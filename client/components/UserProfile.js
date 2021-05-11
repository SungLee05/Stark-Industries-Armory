import React, {useEffect} from 'react'
import {me} from '../store/user'
import {connect, useDispatch} from 'react-redux'
import dateFormat from 'dateformat'
import Fade from 'react-reveal/Fade'

const UserProfile = props => {
  const dispatch = useDispatch()
  const {user} = props

  useEffect(() => {
    dispatch(me())
  }, [])

  return (
    <div className="profile-main-container">
      <div id="hud4-container">
        <img src="/gifs/hud4.gif" alt="hud2" />
      </div>

      <div id="hud8-container">
        <img src="/gifs/hud8.gif" alt="hud" id="hud8" />
      </div>

      <div id="hud14-container">
        <img src="/gifs/hud14.gif" alt="hud2" />
      </div>

      <div id="hud1-container">
        <img src="/gifs/hud1.gif" alt="hud2" />
      </div>

      <div id="hud3-container">
        <img src="/gifs/hud3.gif" alt="hud2" />
      </div>

      <div id="hud5-container">
        <img src="/gifs/hud5.gif" alt="hud2" />
      </div>

      <div>
        <img src="/gifs/hud6.gif" alt="hud2" />
      </div>

      <div>
        <img src="/gifs/hud7.gif" alt="hud2" />
      </div>

      <div id="hud9-container">
        <img src="/gifs/hud9.gif" alt="hud2" />
      </div>

      <div>
        <img src="/gifs/hud10.gif" alt="hud2" />
      </div>

      <div>
        <img src="/gifs/hud11.gif" alt="hud2" />
      </div>

      <div>
        <img src="/gifs/hud12.gif" alt="hud2" />
      </div>

      <div id="hud13-container">
        <img src="/gifs/hud13.gif" alt="hud2" />
      </div>

      <Fade>
        <div className="profile-info-container">
          <div>Welcome, {user.email}</div>
          <div>Member since {dateFormat(user.createdAt, 'mmm yyyy')}</div>
        </div>
      </Fade>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}
export default connect(mapState)(UserProfile)
