import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import SockJS from 'sockjs-client'
import { io } from 'socket.io-client'

import rootReducer from './reducers'
import createHistory from './history'
// import socketActions from './sockets'

export const history = createHistory()

//  const isBrowser = typeof window !== 'undefined'

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const composedEnhancers = composeFunc(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer(history), initialState, composedEnhancers)
// eslint-disable-next-line
export const socket = io(`${window.location.origin}`, {
  path: '/ws',
  autoConnect: false,
})

// let socket
// if (typeof ENABLE_SOCKETS !== 'undefined' && ENABLE_SOCKETS) {
//   const initSocket = () => {
//     socket = io(
//       io( `${window.location.origin}`, {
//         path: '/ws'
//       })
//     )
//   }
//   console.log('enable', ENABLE_SOCKETS)
//   initSocket()
// }

// export function getSocket() {
//   return socket
// }



// let socket

// if (typeof ENABLE_SOCKETS !== 'undefined' && ENABLE_SOCKETS) {
//   const initSocket = () => {
//     socket = new SockJS(`${isBrowser ? window.location.origin : 'http://localhost'}/ws`)

//     socket.onopen = () => {
//       store.dispatch(socketActions.connected)
//     }

//     socket.onmessage = (message) => {
//       // eslint-disable-next-line no-console
//       console.log(message)

//       // socket.close();
//     }

//     socket.onclose = () => {
//       store.dispatch(socketActions.disconnected)
//       setTimeout(() => {
//         initSocket()
//       }, 2000)
//     }
//   }

//   initSocket()
// }
// export function getSocket() {
//   return socket
// }
export default store
