import React, { useEffect } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick';
import { useParams } from 'react-router-dom';
import SendMessage from '../../components/sendmessage'
import ChannelTeam from './channelteam';
import ChannelDetails from './channeldetails';
import ChannelMembers from './channelmembers';
import Modal from '../../components/modal';
import '../views.css';
import './channel.css';
const messages = [
    {
        sender: 'Sender 1',
        date: '01/01/2023',
        time: '1:00',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        replies: [1,2,3]
    },
    {
        sender: 'Sender 2',
        date: '01/01/2023',
        time: '3:00',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        replies: [1,2,3]
    },
    {
        sender: 'Sender 3',
        date: '01/02/2023',
        time: '12:00',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        replies: [1,2,3]
    },
    {
        sender: 'Sender 4',
        date: '01/03/2023',
        time: '11:00',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        replies: [1,2,3]
    },
    {
        sender: 'Sender 5',
        date: '01/03/2023',
        time: '15:00',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        replies: [1,2,3]
    },
  ]

const fakeChannels = [
    {
        id: 1,
        type: 'channel',
        private: true,
        name: 'Something or Other Name'
    },
    {
        id: 2,
        type: 'channel',
        private: false,
        name: 'Project groups - Final'
    },
    {
        id: 3,
        type: 'channel',
        private: false,
        name: 'general'
    },
    {
        id: 4,
        type: 'channel',
        private: true,
        name: 'Channel 4'
    },
    {
        id: 5,
        type: 'channel',
        private: false,
        name: 'help-requests'
    },
]

const fakeMembers = [
    1,2,3,4,5
]


function Channel({setThread}) {
    const { channelId } = useParams();
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    const channel = fakeChannels.find(channel => channel.id == channelId)

    return (
        <main className='views--wrapper'>
        <header className='views--header--wrapper'>
            <div className='views--header'>
                <ChannelTeam
                    setIsVisible={setIsVisible}
                    data={channel}
                />
                <ChannelMembers
                    setIsVisible={setIsVisible}
                    data={fakeMembers}
                />
            </div>
        </header>
        {` Channel Message Feed`}
        <SendMessage data={channel}/>
        {
            isVisible ?
            <Modal>
                <ChannelDetails
                    setIsVisible={setIsVisible}
                    data={channel}
                    ref={ref}
                />
            </Modal> :
            null
        }
</main>
    )
}

export default Channel
