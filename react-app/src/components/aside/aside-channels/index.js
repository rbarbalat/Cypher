import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCaretRight, FaCaretDown, FaPlus  } from 'react-icons/fa'
import ChannelItem from './channelitem'
import ChannelLabel from './channellabel'

function AsideChannels() {
    const [ expanded, setExpanded ] = useState(true)
    const channels = useSelector(state => state.channels.allChannels)
    const normalizedChannels = Object.values(channels)

    return (
        <div className='aside_dropdown--wrapper'>
        <header className='aside_dropdown--header'>
            <div className='aside_dropdown--arrow_wrapper' onClick={() => setExpanded(!expanded)}>
                {
                    expanded ?
                    <FaCaretDown className='aside_dropdown--arrow'/> :
                    <FaCaretRight className='aside_dropdown--arrow'/>
                }
            </div>
            <ChannelLabel/>
        </header>
        {
        expanded ?
        <ul className='aside-dropdown--list'>
            {normalizedChannels.map((channel) => {
                return (
                   <li key={channel.id}>
                    <ChannelItem channel={channel}/>
                    </li>
                )
            })}
                <li>
                    <div className='aside_dropdown--add_wrapper'>
                        <div className='aside_dropdown--add_item'>
                            <FaPlus className='aside_dropdown--add_icon'/>
                        </div>
                        <span>Add channels</span>
                    </div>
                </li>
        </ul>
        :
        null
        }
    </div>
    )
}

export default AsideChannels