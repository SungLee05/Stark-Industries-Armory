import axios from 'axios'

const SET_USERS = 'SET_USERS'
const DELETE_USER = 'DELETE_USER'
const UPDATE_ADMIN_RIGHTS = 'UPDATE_ADMIN_RIGHTS'

export const setUsers = users => ({
  type: SET_USERS,
  users
})
export const fetchUsersThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setUsers(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteUser = user => ({
  type: DELETE_USER,
  user
})
export const deleteUserThunk = user => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${user.id}`)
      dispatch(deleteUser(user))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  users: []
}

export default function allUsers(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {...state, users: action.users}
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.user.id)
      }
    default:
      return state
  }
}
