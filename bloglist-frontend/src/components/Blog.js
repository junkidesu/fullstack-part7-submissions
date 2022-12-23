import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, deleteBlog, username }) => {
  const [full, setFull] = useState(false)

  const blogStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: '5px',
    paddingTop: '10px',
    paddingLeft: '2px',
    marginTop: '5px',
    marginBottom: '5px',
  }

  const detailsStyle = {
    display: full ? '' : 'none',
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setFull(!full)}>{full ? 'hide' : 'view'}</button>
      </div>

      <div style={detailsStyle} className="blogDetails">
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        <button onClick={like}>like</button> <br />
        <div>{blog.user.name}</div>
        {username === blog.user.username ? (
          <button onClick={deleteBlog}>remove</button>
        ) : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
