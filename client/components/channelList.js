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
      <div className="px-4 mb-2 font-bold flex justify-between">
        Channels
        <button
          type="button"
          className="border rounded-full hover:bg-white  focus:outline-none text-2xl transition duration-500 easy-in-out transform hover:-translate-y-1 hover:scale-100"
          onClick={() => setActive(!active)}
        >
          +
        </button>
        {active && <AddChannel active={active} setActive={setActive} />}
      </div>

      <div className="mb-6 py-1 px-4 text-white">
        {listOfChannels.map((channels, index) => {
          const keys = [].concat(...Object.keys(channels))
          const keyStr = keys.join('')
          return (
            <button
              type="button"
              className={`flex flex-col font-semibold rounded mt-1 flex-grow w-full h-7 ${
                keyStr === activeChannel ? 'bg-purple-600' : 'bg-transparent'
              }`}
              onClick={() => dispatch(updateActiveChannel(keys))}
              key={`${keys}${index}`}
            >
              # {keys}
            </button>
          )
        })}
      </div>
    </div>
  )
}

ChannelList.propTypes = {}

export default ChannelList
