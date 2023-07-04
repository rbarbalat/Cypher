import React from 'react'
import { useDispatch } from 'react-redux'
import { thunkGetUser } from '../../store/thread'
import { FaRegClock, FaTimes } from 'react-icons/fa'
import {  useSelector } from 'react-redux'

const DirectMessageDetails = React.forwardRef((props, ref) => {
    const { setIsVisible } = props;
    const dispatch = useDispatch()
    const partner = useSelector(state => state.messages.currentPartner)

    const handleLoadUserProfile = (id) => {
        dispatch(thunkGetUser(id))
        .then(() => setIsVisible(false))
    }
    return (
        <div ref={ref} className='direct_message_details--wrapper'>
            <div onClick={() => setIsVisible(false)}
                className='direct_message_details--close_wrapper'>
                <FaTimes className='direct_message_details--close'/>
            </div>
            <header className='direct_message_details--header'>
                <div className='direct_message_details--intro'>
                    <div className='direct_message_details--image'></div>
                    <div className='direct_message_details--information'>
                        <p className='direct_message_details--title'>{partner.username}</p>
                        <p className='direct_message_details--subtitle'>{partner.email}</p>
                    </div>
                </div>
            </header>
            <div className='direct_message_details--contents'>
                <div className='direct_message_details--container'>
                    <div className='direct_message_details--flex'>
                        <FaRegClock/>
                        <span>Current Time</span>
                    </div>
                    <p onClick={() => handleLoadUserProfile(partner.id)} className='direct_message_details--link'>View Full Profile</p>
                </div>
                <span className='direct_message_details--channel_id'>Channel ID: {`channel Id`}</span>
            </div>
        </div>
    )
})

export default DirectMessageDetails
