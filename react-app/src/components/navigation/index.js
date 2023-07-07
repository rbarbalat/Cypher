import React from 'react'
import useOutsideClick from '../../hooks/useOutsideClick';
import Modal from '../modal';
import NavigationMenu from './navigationmenu';
import { useHistory } from 'react-router-dom';
import { thunkGetUserThread } from '../../store/thread';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './navigation.css';

function Navigation() {
    const user = useSelector(state => state.session.user)
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
                <div onClick={() => setIsVisible(true)} className='navigation--user'>
                    <span>{user.username}</span>
                    <div className='navigation--image'></div>
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
