import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import channels from './channels'
import messages from './messages'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    channels,
    messages,
  })

export default createRootReducer
