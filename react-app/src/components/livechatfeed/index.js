import React, { useState, forwardRef } from 'react'
import Message from '../message'
import TimeStamp from '../message/timestamp'
import { format, isSameDay } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import './livechatfeed.css'
import { FaArrowDown } from 'react-icons/fa';
import { thunkGetUserThread } from '../../store/thread';


const LiveChatFeed = forwardRef( function LiveChatFeed(props, ref) {
  const {messages, channel, socket, setIsVisible} = props
    const [ loading, setLoading ] = useState(true)
    const owner = channel.users.find(user => user.status === 'owner')
    // const start = new Date(messages[0].created_at);
    // const end = new Date(messages[messages.length - 1].created_at)
    // const dates = [];
    let start;
    start = messages.length !== 0 ? new Date(messages[0].created_at) : new Date();
    let end;
    end =
      messages.length !== 0
        ? new Date(messages[messages.length - 1].created_at)
        : new Date();
    const dates = [];
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const recipientId = pathname.split('/')[4]
    // const partner = useSelector(state => state.messages.partners[recipientId].partner)
    // for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    //     dates.push(format(date, 'P'))
    // }

    const areMessagesPresent = (messages, specificDate) => {
        return messages.some(message => {
        return isSameDay(new Date(message.created_at), new Date(specificDate))
        })
    }

    const handleBottomScroll = () => {
      ref.current.scroll({
      top: ref.current.scrollHeight,
      behavior: 'smooth'
    })}

    const handleUserThread = (id) => {
      dispatch(thunkGetUserThread(id))
    }

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      dates.push(format(date, "P"));
    }
    return (
        <section ref={ref} id='message_feed--wrapper'>
        <div className='message_feed--introduction'>
            <div className='message_feed--introduction--recipient'>
                <div className='message_feed--introduction--image'></div>
                <div className='message_feed--introduction--information'>
                    <p className='message_feed--user'>{channel.name}</p>
                </div>
            </div>
            <p className='message_feed--introduction--greeting' ><span onClick={() => handleUserThread(channel.users[0].id)} className='formal basic--link'>{owner.username}</span> created this {channel.private ? 'private' : 'public'} channel. This is the very beginning of the <span onClick={() => setIsVisible(true)} className='basic--link'>{channel.name}</span> channel.</p>
            <button className="view--bottom" onClick={handleBottomScroll}>
              <span>Most Recent</span>
              <FaArrowDown/>
            </button>
        </div>
        {
          dates.map(date => {
            return (
              <>
              {
                areMessagesPresent(messages, date) ?
                <TimeStamp label={date}>
                  {
                    messages.filter(message => isSameDay(new Date(message.created_at), new Date(date))).map(message => {
                      return (
                        <Message type='channel' message={message} isLiveChat={true} channelId={channel.id} socket={socket}/>
                      )
                    })
                  }
                </TimeStamp>:
                null
              }
              </>
            )
          })
        }
    </section>
    )
})

export default LiveChatFeed
