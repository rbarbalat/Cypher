import React, {useEffect} from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useParams, useLocation } from 'react-router-dom';
import { thunkGetDirectMessages } from '../../store/messages';
import {  useDispatch } from 'react-redux'
function DirectMessageRecipient({setIsVisible, data}) {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const recipientId = pathname.split('/')[4]

  useEffect(() => {
    console.log(recipientId);
    dispatch(thunkGetDirectMessages(recipientId))
}, [dispatch])


  return (
    <div onClick={() => setIsVisible(true)} className='direct_message_recipient--wrapper'>
        <div className='direct_message_recipient--name'>
            <h1 className='direct_message_recipient--label'>{data.name}</h1>
            <FaChevronDown className='direct_message_recipient--icon'/>
        </div>
    </div>
  )
}

export default DirectMessageRecipient
