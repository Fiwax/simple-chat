import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateActiveChannel } from '../redux/reducers/channels'
import AddChannel from './addChannel'

const ChannelList = () => {
  const { listOfChannels, activeChannel } = useSelector((s) => s.channels)
  const dispatch = useDispatch()

  const [active, setActive] = useState(false)

  return (
    <div>
      <div className="px-4 text-gray-300 font-bold flex justify-between">
        Channels
        <button
          type="button"
          className="rounded-full hover:bg-white  focus:outline-none text-2xl transition duration-500 easy-in-out transform hover:-translate-y-1 hover:scale-100"
          onClick={() => setActive(!active)}
        >
          +
        </button>
        {active && <AddChannel active={active} setActive={setActive} />}
      </div>

      <div className="mb-2 py-1 px-3.5 text-white w-full ">
        {listOfChannels.map((channels, index) => {
          const key = [].concat(...Object.keys(channels))
          const keyStr = key.join('')
          return (
            <div key={`${key}${index}`} className="flex justify-between">
              <button
                type="button"
                className={`flex flex-col  font-semibold rounded mt-1 flex-grow w-full px-1 h-7 ${
                  keyStr === activeChannel ? 'bg-purple-600' : 'bg-transparent'
                }`}
                onClick={() => dispatch(updateActiveChannel(key))}
              >
                # {key}
              </button>
              {/* <span className="flex bg-red-900 items-center rounded-full w-auto p-1  ml-1 hover:bg-purple-500">
                X
              </span> */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

ChannelList.propTypes = {}

export default ChannelList
