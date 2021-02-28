const ADD_NEW_CHANNEL = 'ADD_NEW_CHANNEL'
const GET_DESCRIPTION = 'GET_DESCRIPTION'
const GET_CHANNEL_NAME = 'GET_CHANNEL_NAME'
const UPDATE_ACTIVE_CHANNEL = 'UPDATE_ACTIVE_CHANNEL'
const SEND_MESSAGE = 'SEND_MESSAGE'
const LEAVE_CHANNEL = 'LEAVE_CHANNEL'
const JOIN_CHANNEL = 'JOIN_CHANNEL'

const InitialState = {
  listOfChannels: [
    {
      general: {
        name: 'general',
        description: 'Chat about general topics',
        listOfUsers: [],
        listOfMessages: [
          // {
          //   name: 'Alex',
          //   Id: '"V1StGXR8_Z5jdHi6B-myT"',
          //   message: 'Hello World',
          //   time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          //   meta: {}
          // }
        ]
      }
    }
  ],
  descriptionOfChannel: '',
  nameOfChannel: '',
  activeChannel: 'general'
}

export default (state = InitialState, action) => {
  switch (action.type) {
    case ADD_NEW_CHANNEL: {
      return { ...state, listOfChannels: action.updateChannel }
    }
    case GET_CHANNEL_NAME: {
      return { ...state, nameOfChannel: action.channelName }
    }
    case GET_DESCRIPTION: {
      return { ...state, descriptionOfChannel: action.description }
    }
    case UPDATE_ACTIVE_CHANNEL: {
      return { ...state, activeChannel: action.channel }
    }
    case SEND_MESSAGE: {
      return { ...state, listOfChannels: action.listOfMessages }
    }
    case LEAVE_CHANNEL: {
      return { ...state, listOfChannels: action.listOfUsers }
    }
    case JOIN_CHANNEL: {
      return { ...state, listOfChannels: action.listOfUsers }
    }
    default:
      return state
  }
}

export function addChannel() {
  return (dispatch, getState) => {
    const store = getState()
    const { listOfChannels, descriptionOfChannel, nameOfChannel } = store.channels

    const newChannel = [
      ...listOfChannels,
      {
        [nameOfChannel]: {
          name: nameOfChannel,
          description: descriptionOfChannel,
          listOfIdsOfUsers: [],
          listOfMessages: []
        }
      }
    ]
    dispatch({ type: ADD_NEW_CHANNEL, updateChannel: newChannel })
  }
}

export function getDescription(description) {
  const revisedDescription = description.charAt(0).toUpperCase() + description.slice(1)
  return { type: GET_DESCRIPTION, description: revisedDescription }
}

export function getChannelName(name) {
  return { type: GET_CHANNEL_NAME, channelName: name }
}

export function updateActiveChannel(channel) {
  return { type: UPDATE_ACTIVE_CHANNEL, channel: channel.join('') }
}

export function sendMessage() {
  return (dispatch, getState) => {
    const store = getState()
    const { listOfChannels, activeChannel } = store.channels
    const { message } = store.messages

    const foundChannel = listOfChannels.find((channel) => channel[activeChannel])
    const newListOfMessages = [...foundChannel[activeChannel].listOfMessages, message] // its works
    const updateListOfMessages = listOfChannels.map((obj) =>
      obj[activeChannel]?.name === activeChannel
        ? { [activeChannel]: { ...obj[activeChannel], listOfMessages: newListOfMessages } }
        : obj
    )

    dispatch({ type: SEND_MESSAGE, listOfMessages: updateListOfMessages })
  }
}
