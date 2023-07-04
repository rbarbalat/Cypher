import React, { forwardRef } from 'react'
import Message from '../message'
import TimeStamp from '../message/timestamp'
import { format, isSameDay } from 'date-fns';
import './directmessagefeed.css';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetUser } from '../../store/thread';
import { useLocation } from 'react-router-dom'
import { FaArrowDown } from 'react-icons/fa';

const DirectMessageFeed = forwardRef((props, ref) => {
  const { messages } = props;
  const dispatch = useDispatch()
  let start;
  start = messages.length !== 0 ? new Date(messages[0].created_at) : new Date()
  let end;
  end = messages.length !== 0 ? new Date(messages[messages.length - 1].created_at) : new Date()
  const dates = [];

  const { pathname } = useLocation()
  const recipientId = pathname.split('/')[4]
  const partner = useSelector(state => state.messages.partners[recipientId].partner)

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(format(date, 'P'))
  }

  const areMessagesPresent = (messages, specificDate) => {
    return messages.some(message => {
      return isSameDay(new Date(message.created_at), new Date(specificDate))
    })
  }

  const handleLoadUserProfile = (id) => {
    dispatch(thunkGetUser(id))
  }

  const goToMostRecent = () => {
    ref.current.scroll({
      top: ref.current.scrollHeight,
      behavior: 'smooth'
  });
  }





  return (
    <section ref={ref} id='message_feed--wrapper'>
        <div className='message_feed--introduction'>
            <div className='message_feed--introduction--recipient'>
                <div className='message_feed--introduction--image'>
                  {partner.charAt(0)}
                </div>
                <div className='message_feed--introduction--information'>
                    <p className='message_feed--user link-to-user'  onClick={() => handleLoadUserProfile(recipientId)}>{partner}</p>
                    <p>Status</p>
                </div>
            </div>
            <p className='message_feed--introduction--greeting' >This conversation is just between <span className='message_feed--user'>@{partner}</span> and you. Check out their profile to learn more about them. <span className='link-to-user' onClick={() => handleLoadUserProfile(recipientId)}>View Profile</span></p>
            <button className='most_recent--button' onClick={() => goToMostRecent()}>
              <span>View Most Recent Message</span>
              <FaArrowDown className='most_recent--icon'/>
            </button>
        </div>
        {
          messages.length > 0 ?
          dates.map(date => {
            return (
              <>
              {
                areMessagesPresent(messages, date) ?
                <TimeStamp label={date}>
                  {
                    messages.filter(message => isSameDay(new Date(message.created_at), new Date(date))).map(message => {
                      return (
                        <Message type='direct' message={message}/>
                      )
                    })
                  }
                </TimeStamp>:
                null
              }
              </>
            )
          }) :
          null
        }
    </section>
  )
})

export default DirectMessageFeed
