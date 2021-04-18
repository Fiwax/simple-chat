import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './modal.css'
import {
  addChannel,
  getChannelName,
  getDescription,
  updateActiveChannel,
  updateAddChannelToggle
} from '../../redux/reducers/channels'

const AddChannel = () => {
  const channelName = useSelector((s) => s.channels.nameOfChannel)
  const description = useSelector((s) => s.channels.descriptionOfChannel)
  const addChannelToggle = useSelector((s) => s.channels.addChannelToggle)
  const dispatch = useDispatch()

  const Add = () => {
    if (channelName.length) {
      dispatch(addChannel())
      dispatch(updateActiveChannel(channelName))
      dispatch(updateAddChannelToggle(!addChannelToggle))
      dispatch(getChannelName(''))
      dispatch(getDescription(''))
    }
  }

  const Cancel = () => {
    dispatch(updateAddChannelToggle(!addChannelToggle))
    dispatch(getChannelName(''))
    dispatch(getDescription(''))
  }

  const handleChange = (e) => {
    if (e.target.value.length <= 20) {
      dispatch(getChannelName(e.target.value))
    }
  }

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-90 modal">
      <div
        id="modal-window"
        className="flex flex-col items-center justify-center h-40 text-black bg-white rounded modal__content w-80"
      >
        <span className="text-lg text-gray-400 hover:text-gray-500">Add channel</span>
        <div className="">
          <input
            className="w-11/12 px-2 bg-gray-200 border-2 rounded h-7 focus:ring-2 focus:ring-gray-500 focus:outline-none focus:bg-white"
            placeholder="Name"
            value={channelName}
            onChange={handleChange}
          />
        </div>
        <div className="m-2">
          <input
            className="w-11/12 px-2 bg-gray-200 border-2 rounded h-7 focus:ring-2 focus:ring-gray-500 focus:outline-none focus:bg-white"
            placeholder="Description"
            value={description}
            onChange={(e) => dispatch(getDescription(e.target.value))}
          />
        </div>

        {/* Buttons */}

        <div className="text-base text-white">
          <button
            type="button"
            className="w-16 mr-2 bg-gray-700 border rounded hover:bg-gray-600"
            onClick={Cancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-16 ml-2 bg-gray-700 border rounded hover:bg-gray-600"
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
