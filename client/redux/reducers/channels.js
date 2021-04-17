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
const UPDATE_ADDCHANNEL_TOGGLE = 'UPDATE_ADDCHANNEL_TOGGLE'
const UPDATE_USERLIST = 'UPDATE_USERLIST'

const InitialState = {
  listOfChannels: [],
  descriptionOfChannel: '',
  nameOfChannel: '',
  activeChannel: '',
  channelObj: {},
  addChannelToggle: false
}

export default (state = InitialState, action) => {
  switch (action.type) {
    case ADD_NEW_CHANNEL: {
      return { ...state, listOfChannels: action.updateChannel }
    }
    case REMOVE_CHANNEL: {
      return {
        ...state,
        listOfChannels: action.updatedChannelList,
        activeChannel: action.activeChannel
      }
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
    case UPDATE_ADDCHANNEL_TOGGLE: {
      return { ...state, addChannelToggle: action.toggle }
    }
    case UPDATE_USERLIST: {
      return { ...state, listOfChannels: action.newUserList }
    }
    default:
      return state
  }
}

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
  return (dispatch, getState) => {
    const store = getState()
    const { activeChannel } = store.channels
    socket.emit('Remove-Channel', channelId)
    socket.on('Get-Updated-Channels', (newChannelList) => {
      const namesOfChannels = newChannelList.map((channel) => channel.name)
      const firstChannelName = newChannelList[0]?.name
      let setActiveChannel

      if (namesOfChannels.includes(activeChannel)) {
        setActiveChannel = activeChannel
      } else if (!namesOfChannels.length) {
        setActiveChannel = ''
      } else {
        setActiveChannel = firstChannelName
      }
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

    const newListOfMessages = [...foundChannel.listOfMessages, message]
    const { _id } = foundChannel

    socket.emit('Send-Message', { newListOfMessages, _id, message })
    socket.on('Get-Channels', (newChannelList) => {
      dispatch({ type: SEND_MESSAGE, listOfMessages: newChannelList })
    })
  }
}

export function getChannels() {
  return (dispatch) => {
    socket.on('Get-Chat-Data', (newChannelList) => {
      const setActiveChannel = newChannelList.map((it) => it.name)[0]
      dispatch({ type: GET_CHAT_DATA, data: newChannelList, activeChannel: setActiveChannel })
    })
  }
}

export function updateAddChannelToggle(toggle) {
  return { type: UPDATE_ADDCHANNEL_TOGGLE, toggle }
}

export function checkUserInChannel() {
  return (dispatch, getState) => {
    const store = getState()

    const { _id } = store.auth.user
    const { activeChannel, listOfChannels } = store.channels

    const foundChannel = listOfChannels.find((el) => el.name === activeChannel)
    const { listOfUsers } = foundChannel

    if (!listOfUsers.includes(_id) && !!_id) {
      const newUserList = [...listOfUsers, _id]
      console.log('newUs', newUserList, foundChannel)
      socket.emit('Update-UserList', { newUserList, activeChannel })
      socket.on('New-Updated-UserList', (newUpdatedlist) => {
        dispatch({ type: UPDATE_USERLIST, newUserList: newUpdatedlist })
        console.log('llala', newUpdatedlist)
      })
    }
  }
}
