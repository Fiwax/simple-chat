import React from 'react'
// import { useSelector } from 'react-redux'

const UserList = () => {
  // const listOfUsers = useSelector((s) => s.users)
  return (
    <div>
      <div className="px-4 mb-3 text-gray-300 font-bold">Users </div>
      <div className="flex items-center mb-3 px-4">
        <span className="border rounded-full block w-2 h-2 mr-2" />
        <span className="text-white">Adam Bishop</span>
        {/* {listOfUsers.map((user) => {
          return (
            <div key='user'>
              <span className="text-white">{user}</span>
            </div>
          )
        })} */}
      </div>
    </div>
  )
}

UserList.propTypes = {}

export default UserList
