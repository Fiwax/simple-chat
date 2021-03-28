import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'
import { socket } from '../redux/index'

import SideBar from './sideBar'
import Header from './home/header'
import InputMessage from './home/inputMessage'
import MessageBlock from './home/messageBlock'
import Head from './head'
import NoMessage from './home/noMessage'

import { getMessages, getChannels, removeChannel } from '../redux/reducers/channels'

const Home = () => {
  const { listOfChannels, activeChannel } = useSelector((s) => s.channels)
  const userId = useSelector((s) => s.auth.user._id)
  const foundChannel = listOfChannels.find((obj) => obj.name === activeChannel)
  const { listOfMessages } = foundChannel
  const cookies = new Cookies()

  const dispatch = useDispatch()

  useEffect(() => {
    socket.open()
    socket.emit('login', userId)
  }, [])

  useEffect(() => {
    dispatch(removeChannel())
    dispatch(getMessages())
    dispatch(getChannels())
  }, [dispatch])

  useEffect(() => {
    socket.on('logout-process', (userId_logout) => {
      if (userId === userId_logout) {
        cookies.remove('token', { path: '/' })
        window.location.reload()
      }
    })
  }, [socket.on])

  return (
    <div>
      <Head />
      <div className="w-full bg-white">
        <div className="flex">
          {/* <!-- Sidebar / channel list --> */}
          <SideBar />

          {/* <!-- Chat content --> */}
          <div className="flex flex-col w-full h-screen">
            {/* <!-- Top bar --> */}
            <Header />

            {/* <!-- Chat messages --> */}
            <div className="flex-1 px-6 py-4 overflow-y-auto">
              {/* <!-- A message --> */}

              {listOfMessages.length === 0 ? (
                <NoMessage />
              ) : (
                listOfMessages.map((message) => {
                  return (
                    <div key={message.Id}>
                      <MessageBlock message={message} />
                    </div>
                  )
                })
              )}
            </div>

            {/* Input */}

            <InputMessage />
          </div>
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
