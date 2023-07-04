import React from 'react'
import './message.css';
import { FaChevronRight } from 'react-icons/fa';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { thunkGetUser } from '../../store/thread';

function Message({message}) {
    const dispatch = useDispatch()
    const convertTime = () => {
        const date = new Date(message.created_at)
        return format(new Date(date), 'p')
    }

    const handleLoadUserProfile = (id) => {
        dispatch(thunkGetUser(id))
    }

    return (
        <div className='message--wrapper'>
            <div className='message--sender_image'>
            {message.sender.charAt(0)}
            </div>
            <div className='message--details_wrapper'>
                <div className='message--name_time'>
                    <p className='message--sender_name message_feed--user  link-to-user'  onClick={() => handleLoadUserProfile(message.sender_id)}>{message.sender}</p>
                    <span className='message--time'>{convertTime()}</span>
                </div>
                <p className='message--message'>{message.message}</p>
                {
                message.replies ?
                <div className='message--replies'>
                        <div className='message--replies--flex'>
                            {message.replies.slice(0,2).map(replier => (
                                <div className='message--replier--image'></div>
                            ))}
                            <span className='message--replies--count'>{message.replies.length} replies</span>
                        </div>
                        <FaChevronRight className='message--replies--icon'/>
                </div> :
                null
                }
            </div>
        </div>
    )
}

export default Message
