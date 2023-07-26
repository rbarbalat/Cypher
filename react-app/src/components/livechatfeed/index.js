import React, { useState, forwardRef, useEffect, useMemo } from 'react'
import Message from '../message'
import TimeStamp from '../message/timestamp'
import { format, isSameDay, parseISO } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import './livechatfeed.css'
import { FaArrowDown, FaHashtag, FaLock } from 'react-icons/fa';
import { thunkGetUserThread } from '../../store/thread';


const LiveChatFeed = forwardRef( function LiveChatFeed(props, ref) {
  const {messages, channel, socket, setIsVisible} = props
    const owner = channel.users.find(user => user.status === 'owner')

    const [dates, setDates] = useState([]);

    const dispatch = useDispatch()
    // const memoMessages = useMemo(() => messages, [messages]);

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

    // console.log("messages in livechatfeed");
    // console.log(messages);
    // console.log("type of created at")
    // console.log(typeof messages[0].created_at)

    // console.log("dates array outside of useEffect");
    // console.log(dates);

    useEffect(() => {
      const newDates = []
      messages.forEach(ele => {
        if(!newDates.includes(format(new Date(ele.created_at), "P")))
        {
            newDates.push(format(new Date(ele.created_at), "P"));
        }
      })
      setDates(newDates);
      // console.log("new dates in useEffect");
      // console.log(newDates);
    }, [messages.length])


    useEffect(() => {
      if (ref.current) {
        ref.current.scroll({
          top: ref.current.scrollHeight,
          behavior: "smooth",
        })
      }
    }, [])

    console.log("dates before return block");
    console.log(dates);
    return (
        <section ref={ref} id='message_feed--wrapper'>
        <div className='message_feed--introduction'>
            <div className='message_feed--introduction--recipient'>
                <div className='message_feed--channel_introduction--information'>
                    {channel?.private ? <FaLock className='message_feed--channel_icon'/> : <FaHashtag className='message_feed--channel_icon' />}
                    <p className='message_feed--channel_name'>{channel?.name}</p>
                </div>
            </div>
            <p className='message_feed--introduction--greeting' ><span onClick={() => handleUserThread(owner?.id)} className='formal basic--link'>{owner?.username}</span> created this {channel?.private ? 'private' : 'public'} channel. This is the very beginning of the <span onClick={() => setIsVisible(true)} className='basic--link'>#{channel?.name}</span> channel.</p>
            <button className="view--bottom" onClick={handleBottomScroll}>
              <span>Most Recent</span>
              <FaArrowDown/>
            </button>
        </div>
        {
          dates.sort((a,b) => {
            return new Date(a).getTime() - new Date(b).getTime();
          }).map(date => {
            return (
              <>
              {
                messages.length && areMessagesPresent(messages, date) ?
                <TimeStamp label={date}>
                  {
                    messages.filter(message => isSameDay(new Date(message.created_at), new Date(date)))
                    .map(message => {
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
