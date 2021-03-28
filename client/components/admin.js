import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from './adminPage/adminSidebar'
import Head from './head'
import { getUserList, getOnlineUsers } from '../redux/reducers/users'
import { socket } from '../redux'

const Admin = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserList())
    dispatch(getOnlineUsers())
  }, [])

  const listOfUsers = useSelector((s) => s.users.userList)
  const listOfUsersNoAdmin = listOfUsers.filter((user) => !user.role.includes('admin'))
  const onlineSocket_UserId = useSelector((s) => s.users.online)
  const onlineUsersId = onlineSocket_UserId.map((item) => item.id)
  const onlineUsers = listOfUsersNoAdmin.filter((user) => onlineUsersId.indexOf(user._id) !== -1)

  return (
    <div>
      <Head title="Admin Page" />

      <div className="flex w-full">
        <AdminSidebar />

        <span className="flex flex-col w-full h-screen pt-32 text-white bg-gray-700">
          <span className="flex justify-center mb-10 font-bold tracking-wider text-gray-300 uppercase">
            {onlineUsers.length !== 0 ? <span>Online users</span> : <span>No users online</span>}
          </span>
          {onlineUsers.map((user) => {
            return (
              <div key={user._id}>
                {' '}
                {/* className="flex mb-3" */}
                <div className="flex justify-between px-20 pb-2">
                  <div className="flex">
                    <span className="w-2 h-2 mr-2 mt-2.5 bg-green-400 rounded-full" />
                    <span className="text-white">{user.full_name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => socket.emit('logout', user._id)}
                    className="px-3 py-1 font-semibold text-white duration-500 bg-red-900 rounded-full hover:bg-red-600"
                  >
                    logout
                  </button>
                </div>
              </div>
            )
          })}
        </span>
      </div>
    </div>
  )
}

Admin.propTypes = {}

export default Admin
