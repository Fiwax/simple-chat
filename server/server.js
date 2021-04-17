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
import socket from 'socket.io'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import auth from './middleware/auth'
import config from './config'
import User from './model/User.model'
import Message from './model/Message.model'
import Channel from './model/Channel.model'
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

server.get('/api/v1/user-info', auth([]), async (req, res) => {
  res.json({ status: 'success' })
})

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
  try {
    const user = await User.findAndValidateUser(req.body)

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

server.post('/api/v1/registration', (req, res) => {
  console.log(req.body)
  try {
    const newUser = new User(req.body)
    newUser.save()
    res.json({ status: 'ok' })
  } catch (err) {
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

let userList

const getUsers = async () => {
  userList = await User.find({}, 'full_name role').exec()
}

getUsers()

let onlineUsers = []

if (config.isSocketsEnabled) {
  const io = socket(httpServer, {
    path: '/ws'
  })

  io.on('connection', async (socket) => {
    connections.push(socket)
    console.log(`a user connected, ${socket.id}`)

    connections.forEach(async (soc) => {
      const channels = await Channel.find({})
      soc.emit('Get-Chat-Data', channels)
      soc.emit('Get-Online-Users-Ids', onlineUsers)
    })

    socket.on('login', (userId) => {
      const isUserIdInArr = onlineUsers.map((item) => item.id).includes(userId)

      if (!!userId && !isUserIdInArr) {
        onlineUsers = [...new Set([...onlineUsers, { id: userId, socket: socket.id }])]
        io.emit('Get-Online-Users-Ids', onlineUsers)
      }
    })

    socket.on('logout', (userId_logout) => {
      onlineUsers = onlineUsers.filter((user) => user.id !== userId_logout)
      io.emit('Get-Online-Users-Ids', onlineUsers)
      io.emit('logout-process', userId_logout)
    })

    socket.on('Add-Channel', async (channelObj) => {
      const newChannel = new Channel(channelObj)
      newChannel.save()
      const newChannelList = await Channel.find({})
      io.emit('Get-Channels', newChannelList)
    })

    socket.on('Remove-Channel', async (channelId) => {
      await Channel.deleteOne({ _id: channelId })
      const updatedChannelList = await Channel.find({})
      io.emit('Get-Updated-Channels', updatedChannelList)
    })

    socket.on('Send-Message', async ({ newListOfMessages, _id, message }) => {
      const newMessage = new Message(message)
      newMessage.save()
      await Channel.updateOne({ _id }, { $set: { listOfMessages: newListOfMessages } })
      const newChannelList = await Channel.find({})
      io.emit('Get-Messages', newChannelList)
    })

    socket.on('Update-UserList', async ({ newUserList, activeChannel }) => {
      await Channel.updateOne({ name: activeChannel }, { $set: { listOfUsers: newUserList} })
      const newUpdatedlist = await Channel.find({})
      io.emit('New-Updated-UserList', newUpdatedlist)
      console.log(newUserList, activeChannel, newUpdatedlist)
      console.log('activeChanne', activeChannel)
    })

    io.emit('Send-Users', userList)

    socket.on('disconnect', () => {
      connections = connections.filter((c) => c.id !== socket.id)
      console.log('a user disconnected', socket.id)
    })
  })
}

httpServer.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`)
})
