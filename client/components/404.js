import React, { useEffect } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'

const NotFound = () => {
  useEffect(() => {}, [])
  const dispatch = useDispatch()
  return (
    <div className="container main-wrapper aligner">
      <div className="text-center aligner-item ">
        <h1 className="display-1">404</h1>
        <p className="mb-5 text-gray-800 lead">Page Not Found</p>
        <p className="mb-0 text-gray-500">It looks like you found a glitch in the matrix...</p>
        <br />
        <button
          className="btn btn-secondary btn-lg"
          type="button"
          tabIndex="0"
          onClick={() => {
            dispatch(push('/'))
          }}
        >
          {' '}
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}

NotFound.propTypes = {}

NotFound.defaultProps = {}

export default NotFound
