import React from 'react'

const DirectMessages = () => {
  return (
    <div>
      <div className="px-4 mb-3 font-bold text-gray-300">Direct Messages</div>

      <div className="flex items-center px-4 mb-3">
        <span className="block w-2 h-2 mr-2 bg-green-500 rounded-full" />
        <span className="text-white">
          Olivia Dunham <i className="text-sm text-gray-300">(me)</i>
        </span>
      </div>

      <div className="flex items-center px-4 mb-3">
        <span className="block w-2 h-2 mr-2 bg-green-500 rounded-full" />
        <span className="text-white">Adam Bishop </span>
      </div>

      <div className="flex items-center px-4 mb-2">
        <span className="block w-2 h-2 mr-2 border rounded-full" />
        <span className="text-white">killgt</span>
      </div>
    </div>
  )
}

DirectMessages.propTypes = {}

export default DirectMessages
