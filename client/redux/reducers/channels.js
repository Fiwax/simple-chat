import { SOCKETIO } from '../index'

const ADD_NEW_CHANNEL = 'ADD_NEW_CHANNEL'
const GET_CHANNELS = 'GET_CHANNELS'
const GET_MESSAGES = 'GET_MESSAGES'
const GET_DESCRIPTION = 'GET_DESCRIPTION'
const GET_CHANNEL_NAME = 'GET_CHANNEL_NAME'
const UPDATE_ACTIVE_CHANNEL = 'UPDATE_ACTIVE_CHANNEL'
const SEND_MESSAGE = 'SEND_MESSAGE'
const GET_CHAT_DATA = 'GET_CHAT'

const InitialState = {
  listOfChannels: [
    {
      general: {
        name: 'general',
        description: 'Chat about general topics',
        listOfUsers: [],
        listOfMessages: []
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
    case GET_CHANNELS: {
      return { ...state, listOfChannels: action.getChannels }
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
    case GET_MESSAGES: {
      return { ...state, listOfChannels: action.getMessage }
    }
    case GET_CHAT_DATA: {
      return { ...state, listOfChannels: action.data }
    }
    default:
      return state
  }
}

export function getChannels() {
  return (dispatch) => {
    SOCKETIO.on('Get-Channels', (data) => {
      dispatch({ type: GET_CHANNELS, getChannels: data })
    })
  }
}

export function getMessages() {
  return (dispatch) => {
    SOCKETIO.on('Get-Messages', (data) => {
      dispatch({ type: GET_MESSAGES, getMessage: data })
    })
  }
}

export function addChannel() {
  return (dispatch, getState) => {
    const store = getState()
    const { listOfChannels, descriptionOfChannel, nameOfChannel } = store.channels

    const newDescription = descriptionOfChannel !== '' ? descriptionOfChannel : 'Description'

    const newChannel = [
      ...listOfChannels,
      {
        [nameOfChannel]: {
          name: nameOfChannel,
          description: newDescription,
          listOfIdsOfUsers: [],
          listOfMessages: []
        }
      }
    ]

    SOCKETIO.emit('Add-Channel', newChannel)
    dispatch({ type: GET_CHANNELS, getChannels: newChannel })
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
    const newListOfMessages = [...foundChannel[activeChannel].listOfMessages, message]
    const updateListOfMessages = listOfChannels.map((obj) =>
      obj[activeChannel]?.name === activeChannel
        ? { [activeChannel]: { ...obj[activeChannel], listOfMessages: newListOfMessages } }
        : obj
    )
    SOCKETIO.emit('Send-Message', updateListOfMessages)

    dispatch({ type: SEND_MESSAGE, listOfMessages: updateListOfMessages })
  }
}

export function getChat() {
  return (dispatch) => {
    SOCKETIO.on('Get-Chat-Data', (channelList) => {
      dispatch({ type: GET_CHAT_DATA, data: channelList })
    })
  }
}
