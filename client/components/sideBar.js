import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import DirectMessages from './sidebar/directMessages'
import Applications from './sidebar/applications'
import UserList from './sidebar/userList'
import ChannelList from './sidebar/channelList'
import LogoutButton from './sidebar/logoutButton'

const SideBar = () => {
  const { full_name } = useSelector((s) => s.auth.user)
  const role = useSelector((s) => s.auth?.user?.role || [])
  const isAdmin = role.includes('admin')

  useEffect(() => {
    const sidebar = document.querySelector('.sidebar')
    const sidebarMobileMenu = document.querySelector('#sidebar-menu-button')
    sidebarMobileMenu.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full')
    })
  }, [])

  return (
    <div className="sidebar min-w-max inset-y-0 left-0 transform -translate-x-full md:translate-x-0 absolute md:relative transition duration-200 ease-in-out w-2/4 h-screen pb-6 overflow-y-auto bg-gray-800 md:block">
      <h1 className="flex justify-start px-3 mt-3 mb-2 font-sans text-xl text-white">
        <span>Tailwind CSS</span>
        <button id="sidebar-menu-button" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mt-0.5 md:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </h1>
      <div className="flex items-center justify-between px-4 py-1 mb-2">
        <div className="flex space-x-1">
          <span className="w-2 h-2 my-2 bg-green-500 rounded-full" />
          <span className="text-white ">{full_name}</span>
        </div>
        {isAdmin && (
          <Link to="/home/admin">
            <span className="flex w-5 h-5 text-white cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
          </Link>
        )}
      </div>

      {/* CHANNEL LIST */}
      <ChannelList />

      {/* Dirrect Messages */}
      <DirectMessages />

      {/* Userlist */}
      <UserList />

      {/* Application */}
      <Applications />

      {/* <button
        type="button"
        onClick={logOut}
        className="block px-10 py-3 mx-auto text-xs text-white uppercase bg-indigo-800 rounded shadow hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
      >
        Log out
      </button> */}
      <LogoutButton />
    </div>
  )
}

SideBar.propTypes = {}

export default SideBar
