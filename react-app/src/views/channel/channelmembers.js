import React from 'react'

function ChannelMembers({data, setIsVisible}) {
  return (
    <div onClick={() => setIsVisible(true)} className='channel_members--wrapper'>
        <div className='channel_members--span'>
            {data.slice(0,3).map(member => (
                <div className='channel_members--member'></div>
            ))}
        </div>
        <span className='channel_members--count'>{data.length}</span>
    </div>
  )
}

export default ChannelMembers
