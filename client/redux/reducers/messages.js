import { nanoid } from 'nanoid'

const GET_MESSAGE = 'GET_MESSAGE'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const SET_NICKNAME = 'SET_NICKNAME'

const InitialState = {
  text: '',
  message: {}
}

// {
//             full_name: 'Alex',
//             mesageId: 'jsfjj1232',
//             text: 'Hello World',
//             time: new Date(),
//             meta: {}
//           }

export default (state = InitialState, action) => {
  switch (action.type) {
    case GET_MESSAGE: {
      return { ...state, text: action.text }
    }
    case UPDATE_MESSAGE: {
      return { ...state, message: action.message }
    }
    case SET_NICKNAME: {
      return {...state, nickname: action.nickname}
    }
    default:
      return state
  }
}


export function setNickname(nickname) {
  return { type: SET_NICKNAME, nickname}
}

export function getMessage(text) {
  return { type: GET_MESSAGE, text }
}

export function updateMessage() {
  return (dispatch, getState) => {
    const store = getState()
    const { text, message } = store.messages
    const { activeChannel } = store.channels
    const { full_name } = store.auth.user

    const newMessage = {
      ...message,
      name: full_name,
      Id: nanoid(),
      text,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      currentChannel: activeChannel,
      meta: {}
    }
    dispatch({ type: UPDATE_MESSAGE, message: newMessage })
  }
}
