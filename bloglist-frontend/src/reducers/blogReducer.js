import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
  },
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogServices.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (blog) => async (dispatch) => {
  try {
    const addedBlog = await blogServices.create(blog)

    dispatch(appendBlog(addedBlog))

    dispatch(setNotification(`added blog '${blog.title}' by ${blog.author}`, 5))
  } catch (error) {
    console.log(error.response.data.error)

    dispatch(setNotification(error.response.data.error, 5))
  }
}

export default blogSlice.reducer
