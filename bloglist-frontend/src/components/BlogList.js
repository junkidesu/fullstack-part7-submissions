import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  const style = {
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'darkgrey',
    padding: '10px 5px',
    margin: '5px 0px',
  }

  return (
    <div id="blogs">
      {blogs.map((blog) => (
        <div key={blog.id} style={style}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
