import React from 'react'

const DirectMessages = () => {
  return (
    <div>
      <div className="px-4 mb-3 text-gray-300 font-bold">Direct Messages</div>

      <div className="flex items-center mb-3 px-4">
        <span className="bg-green-500 rounded-full block w-2 h-2 mr-2" />
        <span className="text-white">
          Olivia Dunham <i className="text-gray-300 text-sm">(me)</i>
        </span>
      </div>

      <div className="flex items-center mb-3 px-4">
        <span className="bg-green-500 rounded-full block w-2 h-2 mr-2" />
        <span className="text-white">Adam Bishop </span>
      </div>

      <div className="flex items-center px-4 mb-2">
        <span className="border rounded-full block w-2 h-2 mr-2" />
        <span className="text-white">killgt</span>
      </div>
    </div>
  )
}

DirectMessages.propTypes = {}

export default DirectMessages
