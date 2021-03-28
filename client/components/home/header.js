import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  const { activeChannel } = useSelector((s) => s.channels)
  const channels = useSelector((s) => s.channels?.listOfChannels)
  const foundChannel = channels.find((obj) => obj.name === activeChannel)
  const { description, name } = foundChannel

  return (
    <div className="flex items-center px-6 py-2 border-b shadow rounded-b-md">
      <div className="flex flex-col">
        <span className="mb-1 font-extrabold text-grey-700 text-md">#{name}</span>
        <span className="text-sm text-grey-500 font-extralight">{description}</span>
      </div>
      <div className="hidden ml-auto md:block">
        <input
          type="search"
          placeholder="Search"
          className="p-1 bg-gray-200 border border-gray-300 rounded-lg focus:bg-white focus:outline-none"
        />
      </div>
    </div>
  )
}

export default Header
