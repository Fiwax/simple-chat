import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'

const OpeningPage = () => {
  return (
    <div>
      <Head title="Hello" />
      <div className="flex bg-gray-800 items-center rounded-b p-4 uppercase text-white font-medium justify-between">
        <Link
          className="px-2 text-gray-300 hover:text-white transition duration-200"
          to="/registration"
        >
          Sign up
        </Link>
        <Link className="text-gray-300 hover:text-white transition duration-200" to="/login">
          Log in
        </Link>
      </div>
      <div className="flex items-center justify-center h-screen ">
        <div className="p-10 bg-white h-64 w-64 rounded-full shadow-2xl bg-white rounded-lg shadow-lg">
          {/* grid */}
          <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full">
            {/* blues */}
            <div className="col-start-2 bg-blue-400 rounded-full" />
            <div className="row-start-2 col-span-2  bg-blue-400 rounded-full" />
            {/* greens */}
            <div className="row-span-2 bg-green-400 rounded-full" />
            <div className="row-start-2 col-start-4 bg-green-400 rounded-full" />
            {/* reds */}
            <div className="row-start-3 bg-red-600 rounded-full" />
            <div className="col-start-2 row-span-2 bg-red-600 rounded-full" />
            {/* oranges */}
            <div className="col-span-2 bg-yellow-500 rounded-full" />
            <div className="col-start-3 bg-yellow-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpeningPage
