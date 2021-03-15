import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'


const Private = () => {
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen ">
        <div className="bg-purple-800 text-white  rounded-lg border shadow-lg p-10">
          This is private component
          <div>
            <Link to="/home">To Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Private