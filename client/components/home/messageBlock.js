import React from 'react'

const MessageBlock = ({ message }) => {
  const HumanReadableTime = (unix) => {
    const date = new Date(unix)
    const lengthDate = `${date.getHours()}:${date.getMinutes()}`.length
    const MIN_LENGTH_TIME = 5

    if (lengthDate === MIN_LENGTH_TIME) return `${date.getHours()}:${date.getMinutes()}`
    return `${date.getHours()}:${date.getMinutes()}0`
  }

  return (
    <div className="flex items-start mb-4">
      <img src={message.userPic} alt="avatar" loading="lazy" className="w-10 h-10 mr-3 rounded" />
      <div className="flex flex-col">
        <div className="flex items-end ">
          <span className="mr-2 font-sans font-bold text-md">{message.name}</span>
          <span className="text-gray-600 text-xs font-light py-0.5">
            {HumanReadableTime(message.time)}
          </span>
        </div>
        <p className="font-light text-md text-gray-900 pt-0.5">{message.text}</p>
      </div>
    </div>
  )
}

MessageBlock.propTypes = {}

export default MessageBlock
