import React, { useState, useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import AsideChannels from './aside-channels';
import AsideDirectMessages from './aside-direct-messages';
import AsideTeamName from './aside-team-name';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkGetChannels } from '../../store/channels';
import { thunkGetPartners } from '../../store/messages';
import './aside.css';

function Aside() {
    const [ loading, setLoading ]= useState(true)
    const team = useSelector(state => state.teams.singleTeam)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(thunkGetChannels(team.id))
        .then(() => dispatch(thunkGetPartners()))
        .then(() => setLoading(false))
    })

    if (loading) return <div>Loading...</div>

    return (
        <aside id='aside--wrapper'>
            <header className='aside--header'>
                <AsideTeamName team={team}/>
                <button onClick={() => history.push(`/team/${team.id}/new-message`)} className='aside--new_message'>
                    <FaEdit className='aside--new_message_icon' />
                </button>
            </header>
            <AsideChannels />
            <AsideDirectMessages />
        </aside>
    )
}

export default Aside
