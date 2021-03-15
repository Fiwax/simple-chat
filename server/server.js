import express from 'express'
import path from 'path'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import io from 'socket.io'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import config from './config'
import User from './model/User.model'
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

mongooseService.connect()

let connections = []

// let channelList = []

let channelList = [
  {
    general: {
      name: 'general',
      description: 'Chat about general topics',
      listOfUsers: [],
      listOfMessages: []
    }
  }
]

const port = process.env.PORT || 8090
const server = express()
const httpServer = http.createServer(server)

const headers = (req, res, next) => {
  res.set('x-skillcrucial-user', '7e6c249a-9f98-4872-a8aa-a158a2515083')
  res.set('Access-Control-Expose-Headers', 'X-SKILLCRUCIAL-USER')
  next()
}

const middleware = [
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser(),
  headers
]

passport.use('jwt', passportJWT.jwt)

middleware.forEach((it) => server.use(it))

server.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    user.password = undefined
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.post('/api/v1/auth', async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findAndValidateUser(req.body)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    user.password = undefined // delete doesnot work
    console.log(user.password)
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
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

if (config.isSocketsEnabled) {
  const SocketIO = io(httpServer, {
    path: '/ws'
  })

  SocketIO.on('connection', (socket) => {
    connections.push(socket)
    console.log('a user connected', socket.id)

    connections.forEach((soc) => {
      soc.emit('Get-Chat-Data', channelList)
    })

    socket.on('Add-Channel', (channel) => {
      // channelList = [...channel]
      channelList = channel
      SocketIO.emit('Get-Channels', channelList)
    })

    socket.on('Send-Message', (listMsg) => {
    // channelList = [...listMsg]
       channelList = listMsg
      SocketIO.emit('Get-Messages', channelList)
    })

    socket.on('disconnect', () => {
      connections = connections.filter((c) => c !== socket.id)
      console.log('a user disconnected', socket.id)
    })
  })
}

httpServer.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`)
})