import React, { useState, forwardRef, useEffect } from 'react'
import Message from '../message'
import TimeStamp from '../message/timestamp'
import { format, isSameDay } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import './livechatfeed.css'
import { FaArrowDown, FaHashtag, FaLock } from 'react-icons/fa';
import { thunkGetUserThread } from '../../store/thread';


const LiveChatFeed = forwardRef( function LiveChatFeed(props, ref) {
  const {messages, channel, socket, setIsVisible} = props
    const owner = channel.users.find(user => user.status === 'owner')
    let start;
    start = messages.length !== 0 ? new Date(messages[0].created_at) : new Date();
    let end;
    end =
      messages.length !== 0
        ? new Date(messages[messages.length - 1].created_at)
        : new Date();
    const dates = [];
    const dispatch = useDispatch()

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

    useEffect(() => {
      if (ref.current) {
        ref.current.scroll({
          top: ref.current.scrollHeight,
          behavior: "smooth",
        })
      }
    }, [])

    return (
        <section ref={ref} id='message_feed--wrapper'>
        <div className='message_feed--introduction'>
            <div className='message_feed--introduction--recipient'>
                <div className='message_feed--channel_introduction--information'>
                    {channel.private ? <FaLock className='message_feed--channel_icon'/> : <FaHashtag className='message_feed--channel_icon' />}
                    <p className='message_feed--channel_name'>{channel.name}</p>
                </div>
            </div>
            <p className='message_feed--introduction--greeting' ><span onClick={() => handleUserThread(owner.id)} className='formal basic--link'>{owner.username}</span> created this {channel.private ? 'private' : 'public'} channel. This is the very beginning of the <span onClick={() => setIsVisible(true)} className='basic--link'>#{channel.name}</span> channel.</p>
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
