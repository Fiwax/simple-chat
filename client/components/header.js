import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  const { activeChannel } = useSelector((s) => s.channels)
  const channels = useSelector((s) => s.channels.listOfChannels)
  const foundChannel = channels.find((obj) => obj[activeChannel])
  const { description, name } = foundChannel[activeChannel]

  return (
    <div className="border-b flex px-6 py-2 items-center shadow rounded-b-md">
      <div className="flex flex-col">
        <span className="text-grey-700 text-md mb-1 font-extrabold">#{name}</span>
        <span className="text-grey-500 font-extralight text-sm">{description}</span>
      </div>
      <div className="ml-auto hidden md:block">
        <input
          type="search"
          placeholder="Search"
          className="border border-gray-300 rounded-lg bg-gray-200 focus:bg-white focus:outline-none p-1"
        />
      </div>
    </div>
  )
}

export default Header
