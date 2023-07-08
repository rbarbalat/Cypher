import React from 'react'
import { FaTimes } from 'react-icons/fa';

function RecipientItem({member, handleRemoveRecipients}) {
  console.log(member)
  return (
    <div className='recipient_item--wrapper'>
        <div className='recipient_item--image'>
           { member.image ? null : <span>{member.username.charAt(0)}</span> }
        </div>
        <span className='recipient_item--name'>{member.username}</span>
        <div className='recipient_item--close_wrapper'>
          <FaTimes onClick={() => handleRemoveRecipients()} className='recipient_item--close'/>
        </div>
    </div>
  )
}

export default RecipientItem
