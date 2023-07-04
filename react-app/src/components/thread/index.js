import React from 'react'
import './thread.css';
import { FaTimes } from 'react-icons/fa';
import MessageTextArea from '../MessageTextBox';
import ThreadFeed from './threadfeed';
import { useSelector } from 'react-redux';

function Thread({close}) {
    const messages = Object.values(useSelector(state => state.messages.directMessages))
    return (
    <aside id='thread--wrapper'>
        <header className='thread--header'>
            <h1>Title</h1>
            <div
                onClick={close}
                className='thread--close_wrapper'>
                <FaTimes className='thread--close'/>
            </div>
        </header>
        <ThreadFeed messages={messages}/>
        <MessageTextArea
            value={'none'}
            setValue={(e) => console.log(e.target.value)}
            action={null}
        />
    </aside>
  )
}

export default Thread
