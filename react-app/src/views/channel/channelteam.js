import React from 'react'
import { FaChevronDown } from 'react-icons/fa';
import { FaLock, FaHashtag } from 'react-icons/fa';

function ChannelTeam({setIsVisible, data}) {
  return (
    <div onClick={() => setIsVisible(true)} className='channel--wrapper'>
        <div className='channel--name'>
            {data.private ? <FaLock/> : <FaHashtag/>}
            <h1 className='channel--label'>{data.name}</h1>
            <FaChevronDown className='channel--icon'/>
        </div>
        <span className='channel--description'>{data.description}</span>
    </div>
  )
}

export default ChannelTeam
