import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from '@mui/material'
const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <Typography variant="h5">{user.name}</Typography>
      <TableContainer component={Paper} xs={{ my: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Added Blogs</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.blogs.map((b) => (
              <TableRow key={b.id}>
                <TableCell>
                  <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default User
