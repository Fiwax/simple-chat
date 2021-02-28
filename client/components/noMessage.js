import React from 'react'

const NoMessage = () => {
  return (
    <div className="container flex justify-center items-center min-h-full ">
      <div className="box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          height="250px"
          width="250px"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <div className="font-black text-gray-700 pl-16">No chat messages</div>
        <div className="text-gray-500">Start convencing to your messages here</div>
      </div>
    </div>
  )
}

NoMessage.propTypes = {}

export default NoMessage
