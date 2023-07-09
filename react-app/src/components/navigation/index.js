import React from 'react'
import useOutsideClick from '../../hooks/useOutsideClick';
import Modal from '../modal';
import NavigationMenu from './navigationmenu';
import {FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useHistory } from 'react-router-dom';
import { thunkGetUserThread } from '../../store/thread';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './navigation.css';

function Navigation() {
    const user = useSelector(state => state.session.user)
    const userImage = useSelector(state => state.users.users[user.id].image)
    const team = useSelector(state => state.teams.singleTeam)
    const channel = useSelector(state => state.channels.singleChannel)

    const TeamOwner = team.users.find(user => user.status === "owner");
    const isTeamOwner = TeamOwner.id === user.id;

    const dispatch = useDispatch();
    const history = useHistory();
    const { ref, isVisible, setIsVisible } = useOutsideClick();

    const handleLogOut = () => {
        dispatch(logout())
        .then(() => history.push('/sign-in'))
    }

    const handleUserThread = () => {
        dispatch(thunkGetUserThread(user.id))
        .then(() => setIsVisible(false))
    }

    return (
        <nav className='navigation--wrapper'>
            <div className='navigation--contents'>
                { isTeamOwner ? <span className='navigation--owner'>You are the Owner of this Team</span> : null}
                <div onClick={() => setIsVisible(!isVisible)} className='navigation--user'>
                    <span>{user.username}</span>
                    <div className='navigation--image' style={{backgroundImage: `url(${userImage})`}}>
                        { user.image ? null : <span>{user.username.charAt(0)}</span>}
                    </div>
                    <div className='navigation--icon--wrapper'>
                    { isVisible ? <FaChevronUp className='navigation--icon'/> : <FaChevronDown className='navigation--icon'/> }
                    </div>
                </div>
            </div>
            {
                isVisible ?
                <NavigationMenu
                    ref={ref}
                    logout={handleLogOut}
                    viewUser={handleUserThread}
                /> :
                null
            }
        </nav>
    )
}

export default Navigation
