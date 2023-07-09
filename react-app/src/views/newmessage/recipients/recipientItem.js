import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function RecipientItem({member, handleRemoveRecipients}) {
  const image = useSelector(state => state.users.users[member.id])
  return (
    <div className='recipient_item--wrapper'>
        <div className='recipient_item--image' style={{backgroundImage: `url(${image.image})`}}>
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
