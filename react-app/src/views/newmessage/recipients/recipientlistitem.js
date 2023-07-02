import React from 'react'

function RecipientListItem({data, handleSelectRecipients}) {
  return (
    <li onClick={() => handleSelectRecipients(data)} className='recipient_list_item--wrapper'>
        <div className='recipient_list_item--image'>
           <span>{data.name.charAt(0)}</span>
        </div>
        <span className='recipient_list_item--name'>{data.name}</span>
    </li>
  )
}

export default RecipientListItem
