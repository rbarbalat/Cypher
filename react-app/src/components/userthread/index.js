import React from 'react'
import './userthread.css';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { thunkClearContents } from '../../store/thread';

function UserThread() {
    const userProfile = useSelector(state => state.thread.current)
    const dispatch = useDispatch();

    const closeThread = () => {
        dispatch(thunkClearContents())
    }

    return (
    <aside id='thread--wrapper'>
        <header className='thread--header'>
            <h1>Profile</h1>
            <div
                onClick={() => closeThread()}
                className='thread--close_wrapper'>
                <FaTimes className='thread--close'/>
            </div>
        </header>
        <section className='thread_user_profile-contents'>
            <div className='thread_user_profile-image'>
                <span>{userProfile.username.charAt(0)}</span>
            </div>
            <h2>{userProfile.username}</h2>
        </section>
    </aside>
  )
}

export default UserThread
