import React, { useState, useEffect, useRef } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaHouse, FaUserGroup } from 'react-icons/fa6'
import AsideChannels from './aside-channels';
import AsideDirectMessages from './aside-direct-messages';
import AsideTeamName from './aside-team-name';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useMobileMenu } from '../../context/mobileMenuProvider'
import { thunkGetChannels, thunkGetChannelsByUser } from '../../store/channels';
import { thunkGetPartners } from '../../store/messages';
import './aside.css';

function Aside() {
    const [ loading, setLoading ]= useState(true)
    const team = useSelector(state => state.teams.singleTeam)
    const dispatch = useDispatch();
    const history = useHistory();
    const { menu, setMenu } = useMobileMenu();
    const asideRef = useRef(null)

    const handleNewMessage = (id) => {
        history.push(`/team/${id}/new-message`)
        setMenu(false)
    }

    const handleTeamHome = (id) => {
        history.push(`/team/${id}`)
        setMenu(false)
    }

    const handleTeamMembers = (id) => {
        history.push(`/team/${id}/members`)
        setMenu(false)
    }

    const handleAsideClose = (e) => {
        if (asideRef.current && !asideRef.current.contains(e.target)) {
            setMenu(false)
        }
    }

    useEffect(() => {
        dispatch(thunkGetChannelsByUser(team.id))
        .then(() => dispatch(thunkGetPartners()))
        .then(() => setLoading(false))
    })

    useEffect(() => {
        document.addEventListener('click', handleAsideClose, true)
        return () => {
            document.addEventListener('click', handleAsideClose, true)
        }
    }, [])

    if (loading) return <aside className='loading_aside--wrapper'></aside>

    return (
        <aside ref={asideRef} id='aside--wrapper' className={`${menu ? 'mobile_menu--open' : 'mobile_menu--closed'}`}>
            <header className='aside--header'>
                <AsideTeamName team={team}/>
                <button onClick={() => handleNewMessage(team?.id)} className='aside--new_message'>
                    <FaEdit className='aside--new_message_icon' />
                </button>
            </header>
            <div className='aside--quick-links'>
                <div onClick={() => handleTeamHome(team?.id)} className='aside--quick-link'>
                    <span className='aside--quick-link_icon'><FaHouse /></span>
                    <span className='aside--quick-link_text'>{team?.name} Home</span>
                </div>
                <div onClick={() => handleTeamMembers(team?.id)} className='aside--quick-link'>
                    <span className='aside--quick-link_icon'><FaUserGroup /></span>
                    <span className='aside--quick-link_text'>All Members</span>
                </div>
            </div>
            <AsideChannels />
            <AsideDirectMessages />
        </aside>
    )
}

export default Aside
