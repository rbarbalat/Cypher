import React from 'react'
import { useHistory } from 'react-router-dom/';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import useOutsideClick from '../../../hooks/useOutsideClick';
import { useSelector } from 'react-redux';

function DirectMessageLabel() {
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    const team = useSelector(state => state.teams.singleTeam)
    const history = useHistory()

    return (
        <div className='direct_message_label--wrapper'>
            <div className='direct_message_label--label' onClick={() => setIsVisible(true)}>
            <span className='direct_message_label--text'>Direct message</span>
            <FaChevronDown className='direct_message_label--icon'/>
            </div>
            {
                isVisible ?
                <div ref={ref} className='direct_message_label--options'>
                    <span  onClick={() => history.push(`/team/${team.id}/new-message`)} className='direct_message_label--option--wrapper'>
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
