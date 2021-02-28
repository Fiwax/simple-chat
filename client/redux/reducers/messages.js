import { nanoid } from 'nanoid'

const GET_MESSAGE = 'GET_MESSAGE'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'

const InitialState = {
  text: '',
  messageHistory: [],
  message: {},
  nickname: 'Test-User'
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
    default:
      return state
  }
}

export function getMessage(text) {
  return { type: GET_MESSAGE, text }
}

export function updateMessage() {
  return (dispatch, getState) => {
    const store = getState()
    const { text, nickname, message } = store.messages

    const newMessage = {
      ...message,
      name: nickname,
      Id: nanoid(),
      message: text,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      meta: {}
    }
    console.log('new message', newMessage)
    dispatch({ type: UPDATE_MESSAGE, message: newMessage })
  }
}
