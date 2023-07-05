import React from 'react'

function ThreadUser({thread}) {
  return (
    <div className='user_thread--wrapper'>
      <div className='thread_user--image'>
        <span>{thread.username.charAt(0)}</span>
      </div>
      <h2 className='user_thread--username'>{thread.username}</h2>
    </div>
  )
}

export default ThreadUser
