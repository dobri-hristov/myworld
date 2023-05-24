import { Spinner } from 'react-bootstrap'

const Loading = (props) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      {...props}
    >
      <Spinner animation="border" role="status" />
      <div className="visually-hidden">Loading...</div>
    </div>
  )
}

export default Loading
