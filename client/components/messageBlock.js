import React from 'react'

const MessageBlock = ({ message }) => {
  return (
    <div className="flex items-start mb-4">
      <img
        src="https://avatars2.githubusercontent.com/u/343407?s=460&v=4"
        alt="title"
        className="w-10 h-10 rounded mr-3"
      />
      <div className="flex flex-col">
        <div className="flex items-end ">
          <span className="font-bold text-md mr-2 font-sans">{message.name}</span>
          <span className="text-gray-600 text-xs font-light py-0.5">{message.time}</span>
        </div>
        <p className="font-light text-md text-gray-900 pt-0.5">{message.text}</p>
      </div>
    </div>
  )
}

MessageBlock.propTypes = {}

export default MessageBlock
