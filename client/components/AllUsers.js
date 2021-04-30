import React, {useEffect} from 'react'
import {connect, useDispatch} from 'react-redux'
import {fetchUsersThunk, deleteUserThunk} from '../store/allUsers'

const AllUsers = props => {
  const {allUsers} = props
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsersThunk())
  }, [])

  return (
    <div>
      <h1>ALL USER PAGE</h1>
      {allUsers.map(user => (
        <div key={user.id}>
          <div>email: {user.email}</div>
          <div>admin: {user.admin === true ? 'Yes' : 'No'}</div>
          <button type="button" onClick={() => dispatch(deleteUserThunk(user))}>
            DELETE
          </button>
        </div>
      ))}
    </div>
  )
}

const mapState = state => {
  return {
    allUsers: state.allUsers.users
  }
}
export default connect(mapState)(AllUsers)
