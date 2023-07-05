import React, { useState } from 'react'
import Message from '../message'
import TimeStamp from '../message/timestamp'
import { format, isSameDay } from 'date-fns';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import './livechatfeed.css'


function LiveChatFeed({messages, channelId, socket}) {
    const [ loading, setLoading ] = useState(true)
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
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      dates.push(format(date, "P"));
    }
    return (
        <section id='message_feed--wrapper'>
        <div className='message_feed--introduction'>
            <div className='message_feed--introduction--recipient'>
                <div className='message_feed--introduction--image'></div>
                <div className='message_feed--introduction--information'>
                    <p className='message_feed--user'>{'Channel Name'}</p>
                    <p>{`Channel Owner`} created this {`private or public`} channel on {`formatted created date`}. This is the very beginning of the {`Channel Name`} channel.</p>
                </div>
            </div>
            <p className='message_feed--introduction--greeting' >This conversation is just between <span className='message_feed--user'>partner used to behere</span> and you. Check out their profile to learn more about them. <span>View Profile</span></p>
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
                        <Message type='channel' message={message} isLiveChat={true} channelId={channelId} socket={socket}/>
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
}

export default LiveChatFeed
