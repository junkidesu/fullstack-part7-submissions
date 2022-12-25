const Blog = ({ blog, like, deleteBlog, username }) => {
  if (!blog) return null

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
    </div>
  )
}

export default Blog
