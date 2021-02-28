import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../redux/reducers/channels'
import { getMessage, updateMessage } from '../redux/reducers/messages'

const InputMessage = () => {
  const { activeChannel } = useSelector((s) => s.channels)
  const { text } = useSelector((s) => s.messages)
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(updateMessage())
    dispatch(sendMessage())
    dispatch(getMessage(''))
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(updateMessage())
      dispatch(sendMessage())
      dispatch(getMessage(''))
    }
  }

  return (
    <div className="bg-white rounded-t-lg border-2 ">
      <div className="flex m-6 rounded-lg mb-4 overflow-hidden">
        <button
          type="button"
          className="text-3xl text-white px-3 bg-purple-600 hover:bg-purple-400 pb-1"
          onClick={onClick}
        >
          +
        </button>
        <input
          type="text"
          className="w-full px-4 border-2 bg-gray-200 focus:bg-white"
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
