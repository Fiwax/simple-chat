import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Head from './head'
import { setNickname } from '../redux/reducers/messages'

const Dummy = () => {
  const { nickname } = useSelector((s) => s.messages)
  const dispatch = useDispatch()
  return (
    <div className="bg-gray-700">
      <Head title="Hello" />
      <Sign />
      <div className="flex items-center justify-center h-screen ">
        <div className="bg-purple-800  text-white font-bold rounded-lg border shadow-lg p-10">
          <div className="flex flex-col items-center">
            <input
              className="text-black rounded h-8 p-1 "
              placeholder="enter nickname"
              value={nickname}
              onChange={(e) => dispatch(setNickname(e.target.value))}
            />
            <Link to="/home">Go to Chat</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const Sign = () => {
  return (
    <div className="flex justify-end ">
      <div className="bg-green-900 hover:bg-green-400 rounded shadow-lg">
        <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
