import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    severity: null
  },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    resetNotification(state, action) {
      return {
        message: null,
        severity: null
      }
    },
  },
})

export const createNotification = (notification, duration) => {
  return async (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => dispatch(resetNotification()), duration * 1000)
  }
}

export const { setNotification, resetNotification } = notificationSlice.actions

export default notificationSlice.reducer
