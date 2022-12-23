import { createSlice } from '@reduxjs/toolkit'
import userServices from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const loadUsers = () => async (dispatch) => {
  const users = await userServices.getAll()

  dispatch(setUsers(users))
}

export default usersSlice.reducer
