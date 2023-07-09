import React, { useState, useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import AsideChannels from './aside-channels';
import AsideDirectMessages from './aside-direct-messages';
import AsideTeamName from './aside-team-name';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkGetChannels, thunkGetChannelsByUser } from '../../store/channels';
import { thunkGetPartners } from '../../store/messages';
import './aside.css';

function Aside() {
    const [ loading, setLoading ]= useState(true)
    const team = useSelector(state => state.teams.singleTeam)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(thunkGetChannelsByUser(team.id))
        .then(() => dispatch(thunkGetPartners()))
        .then(() => setLoading(false))
    })

    if (loading) return <aside id='aside--wrapper'></aside>

    return (
        <aside id='aside--wrapper'>
            <header className='aside--header'>
                <AsideTeamName team={team}/>
                <button onClick={() => history.push(`/team/${team.id}/new-message`)} className='aside--new_message'>
                    <FaEdit className='aside--new_message_icon' />
                </button>
            </header>
            <div className='aside--quick-links'>
                <div onClick={() => history.push(`/team/${team.id}`)} className='aside--quick-link'>
                    <span className='aside--quick-link_icon'><FaHouse /></span>
                    <span className='aside--quick-link_text'>{team.name} Home</span>
                </div>
            </div>
            <AsideChannels />
            <AsideDirectMessages />
        </aside>
    )
}

export default Aside
