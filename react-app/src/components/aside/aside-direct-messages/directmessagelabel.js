import React from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import useOutsideClick from '../../../hooks/useOutsideClick';

function DirectMessageLabel() {
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    return (
        <div className='direct_message_label--wrapper'>
            <div className='direct_message_label--label' onClick={() => setIsVisible(true)}>
            <span className='direct_message_label--text'>Direct message</span>
            <FaChevronDown className='direct_message_label--icon'/>
            </div>
            {
                isVisible ?
                <div ref={ref} className='direct_message_label--options'>
                    <span className='direct_message_label--option--wrapper'>
                        <p className='direct_message_label--option'>Create</p>
                        <FaChevronRight className='direct_message_label--option--icon'/>
                    </span>
                </div> :
                null
            }
        </div>
    )
}

export default DirectMessageLabel
