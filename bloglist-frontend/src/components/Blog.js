import { useDispatch } from 'react-redux'
import { commentOnBlog } from '../reducers/blogReducer'

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
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={like}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {username === blog.user.username ? (
        <button onClick={deleteBlog}>remove</button>
      ) : null}

      <h4>comments</h4>

      <form onSubmit={handleSubmit}>
        <input name="comment" />
        <button type="submit">add comment</button>
      </form>

      <ul>
        {blog.comments.map((c) => (
          <li key={c.body}>{c.body}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
