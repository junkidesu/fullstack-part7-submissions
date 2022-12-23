import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  const style = {
    backgroundColor: 'lightgrey',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '20px',
    borderSize: '3px',
    borderStyle: 'solid',
    borderRadius: '10px',
  }

  if (!message) {
    return null
  }

  return (
    <div className="error" style={style}>
      {message}
    </div>
  )
}

export default Notification
