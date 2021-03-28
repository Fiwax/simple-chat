import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../../redux/reducers/channels'
import { getMessage, updateMessage } from '../../redux/reducers/messages'

const InputMessage = () => {
  const { activeChannel } = useSelector((s) => s.channels)
  const { text } = useSelector((s) => s.messages)
  const dispatch = useDispatch()
  const MIN_LENGTH_MESSAGE = text.length > 0

  const onClick = () => {
    if (MIN_LENGTH_MESSAGE) {
      dispatch(updateMessage())
      dispatch(sendMessage())
      dispatch(getMessage(''))
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && MIN_LENGTH_MESSAGE) {
      dispatch(updateMessage())
      dispatch(sendMessage())
      dispatch(getMessage(''))
    }
  }

  return (
    <div className="w-full">
      <div className="flex mb-4 ml-2 mr-2 overflow-hidden rounded-lg">
        <button
          type="button"
          className="pb-0.5 text-white px-3 bg-gray-700 hover:bg-gray-600 focus:outline-none"
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
            />
          </svg>
        </button>
        <input
          type="text"
          className="w-full px-4 bg-gray-200 border-2 focus:bg-white focus:outline-none"
          placeholder={`Message to #${activeChannel}`}
          value={text}
          onChange={(e) => dispatch(getMessage(e.target.value))}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  )
}

export default InputMessage
