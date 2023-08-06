import React from 'react'
import { FaRegClock, FaTimes } from 'react-icons/fa'
import {  useDispatch, useSelector } from 'react-redux'
import { thunkGetUserThread } from '../../store/thread'

const DirectMessageDetails = React.forwardRef((props, ref) => {
    const { setIsVisible } = props;
    const partner = useSelector(state => state.messages.currentPartner)
    const dispatch = useDispatch();

    const handleUserThread = () => {
        dispatch(thunkGetUserThread(partner.id))
        setIsVisible(false)
    }

    return (
        <div ref={ref} className='direct_message_details--wrapper'>
            <div onClick={() => setIsVisible(false)}
                className='direct_message_details--close_wrapper'>
                <FaTimes className='direct_message_details--close'/>
            </div>
            <header className='direct_message_details--header'>
                <div className='direct_message_details--intro'>
                    <div className='direct_message_details--image' style={{backgroundImage: `url(${partner.image})`}}>
                        {partner.image ? null : <span>{partner?.username.charAt(0)}</span>}
                    </div>
                    <div className='direct_message_details--information'>
                        <p className='direct_message_details--title'>{partner?.username}</p>
                        <p className='direct_message_details--subtitle'>{partner?.email}</p>
                    </div>
                </div>
            </header>
            <div className='direct_message_details--contents'>
                <div className='direct_message_details--container'>
                    <p onClick={handleUserThread} className='direct_message_details--link'>View Full Profile</p>
                </div>
            </div>
        </div>
    )
})

export default DirectMessageDetails
