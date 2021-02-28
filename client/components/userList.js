import React from 'react'
// import { useSelector } from 'react-redux'

const UserList = () => {
 // const { activeChannel } = useSelector((s) => s.channels)
  return (
    <div>
      <div className="px-4 mb-3 font-bold">Users in </div>

      <div className="flex items-center mb-3 px-4">
        <span className="border rounded-full block w-2 h-2 mr-2" />
        <span className="text-white">Adam Bishop</span>
      </div>
    </div>
  )
}

UserList.propTypes = {}

export default UserList
