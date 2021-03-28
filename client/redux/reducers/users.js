import { socket } from ".."

const GET_USERS = 'GET_USERS'
const GET_ONLINE_USERS = 'GET_ONLINE_USERS'

const initialState = {
  userList: [],
  online: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return { ...state, userList: action.users }
    }
    case GET_ONLINE_USERS: {
      return {...state, online: action.online}
    }
    default:
      return state
  }
}

export function getUserList() {
  return (dispatch) => {
    socket.on('Send-Users', (list) => {
      dispatch({ type: GET_USERS, users:list })
    })
  }
}

export function getOnlineUsers() {
  return (dispatch) => {
    socket.on('Get-Online-Users-Ids', (online) => {
      dispatch({ type: GET_ONLINE_USERS, online })
    })
  }
}