import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateActiveChannel,
  removeChannel,
  updateAddChannelToggle,
  checkUserInChannel
} from '../../redux/reducers/channels'

const ChannelList = () => {
  const dispatch = useDispatch()

  const addChannelToggle = useSelector((s) => s.channels.addChannelToggle)
  const { listOfChannels, activeChannel } = useSelector((s) => s.channels)
  const role = useSelector((s) => s.auth.user?.role || [])
  const isAdmin = role.includes('admin')

  useEffect(() => {
    dispatch(checkUserInChannel())
  }, [activeChannel])

  return (
    <div>
      <div className="flex justify-between px-4 font-bold text-gray-300 ">
        Channels
        {isAdmin && (
          <button
            type="button"
            className="rounded-full mr-0.5 focus:outline-none"
            onClick={() => dispatch(updateAddChannelToggle(!addChannelToggle))}
          >
            <svg
              className="w-4 h-4 opacity-50 fill-current transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
            </svg>
          </button>
        )}
      </div>

      <div className="mb-2 py-1 px-3.5 text-white w-full ">
        {listOfChannels.map((channel) => {
          return (
            <div key={channel._id} className="flex justify-between">
              <button
                type="button"
                className={`flex flex-col  font-semibold  rounded mt-1 duration-500 flex-grow w-full px-1 h-7 ${
                  channel.name === activeChannel
                    ? 'bg-gray-600'
                    : 'bg-transparent hover:bg-gray-700'
                }`}
                onClick={() => dispatch(updateActiveChannel(channel.name))}
              >
                # {channel.name}
              </button>
              {isAdmin && (
                <button
                  type="button"
                  className="items-center rounded-full p-1 ml-1.5 hover:bg-gray-500 duration-700"
                  onClick={() => dispatch(removeChannel(channel._id))}
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

ChannelList.propTypes = {}

export default ChannelList
