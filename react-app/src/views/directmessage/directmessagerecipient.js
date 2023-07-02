import React from 'react'
import { FaChevronDown } from 'react-icons/fa'

function DirectMessageRecipient({setIsVisible, data}) {
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
