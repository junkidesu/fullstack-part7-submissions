import { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { TextField, InputAdornment, IconButton, Button, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user)

  if (user) {
    return <Navigate replace to="/" />
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(
      loginUser({
        username,
        password,
      })
    )
  }

  return (
    <div>
      <Typography variant='h5' gutterBottom>
        Login to the application
      </Typography>

      <form onSubmit={handleLogin}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <TextField
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              variant="filled"
              label="Username"
              required
            />
          </div>
          <div>
            <TextField
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              variant="filled"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <Button variant="contained" color="primary" type="submit">
          log in
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
