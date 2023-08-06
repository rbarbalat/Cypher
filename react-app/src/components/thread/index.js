import React from 'react'
import './thread.css';
import { FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import ThreadUser from './threadUser';
import { useMobileMenu } from '../../context/mobileMenuProvider';
import ThreadReplies from './threadReplies';
import { thunkclearThread } from '../../store/thread';

function Thread() {
    const thread = useSelector(state => state.thread.current)
    const dispatch = useDispatch();
    const { threadMenu, setThreadMenu } = useMobileMenu();

    const handleClearThread = () => {
        dispatch(thunkclearThread())
        setThreadMenu(false)
    }

    return (
    <aside id='thread--wrapper'>
        <header className='thread--header'>
            <h1>{thread?.type === 'user' ? thread?.username : 'Channel Name'}</h1>
            <div
                onClick={handleClearThread}
                className='thread--close_wrapper'>
                <FaTimes className='thread--close'/>
            </div>
        </header>
        {thread?.type === 'user' ?
        <ThreadUser thread={thread} /> :
        <ThreadReplies thread={thread}/>
        }
    </aside>
  )
}

export default Thread
