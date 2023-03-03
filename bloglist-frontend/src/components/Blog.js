import { useDispatch } from 'react-redux'
import { commentOnBlog } from '../reducers/blogReducer'
import {
  Container,
  Typography,
  Link,
  TextField,
  Button,
} from '@mui/material'

const Blog = ({ blog, like, deleteBlog, username }) => {
  if (!blog) return null

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const comment = event.target.comment.value
    dispatch(commentOnBlog(blog.id, comment))

    event.target.comment.value = ''
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        {blog.title} {blog.author}
      </Typography>

      <Link href={blog.url} variant="body1" target="_blank">
        {blog.url}
      </Link>

      <Typography variant="body1">
        {blog.likes} likes &nbsp;
        <Button variant="contained" color="success" size="small" onClick={like}>
          like
        </Button>
      </Typography>

      <Typography variant="body1" gutterBottom>
        added by {blog.user.name}&nbsp;
        {username === blog.user.username ? (
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={deleteBlog}
          >
            remove
          </Button>
        ) : null}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="New comment"
          size="small"
          name="comment"
          sx={{ width: '350px' }}
        />
        <Button variant="contained" type="submit">
          add comment
        </Button>
      </form>

      <ul>
        {blog.comments.map((c) => (
          <li key={c.body}>
            <Typography variant="body1" gutterBottom>
              {c.body}
            </Typography>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default Blog
