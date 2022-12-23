import { createSlice } from '@reduxjs/toolkit'

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

export default userSlice.reducer
