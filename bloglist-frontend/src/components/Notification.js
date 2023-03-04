import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const { message, severity } = useSelector(({ notification }) => notification)

  if (!message) {
    return null
  }

  return (
    <Alert variant="filled" severity={severity} sx={{ mb: '10px' }}>
      {message}
    </Alert>
  )
}

export default Notification
