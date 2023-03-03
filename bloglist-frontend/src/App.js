import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { loadUsers } from './reducers/usersReducer'
import { loginUser, logoutUser, restoreUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import { Container } from '@mui/material'

const Home = () => (
  <div>
    <Togglable buttonLabel="create new">
      <CreateBlogForm />
    </Togglable>

    <BlogList />
  </div>
)

const Menu = () => {
  const menuStyle = {
    backgroundColor: 'lightgray',
    padding: '5px',
    marginBottom: '15px',
  }

  const padding = {
    paddingRight: '5px',
  }

  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user)

  const handleLogout = () => {
    console.log('logging out')

    dispatch(logoutUser())
  }

  return (
    <div style={menuStyle}>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      <span style={padding}>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </span>
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const users = useSelector(({ users }) => users)

  const match = useMatch('/users/:id')
  const foundUser = match ? users.find((u) => u.id === match.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const foundBlog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null

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
      <Container>
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
      </Container>
    )
  }

  return (
    <Container>
      <div>
        <h2>blogs</h2>

        <Menu />

        <Notification />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User user={foundUser} />} />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={foundBlog}
                deleteBlog={() => remove(foundBlog.id)}
                like={() => like(foundBlog.id)}
                username={user.username}
              />
            }
          />
        </Routes>
      </div>
    </Container>
  )
}

export default App
