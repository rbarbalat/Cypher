import React from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import useOutsideClick from '../../../hooks/useOutsideClick';
import CreateChannelForm from '../../createchannelform';
import Modal from "../../modal"
import { useState } from "react"

function ChannelLabel() {
    // const { ref, isVisible, setIsVisible } = useOutsideClick();
    // const [ createChannel, setCreateChannel ] = useState(false)
    // const [ joinChannel, setJoinChannel ] = useState(false)
    return (
        <div className='channel_label--wrapper'>
            <div className='channel_label--label' >
            <span className='channel_label--text'>Channel</span>
            <FaChevronDown className='channel_label--icon'/>
            </div>
            {/* {
                createChannel || joinChannel ?
                <Modal>
                    <CreateChannelForm setCreateChannel={setCreateChannel}
                     setJoinChannel={setJoinChannel} joinChannel={joinChannel}/>
                </Modal>
                :
                null
            } */}
        </div>
    )
}

export default ChannelLabel
