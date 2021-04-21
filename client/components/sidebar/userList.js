import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserList, getOnlineUsers } from '../../redux/reducers/users'

const UserList = () => {
  const listOfUsers = useSelector((s) => s.users.userList)
  const onlineSocket = useSelector((s) => s.users.online)
  const onlineUsersId = onlineSocket.map((item) => item.id)
  const onlineUsers = listOfUsers.filter((user) => onlineUsersId.indexOf(user._id) !== -1)
  const offlineUsers = listOfUsers.filter((user) => onlineUsersId.indexOf(user._id) === -1)

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getUserList())
    }, [dispatch])

    useEffect(() => {
      dispatch(getOnlineUsers())
    }, [dispatch])

  return (
    <div>
      <div className="px-4 mb-3 font-bold text-gray-300">Users </div>
      <div className="items-center block px-4 mb-3 ">
        {onlineUsers.map((userlistObj) => {
          return (
            <div key={userlistObj._id} className="flex items-center mb-3">
              <span className="inline-block w-2 h-2 mr-2 bg-green-400 rounded-full" />
              <span className="text-white">{userlistObj.full_name}</span>
            </div>
          )
        })}
        {offlineUsers.map((userlistObj) => {
          return (
            <div key={userlistObj._id} className="flex items-center mb-3">
              <span className="inline-block w-2 h-2 mr-2 border rounded-full" />
              <span className="text-gray-400 ">{userlistObj.full_name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

UserList.propTypes = {}

export default UserList
