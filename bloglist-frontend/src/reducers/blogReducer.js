import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { setBlogs } = blogSlice.actions

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogServices.getAll()
  dispatch(setBlogs(blogs))
}

export default blogSlice.reducer
