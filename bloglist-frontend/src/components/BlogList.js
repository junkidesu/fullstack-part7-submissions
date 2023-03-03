import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  return (
    <TableContainer component={Paper} sx={{ my: '10px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell scope="col" component="th"><b>Blog Title</b></TableCell>
            <TableCell scope="col" component="th"><b>Uploaded By</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>{blog.user.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList
