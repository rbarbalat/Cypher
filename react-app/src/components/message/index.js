import React from 'react'
import './message.css';
import { FaChevronRight } from 'react-icons/fa';
import { format, addHours, addMinutes, startOfDay } from 'date-fns';

function Message({data, setThread}) {
    console.log(data, 'This is probably a message object');
    const convertTime = () => {
        const [hours, minutes] = data.time.split(':')
        const dayStart = startOfDay(new Date(data.date))
        const addedHours = addHours(new Date(dayStart), hours)
        const addedMinutes = addMinutes(new Date(addedHours), minutes)
        return format(new Date(addedMinutes), 'p')
    }

    convertTime()

    return (
        <div className='message--wrapper'>
            <div className='message--sender_image'></div>
            <div className='message--details_wrapper'>
                <div className='message--name_time'>
                    <p className='message--sender_name'>{data.sender}</p>
                    <span className='message--time'>{convertTime()}</span>
                </div>
                <p className='message--message'>{data.message}</p>
                {
                data.replies ?
                <div onClick={() => setThread({state: true})} className='message--replies'>
                        <div className='message--replies--flex'>
                            {data.replies.slice(0,2).map(replier => (
                                <div className='message--replier--image'></div>
                            ))}
                            <span className='message--replies--count'>{data.replies.length} replies</span>
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
