import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'

const Dummy = () => {
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen ">
        <div className="p-10 text-white bg-purple-800 border rounded-lg shadow-lg">
          This is Dummy component
          <div>
            <Link to="/home">To Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dummy
