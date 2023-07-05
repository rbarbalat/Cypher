import React from 'react'
import ThreadFeed from './threadfeed'
import MessageTextArea from '../MessageTextBox'

function ThreadReplies() {
  return (
    <div>
        <h1>Thread Replies</h1>
        {/* <ThreadFeed messages={messages}/>
        <MessageTextArea
            value={'none'}
            setValue={(e) => console.log(e.target.value)}
            action={null}
        /> */}
    </div>
  )
}

export default ThreadReplies
