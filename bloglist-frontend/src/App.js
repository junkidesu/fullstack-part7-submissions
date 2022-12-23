import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { loadUsers } from './reducers/usersReducer'
import { loginUser, logoutUser, restoreUser } from './reducers/userReducer'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const users = useSelector(({ users }) => users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loadUsers())
  }, [])

  useEffect(() => {
    dispatch(restoreUser())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(
      loginUser({
        username,
        password,
      })
    )
  }

  const handleLogout = () => {
    console.log('logging out')

    dispatch(logoutUser())
  }

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

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button">log in</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </p>

      <Togglable buttonLabel="create new">
        <CreateBlogForm />
      </Togglable>

      <div id="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog.id)}
            deleteBlog={() => remove(blog.id)}
            username={user.username}
          />
        ))}
      </div>
    </div>
  )
}

export default App
