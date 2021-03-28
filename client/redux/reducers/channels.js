import { socket } from '../index'

const ADD_NEW_CHANNEL = 'ADD_NEW_CHANNEL'
const REMOVE_CHANNEL = 'REMOVE_CHANNEL'
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
      name: 'general',
      description: 'Chat about general topics',
      listOfUsers: [],
      listOfMessages: []
    }
  ],
  descriptionOfChannel: '',
  nameOfChannel: '',
  activeChannel: 'general',
  channelObj: {}
}

export default (state = InitialState, action) => {
  switch (action.type) {
    case ADD_NEW_CHANNEL: {
      return { ...state, listOfChannels: action.updateChannel }
    }
    case REMOVE_CHANNEL: {
      return { ...state, listOfChannels: action.updatedChannelList, activeChannel: action.activeChannel }
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
      return { ...state, activeChannel: action.channelName }
    }
    case SEND_MESSAGE: {
      return { ...state, listOfChannels: action.listOfMessages }
    }
    case GET_MESSAGES: {
      return { ...state, listOfChannels: action.getMessage }
    }
    case GET_CHAT_DATA: {
      return { ...state, listOfChannels: action.data, activeChannel: action.activeChannel }
    }
    default:
      return state
  }
}

// export function getChannels() {
//   return (dispatch) => {
//     socket.on('Get-Channels', (data) => {
//       // data.map(channel => channel.name) inside it const item = items[Math.floor(Math.random() * items.length)]; or we can select only first channel name and put it into activeChannels
//       // activeChannel: currentChannel
//       dispatch({ type: GET_CHANNELS, getChannels: data })
//     })
//   }
// }

export function getMessages() {
  return (dispatch) => {
    socket.on('Get-Messages', (data) => {
      dispatch({ type: GET_MESSAGES, getMessage: data })
    })
  }
}

export function addChannel() {
  return (dispatch, getState) => {
    const store = getState()
    const { descriptionOfChannel, nameOfChannel, channelObj } = store.channels

    const newDescription = descriptionOfChannel !== '' ? descriptionOfChannel : 'Description'
    // ARRAY
    // const newChannel = [
    //   ...listOfChannels,
    //   {
    //     name: nameOfChannel,
    //     description: newDescription,
    //     listOfIdsOfUsers: [],
    //     listOfMessages: []
    //   }
    // ]

    const newChannel = {
      ...channelObj,
      name: nameOfChannel,
      description: newDescription,
      listOfOfUsers: [],
      listOfMessages: []
    }

    socket.emit('Add-Channel', newChannel)
    socket.on('Get-Channels', (newChannelList) => {
      dispatch({ type: GET_CHANNELS, getChannels: newChannelList })
    })
  }
}

export function removeChannel(channelId) {
  console.log('CHANNEL ID I HOPE IT WORKS', channelId)
  return (dispatch, getState) => {
    const store = getState()
    const { activeChannel } = store.channels
    socket.emit('Remove-Channel', channelId)
    socket.on('Get-Updated-Channels', (newChannelList) => {
      const namesOfChannels = newChannelList.map((channel) => channel.name)
      const firstChannelName = newChannelList[0]?.name
      const setActiveChannel = namesOfChannels.includes(activeChannel) ? activeChannel : firstChannelName
      // inside it const item = items[Math.floor(Math.random() * items.length)]
      dispatch({
        type: REMOVE_CHANNEL,
        updatedChannelList: newChannelList,
        activeChannel: setActiveChannel
      })
    })
  }
}

export function getDescription(description) {
  const revisedDescription = description.charAt(0).toUpperCase() + description.slice(1)
  return { type: GET_DESCRIPTION, description: revisedDescription }
}

export function getChannelName(name) {
  return { type: GET_CHANNEL_NAME, channelName: name }
}

export function updateActiveChannel(channelName) {
  return { type: UPDATE_ACTIVE_CHANNEL, channelName }
}

export function sendMessage() {
  return (dispatch, getState) => {
    const store = getState()
    const { listOfChannels, activeChannel } = store.channels
    const { message } = store.messages

    const foundChannel = listOfChannels.find((channel) => channel?.name === activeChannel)
    // probably i should send newListOfMessages to the server and usd a command called Channel.updateOne({ name: activeChannel }, { $set listOfMessage: newListOfMessages})
    // then i will find all channel documents and send it from the server to the client
    const newListOfMessages = [...foundChannel.listOfMessages, message]
    const { _id } = foundChannel
    // const updatedListOfChannels = listOfChannels.map((obj) =>
    //   obj?.name === activeChannel ? { ...obj, listOfMessages: newListOfMessages } : obj
    // )
    socket.emit('Send-Message', { newListOfMessages, _id, message })
    socket.on('Get-Channels', (newChannelList) => {
      dispatch({ type: SEND_MESSAGE, listOfMessages: newChannelList })
    })
  }
}

export function getChannels() {
  return (dispatch) => {
    socket.on('Get-Chat-Data', (newChannelList) => {
      const setActiveChannel =  newChannelList.map((it) => it.name)[0]
      dispatch({ type: GET_CHAT_DATA, data: newChannelList, activeChannel:  setActiveChannel})
    })
  }
}
