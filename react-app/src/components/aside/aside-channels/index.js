import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCaretRight, FaCaretDown, FaPlus  } from 'react-icons/fa'
import { FaArrowRightToBracket } from 'react-icons/fa6'
import ChannelItem from './channelitem'
import ChannelLabel from './channellabel'
import CreateChannelForm from '../../createchannelform';
import Modal from '../../modal';

function AsideChannels() {
    const [ expanded, setExpanded ] = useState(true)
    const [ createChannel, setCreateChannel ] = useState(false)
    const [ joinChannel, setJoinChannel ] = useState(false)
    const channels = useSelector(state => state.channels.allChannels)
    const normalizedChannels = Object.values(channels)

    return (
        <>
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
                    <div onClick={() => setCreateChannel(true)} className='aside_dropdown--add_wrapper'>
                        <div className='aside_dropdown--add_item'>
                            <FaPlus className='aside_dropdown--add_icon'/>
                        </div>
                        <span>Create a channel</span>
                    </div>
                </li>
                <li>
                    <div onClick={() => setJoinChannel(true)} className='aside_dropdown--add_wrapper'>
                        <div className='aside_dropdown--add_item'>
                            <FaArrowRightToBracket className='aside_dropdown--add_icon'/>
                        </div>
                        <span>Join a channel</span>
                    </div>
                </li>
        </ul>
        :
        null
        }
    </div>
    {
        createChannel || joinChannel ?
        <Modal>
           <CreateChannelForm setCreateChannel={setCreateChannel} setJoinChannel={setJoinChannel} joinChannel={joinChannel}/>
        </Modal> :
        null
    }
    </>
    )
}

export default AsideChannels
