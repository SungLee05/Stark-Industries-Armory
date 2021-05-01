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
    <div>
      <h1>USER PROFILE PAGE</h1>
      <div>Welcome, {user.email}</div>
      <div>Member since: {dateFormat(user.createdAt, 'mmm yyyy')}</div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}
export default connect(mapState)(UserProfile)
