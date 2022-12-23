import { createSlice } from '@reduxjs/toolkit'
import loginServices from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    removeUser(state, action) {
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const user = await loginServices.login(credentials)

    dispatch(setUser(user))

    window.localStorage.setItem('loggedInUser', JSON.stringify(user))

    dispatch(setNotification(`logged in as ${user.username}`, 5))
  } catch (error) {
    console.log(error.response.data.error)
    dispatch(setNotification(error.response.data.error, 5))
  }
}

export default userSlice.reducer
