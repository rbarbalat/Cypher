import React from 'react'
import { FaChevronDown } from 'react-icons/fa'

function ChannelTeam({setIsVisible, data}) {
  return (
    <div onClick={() => setIsVisible(true)} className='channel--wrapper'>
        <div className='channel--name'>
            <h1 className='channel--label'></h1>
            <FaChevronDown className='channel--icon'/>
        </div>
    </div>
  )
}

export default ChannelTeam
