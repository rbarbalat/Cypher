import React from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import useOutsideClick from '../../../hooks/useOutsideClick';

function ChannelLabel() {
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    return (
        <div className='channel_label--wrapper'>
            <div className='channel_label--label' onClick={() => setIsVisible(true)}>
            <span className='channel_label--text'>Channel</span>
            <FaChevronDown className='channel_label--icon'/>
            </div>
            {
                isVisible ?
                <div ref={ref} className='channel_label--options'>
                    <span className='channel_label--option--wrapper'>
                        <p className='channel_label--option'>Create</p>
                        <FaChevronRight className='channel_label--option--icon'/>
                    </span>
                </div> :
                null
            }
        </div>
    )
}

export default ChannelLabel
