import React, {useEffect} from 'react'
import {me} from '../store/user'
import {connect, useDispatch} from 'react-redux'
import dateFormat from 'dateformat'

const UserProfile = props => {
  const dispatch = useDispatch()
  const {user} = props

  useEffect(() => {
    dispatch(me())
  }, [])

  return (
    <div className="profile-main-container">
      <div className="profile-info-container">
        <div>Welcome, {user.email}</div>
        <div>Member since {dateFormat(user.createdAt, 'mmm yyyy')}</div>
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
