import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { TextField, Button } from '@mui/material'

const CreateBlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const handleAddBlog = async (event) => {
    event.preventDefault()

    dispatch(
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      })
    )

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create New Blog</h2>

      <form onSubmit={handleAddBlog}>
        <div>
          <TextField
            required
            id='title'
            variant='filled'
            label='Title'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            id='author'
            variant='filled'
            label='Author'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            required
            id='url'
            variant='filled'
            label='URL'
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          save
        </Button>
      </form>
    </div>
  )
}

export default CreateBlogForm
