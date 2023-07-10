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
    const userImage = useSelector(state => state.users.users[user.id])
    const team = useSelector(state => state.teams.singleTeam)
    const channel = useSelector(state => state.channels.singleChannel)

    console.log("user")
    console.log(user)
    console.log("userImage")
    console.log(userImage)
    console.log("team")
    console.log(team)
    console.log("channel")
    console.log(channel)
    //singleteam seems to be in the store so team is defined
    //probably because Navigation is called inside <CypherApp>
    //and get single team thunk is called in a useEffect there
    //and there is a if statement blocking loading the return which includes this component
    //if (loading || !team) return <DataLoading></DataLoading>
    const TeamOwner = team.users.find(user => user.status === "owner");
    console.log("TeamOwner")
    console.log(TeamOwner)
    const isTeamOwner = TeamOwner.id === user.id;
    console.log("isTeamOwner")
    console.log(isTeamOwner)

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
