import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import channels from './channels'
import messages from './messages'
import auth from './auth'
import registration from './registration'
import users from './users'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    channels,
    messages,
    auth,
    users,
    registration
  })

export default createRootReducer
