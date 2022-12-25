import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  const like = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    dispatch(likeBlog(blog))
    dispatch(setNotification(`liked blog '${blog.title}'`, 5))
  }

  const remove = async (id) => {
    console.log('delete', id)

    const blog = blogs.find((b) => b.id === id)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(id))
      dispatch(setNotification(`deleted '${blog.title}'`, 5))
    }
  }

  return (
    <div id="blogs">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={() => like(blog.id)}
          deleteBlog={() => remove(blog.id)}
          username={user.username}
        />
      ))}
    </div>
  )
}

export default BlogList
