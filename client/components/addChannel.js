import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addChannel, getChannelName, getDescription } from '../redux/reducers/channels'

// ({active, setActive})

const AddChannel = (props) => {
  const channelName = useSelector((s) => s.channels.nameOfChannel)
  const description = useSelector((s) => s.channels.descriptionOfChannel)
  const dispatch = useDispatch()

  const Add = () => {
    dispatch(addChannel())
    props.setActive(!props.active)
    dispatch(getChannelName(''))
    dispatch(getDescription(''))
  }

  const Cancel = () => {
    props.setActive(!props.active)
    dispatch(getChannelName(''))
    dispatch(getDescription(''))
  }

  return (
    <div className="modal h-screen w-screen flex justify-center items-center bg-black bg-opacity-75 fixed top-0 left-0 ">
      <div className="modal__content bg-white rounded h-40 w-80 text-black flex flex-col justify-center items-center">
        <span className="text-lg text-gray-400 hover:text-purple-500">Add channel</span>
        <div className="">
          <input
            className="bg-gray-200 rounded border-2 h-7 w-11/12 px-2 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:bg-white"
            placeholder="Name"
            value={channelName}
            onChange={(e) => dispatch(getChannelName(e.target.value))}
          />
        </div>
        <div className="m-2">
          <input
            className="bg-gray-200 h-7 w-11/12 px-2 rounded border-2 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:bg-white"
            placeholder="Description"
            value={description}
            onChange={(e) => dispatch(getDescription(e.target.value))}
          />
        </div>

        {/* Buttons */}

        <div className="text-white text-base">
          <button
            type="button"
            className="border mr-2 bg-gray-700 rounded w-16 hover:bg-gray-600"
            onClick={Cancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="border ml-2 bg-gray-700 rounded w-16 hover:bg-gray-600"
            onClick={Add}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

AddChannel.propTypes = {}

export default AddChannel
