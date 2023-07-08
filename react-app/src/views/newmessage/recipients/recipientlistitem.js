import React from 'react'

function RecipientListItem({data, handleSelectRecipients}) {
  console.log(data)
  return (
    <li onClick={() => handleSelectRecipients(data)} className='recipient_list_item--wrapper'>
        <div className='recipient_list_item--image'>
           { data.image ? null : <span>{data.username.charAt(0)}</span> }
        </div>
        <span className='recipient_list_item--name'>{data.username}</span>
    </li>
  )
}

export default RecipientListItem
