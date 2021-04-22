import React from 'react'
import { useSelector } from 'react-redux'
import { history } from '../../redux'

const AdminSidebar = () => {
  const { full_name } = useSelector((s) => s.auth.user)

  const handleClick = () => {
    history.push('/home')
  }

  return (
    <div className="hidden w-1/5 pb-6 bg-gray-800 md:block">
      <h1 className="flex justify-between px-4 mt-3 mb-2 font-sans text-xl text-white">
        <span>Tailwind CSS</span>
      </h1>
      <div className="flex items-center justify-between px-4 py-1 mb-2">
        <div className="flex space-x-1">
          <span className="w-2 h-2 my-2 bg-green-500 rounded-full" />
          <span className="text-white ">{full_name}</span>
        </div>
        <span className="flex w-5 h-5 text-white cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </span>
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
