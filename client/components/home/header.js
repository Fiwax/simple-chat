import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  const { activeChannel } = useSelector((s) => s.channels)
  const channels = useSelector((s) => s.channels?.listOfChannels)
  const foundChannel = channels.find((obj) => obj.name === activeChannel)
  const descriptionOfChannel = foundChannel?.description
  const nameOfChannel = foundChannel?.name || ''


 const mobileMenu = document.querySelector('.mobile-menu-button')
 const sidebar = document.querySelector('.sidebar')

 mobileMenu?.addEventListener('click', () => {
   sidebar.classList.toggle('-translate-x-full')
 })

 console.log(mobileMenu, 'haha')


  return (
    <div className="flex items-center justify-between px-6 py-2 border-b shadow rounded-b-md">
      <div className="flex flex-col">
        <span className="mb-1 font-extrabold text-grey-700 text-md">{nameOfChannel}</span>
        <span className="text-sm text-grey-500 font-extralight ">{descriptionOfChannel}</span>
      </div>
      <div className="hidden ml-auto md:block">
        <input
          type="search"
          placeholder="Search"
          className="p-1 bg-gray-200 border border-gray-300 rounded-lg focus:bg-white focus:outline-none"
        />
      </div>
      <button type="button" className="mobile-menu-button md:hidden">
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  )
}

export default Header
