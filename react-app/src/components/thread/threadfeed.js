import React from 'react'
import Message from '../message'

function ThreadFeed({messages}) {
  return (
    <section id="thread_feed--wrapper">
        {messages?.map(message => (
            <Message data={message}/>
        )
    )}
    </section>
  )
}

export default ThreadFeed
