import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import SideBar from './sideBar'
import Header from './header'
import InputMessage from './inputMessage'
import MessageBlock from './messageBlock'
import Head from './head'
import NoMessage from './noMessage'

import { getMessages, getChannels, getChat } from '../redux/reducers/channels'

const Home = () => {
  const { listOfChannels, activeChannel } = useSelector((s) => s.channels)
  const foundChannel = listOfChannels.find((obj) => obj[activeChannel])
  const { listOfMessages } = foundChannel[activeChannel]

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChannels())
    dispatch(getMessages())
    dispatch(getChat())
  }, [dispatch])

  return (
    <div>
      <Head />
      <div className="w-full bg-white">
        <div className="flex">
          {/* <!-- Sidebar / channel list --> */}
          <SideBar />

          {/* <!-- Chat content --> */}
          <div className="w-full h-screen flex flex-col">
            {/* <!-- Top bar --> */}
            <Header />

            {/* <!-- Chat messages --> */}
            <div className="px-6 py-4 flex-1 overflow-y-auto">
              
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
