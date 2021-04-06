import { nanoid } from 'nanoid'

const GET_MESSAGE = 'GET_MESSAGE'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'

const InitialState = {
  text: '',
  message: {}
}

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
    const { text, message } = store.messages
    const { activeChannel } = store.channels
    const { full_name, userPic } = store.auth.user

    const newMessage = {
      ...message,
      name: full_name,
      Id: nanoid(),
      text,
      userPic,
      time: +new Date(),
      currentChannel: activeChannel,
      meta: {}
    }

    dispatch({ type: UPDATE_MESSAGE, message: newMessage })
  }
}
