import React from 'react'
import './thread.css';
import { FaTimes } from 'react-icons/fa';
import SendMessage from '../sendmessage';
import ThreadFeed from './threadfeed';
import { useSelector } from 'react-redux';

// const messages = [
//   {
//       sender: 'Sender 1',
//       date: '01/01/2023',
//       time: '1:00',
//       message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//       sender: 'Sender 2',
//       date: '01/01/2023',
//       time: '3:00',
//       message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//       sender: 'Sender 3',
//       date: '01/02/2023',
//       time: '12:00',
//       message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//       sender: 'Sender 4',
//       date: '01/03/2023',
//       time: '11:00',
//       message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//       sender: 'Sender 5',
//       date: '01/03/2023',
//       time: '15:00',
//       message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
// ]

function Thread({close}) {
    const messages = Object.values(useSelector(state => state.messages.directMessages))
    console.log(messages, 'messages');
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
        <SendMessage data={{}}/>
    </aside>
  )
}

export default Thread
