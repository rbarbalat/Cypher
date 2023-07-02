import React from 'react'
import { FaTimes } from 'react-icons/fa';

function RecipientItem({data, handleRemoveRecipients}) {
  return (
    <div className='recipient_item--wrapper'>
        <div className='recipient_item--image'>
           <span>{data.name.charAt(0)}</span>
        </div>
        <span className='recipient_item--name'>{data.name}</span>
        <div className='recipient_item--close_wrapper'>
          <FaTimes onClick={() => handleRemoveRecipients(data)} className='recipient_item--close'/>
        </div>
    </div>
  )
}

export default RecipientItem
