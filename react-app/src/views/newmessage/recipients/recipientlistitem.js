import React from 'react'
import { useSelector } from 'react-redux'

function RecipientListItem({data, handleSelectRecipients}) {
  const image = useSelector(state => state.users.users[data.id].image)
  return (
    <li onClick={() => handleSelectRecipients(data)} className='recipient_list_item--wrapper'>
        <div className='recipient_list_item--image' style={{backgroundImage: `url(${image})`}}>
           { data.image ? null : <span>{data.username.charAt(0)}</span> }
        </div>
        <span className='recipient_list_item--name'>{data.username}</span>
    </li>
  )
}

export default RecipientListItem
