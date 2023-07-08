import React from 'react'

function ChannelMembers({members, setIsVisible}) {
  return (
    <div onClick={() => setIsVisible(true)} className='channel_members--wrapper'>
        <div className='channel_members--span'>
            {members?.slice(0,3).map(member => (
                <div className='channel_members--member' style={{backgroundImage: `url(${member.image})`}}></div>
            ))}
        </div>
        <span className='channel_members--count'>{members.length}</span>
    </div>
  )
}

export default ChannelMembers
