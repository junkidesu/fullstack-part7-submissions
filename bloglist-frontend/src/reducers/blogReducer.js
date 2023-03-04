import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'
import { createNotification } from './notificationReducer'

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
    setBlog(state, action) {
      const blog = action.payload

      return state.map((b) => (b.id === blog.id ? blog : b))
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, setBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogServices.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (blog) => async (dispatch) => {
  try {
    const addedBlog = await blogServices.create(blog)

    dispatch(appendBlog(addedBlog))

    dispatch(createNotification({
      message: `added blog '${blog.title}' by ${blog.author}`,
      severity: 'success'
    }, 5))
  } catch (error) {
    console.log(error.response.data.error)

    dispatch(createNotification({
      message: error.response.data.error,
      severity: 'error'
    }, 5))
  }
}

export const likeBlog = (blog) => async (dispatch) => {
  const likedBlog = await blogServices.update(blog.id, {
    ...blog,
    likes: blog.likes + 1,
  })

  dispatch(setBlog(likedBlog))
}

export const deleteBlog = (id) => async (dispatch) => {
  await blogServices.remove(id)

  dispatch(removeBlog(id))
}

export const commentOnBlog = (id, comment) => async (dispatch) => {
  const updatedBlog = await blogServices.comment(id, comment)

  dispatch(setBlog(updatedBlog))
}

export default blogSlice.reducer
