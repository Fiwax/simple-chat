import React from 'react'
import { useSelector } from 'react-redux'
import { history } from '../../redux'

const AdminSidebar = () => {
  const { full_name } = useSelector((s) => s.auth.user)

  const handleClick = () => {
    history.push('/home')
  }

  return (
    <div className="admin-sidebar min-w-max inset-y-0 left-0 transform -translate-x-full md:translate-x-0 absolute md:relative transition duration-200 ease-in-out w-1/5 h-screen pb-6 overflow-y-auto bg-gray-800 md:block">
      <h1 className="flex justify-start px-4 mt-3 mb-2 font-sans text-xl text-white">
        <span>Tailwind CSS</span>
      </h1>
      <div className="flex items-center justify-between px-4 py-1 mb-2">
        <div className="flex space-x-1">
          <span className="w-2 h-2 my-2 bg-green-500 rounded-full" />
          <span className="text-white ">{full_name}</span>
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={handleClick}
          className="block px-10 py-3 mx-auto text-xs text-white uppercase bg-indigo-800 rounded shadow hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
        >
          Back
        </button>
      </div>
    </div>
  )
}

AdminSidebar.propTypes = {}

export default AdminSidebar
