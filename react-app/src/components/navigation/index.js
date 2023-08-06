import React from 'react'
import useOutsideClick from '../../hooks/useOutsideClick';
import Modal from '../modal';
import NavigationMenu from './navigationmenu';
import {FaChevronDown, FaChevronUp, FaTimes, FaBars, FaKey } from 'react-icons/fa'
import { useHistory } from 'react-router-dom';
import { thunkGetUserThread } from '../../store/thread';
import { useSelector, useDispatch } from 'react-redux';
import { useMobileMenu } from '../../context/mobileMenuProvider';
import { logout } from '../../store/session';
import './navigation.css';

function Navigation() {
    const user = useSelector(state => state.session.user)
    const userImage = useSelector(state => state.users.users[user.id])
    const team = useSelector(state => state.teams.singleTeam)

    const TeamOwner = team.users.find(user => user.status === "owner");
    const isTeamOwner = TeamOwner.id === user.id;

    const dispatch = useDispatch();
    const history = useHistory();
    const { menu, setMenu } = useMobileMenu();
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
            <div onClick={menu ? () =>  setMenu(false) : () => setMenu(true)} className='navigation--mobile_menu'>
                {
                    menu ?
                    <FaTimes/> :
                    <FaBars/>
                }
            </div>
            <div className='navigation--contents'>
                { isTeamOwner ? <span className='navigation--owner'><FaKey/><span>Owner</span></span> : null}
                <div onClick={() => setIsVisible(!isVisible)} className='navigation--user'>
                    <span>{user.username}</span>
                    <div className='navigation--image' style={{backgroundImage: `url(${userImage?.image})`}}>
                        { user?.image || userImage?.image ? null : <span>{user?.username.charAt(0)}</span>}
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
