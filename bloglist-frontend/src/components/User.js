import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
