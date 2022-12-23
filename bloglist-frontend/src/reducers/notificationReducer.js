import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    resetMessage(state, action) {
      return null
    },
  },
})

export const setNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => dispatch(resetMessage()), duration * 1000)
  }
}
export const { setMessage, resetMessage } = notificationSlice.actions

export default notificationSlice.reducer
