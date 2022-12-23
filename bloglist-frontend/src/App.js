import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { loadUsers } from './reducers/usersReducer'
import { loginUser, logoutUser, restoreUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(({ user }) => user)

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

      <BlogList />
    </div>
  )
}

export default App
