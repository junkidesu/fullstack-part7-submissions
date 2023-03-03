import { Link } from 'react-router-dom'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Added Blogs</b></TableCell>
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
