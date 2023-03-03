import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material'

const Users = () => {
  const users = useSelector(({ users }) => users)

  return (
    <div>
      <Typography variant='h5' gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper} sx={{ my: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>User</b></TableCell>
              <TableCell><b>Blogs Created</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
