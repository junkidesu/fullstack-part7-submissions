import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { loadUsers } from './reducers/usersReducer'
import { logoutUser, restoreUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import { Container } from '@mui/material'

const Home = () => {
  const user = useSelector(({ user }) => user)
  return (
    <div>
      {!user ? null : (
        <Togglable buttonLabel="create new">
          <CreateBlogForm />
        </Togglable>
      )}

      <BlogList />
    </div>
  )
}

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
      {user ? (
        <span style={padding}>
          {user.name} logged in <button onClick={handleLogout}>log out</button>
        </span>
      ) : (
        <Link to="/login" style={padding}>
          login
        </Link>
      )}
    </div>
  )
}

const App = () => {
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

  const like = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    await dispatch(likeBlog(blog))
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
    <Container>
      <div>
        <h2>blogs</h2>

        <Menu />

        <Notification />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/users/:id"
            element={
              user ? (
                <User user={foundUser} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={foundBlog}
                deleteBlog={() => remove(foundBlog.id)}
                like={() => like(foundBlog.id)}
                username={user ? user.username : null}
              />
            }
          />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Container>
  )
}

export default App
