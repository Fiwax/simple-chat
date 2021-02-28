import express from 'express'
import path from 'path'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
 // import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import io from 'socket.io'
import config from './config'
import Html from '../client/html'



const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()
const httpServer = http.createServer(server)

const SocketIO = io(httpServer, {
  path: '/ws'
})

if (config.isSocketsEnabled || true) {
  SocketIO.on('connection', (socket) => {
    connections.push(socket.id)
    console.log('a user connected', socket.id)
    socket.on('disconnect', () => {
      connections = connections.filter((c) => c !== socket.id)
      console.log('a user disconnected', socket.id)
    })
  })
}


const headers = (req, res, next) => {
  res.set('x-skillcrucial-user', '7e6c249a-9f98-4872-a8aa-a158a2515083');
  res.set('Access-Control-Expose-Headers', 'X-SKILLCRUCIAL-USER')
  next()
}

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser(),
  headers
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/sockets', (req, res) => {
  res.json(connections)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

// const app = server.listen(port)

// if (config.isSocketsEnabled) {
//   const echo = sockjs.createServer()
//   echo.on('connection', (conn) => {
//     connections.push(conn)
//     conn.on('data', async () => { })

//     conn.on('close', () => {
//       connections = connections.filter((c) => c.readyState !== 3)
//     })
//   })
//   echo.installHandlers(app, { prefix: '/ws' })
// }
console.log(`Serving at http://localhost:${port}`)

httpServer.listen(port)