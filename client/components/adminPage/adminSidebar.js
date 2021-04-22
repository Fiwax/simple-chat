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
        {/* <Link to="/home/admin">
          <svg className="w-6 h-6 text-purple-100 fill-current" viewBox="0 0 32 32">
            <g id="surface1">
              <path d="M 16 3 C 14.894531 3 14 3.894531 14 5 C 14 5.085938 14.019531 5.167969 14.03125 5.25 C 10.574219 6.132813 8 9.273438 8 13 L 8 22 C 8 22.566406 7.566406 23 7 23 L 6 23 L 6 25 L 13.1875 25 C 13.074219 25.316406 13 25.648438 13 26 C 13 27.644531 14.355469 29 16 29 C 17.644531 29 19 27.644531 19 26 C 19 25.648438 18.925781 25.316406 18.8125 25 L 26 25 L 26 23 L 25 23 C 24.433594 23 24 22.566406 24 22 L 24 13.28125 C 24 9.523438 21.488281 6.171875 17.96875 5.25 C 17.980469 5.167969 18 5.085938 18 5 C 18 3.894531 17.105469 3 16 3 Z M 15.5625 7 C 15.707031 6.988281 15.851563 7 16 7 C 16.0625 7 16.125 7 16.1875 7 C 19.453125 7.097656 22 9.960938 22 13.28125 L 22 22 C 22 22.351563 22.074219 22.683594 22.1875 23 L 9.8125 23 C 9.925781 22.683594 10 22.351563 10 22 L 10 13 C 10 9.824219 12.445313 7.226563 15.5625 7 Z M 16 25 C 16.5625 25 17 25.4375 17 26 C 17 26.5625 16.5625 27 16 27 C 15.4375 27 15 26.5625 15 26 C 15 25.4375 15.4375 25 16 25 Z " />
            </g>
          </svg>
        </Link> */}
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
