import React from 'react'
import { FaChevronDown } from 'react-icons/fa'
import {  useSelector } from 'react-redux'
function DirectMessageRecipient({partnerId, setIsVisible, data}) {
  const partner = useSelector(state => state.messages.currentPartner)

  if (!partner) return <div></div>

  return (
    <div onClick={() => setIsVisible(true)} className='direct_message_recipient--wrapper'>
        <div className='direct_message_recipient--name'>
            <h1 className='direct_message_recipient--label'>{partner.username}</h1>
            <FaChevronDown className='direct_message_recipient--icon'/>
        </div>
    </div>
  )
}

export default DirectMessageRecipient
