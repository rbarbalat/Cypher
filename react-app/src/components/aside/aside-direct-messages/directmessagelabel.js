import React from 'react'
import { useHistory } from 'react-router-dom/';
import { useSelector } from 'react-redux';

function DirectMessageLabel() {
    const team = useSelector(state => state.teams.singleTeam)
    const history = useHistory()

    return (
        <div className='direct_message_label--wrapper'>
            <div className='direct_message_label--label'>
            <span className='direct_message_label--text'><strong>Direct messages</strong></span>
            </div>
        </div>
    )
}

export default DirectMessageLabel
