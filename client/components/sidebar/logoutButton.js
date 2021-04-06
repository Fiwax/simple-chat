import React from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { socket } from '../../redux'

const LogoutButton = () => {
  const { _id } = useSelector((s) => s.auth.user)
  const cookie = new Cookies()

  const logOut = () => {
    cookie.remove('token', { path: '/' })
    socket.emit('logout', _id)
    window.location.reload()
  }

  return (
    <div>
      <button
        type="button"
        onClick={logOut}
        className="block px-10 py-3 mx-auto text-xs text-white uppercase bg-indigo-800 rounded shadow hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
      >
        Log out
      </button>
    </div>
  )
}

export default LogoutButton
