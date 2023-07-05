import React, { useEffect, useState } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick';
import { useParams } from 'react-router-dom';
import MessageTextArea from '../../components/MessageTextBox';
import ChannelTeam from './channelteam';
import ChannelDetails from './channeldetails';
import ChannelMembers from './channelmembers';
import Modal from '../../components/modal';
import '../views.css';
import './channel.css';
import { io } from "socket.io-client"
import {useSelector} from "react-redux"
import { thunkGetLiveChats } from '../../store/channels';
import LiveChatFeed from '../../components/livechatfeed';
import { useDispatch } from 'react-redux';
// const messages = [
//     {
//         sender: 'Sender 1',
//         date: '01/01/2023',
//         time: '1:00',
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         replies: [1,2,3]
//     },
//     {
//         sender: 'Sender 2',
//         date: '01/01/2023',
//         time: '3:00',
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         replies: [1,2,3]
//     },
//     {
//         sender: 'Sender 3',
//         date: '01/02/2023',
//         time: '12:00',
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         replies: [1,2,3]
//     },
//     {
//         sender: 'Sender 4',
//         date: '01/03/2023',
//         time: '11:00',
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         replies: [1,2,3]
//     },
//     {
//         sender: 'Sender 5',
//         date: '01/03/2023',
//         time: '15:00',
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         replies: [1,2,3]
//     },
//   ]

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

let socket;
function Channel({setThread}){
    const { channelId } = useParams();
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    const channel = fakeChannels.find(channel => channel.id == channelId)

    const liveChats = useSelector(state => state.channels.liveChats)
    const normalizedLiveChats = Object.values(liveChats)

    const user = useSelector(state => state.session.user)

    const [messages, setMessages] = useState([...normalizedLiveChats])
    const dispatch = useDispatch()

    const [chatInput, setChatInput] = useState("")

    const handleContent = () => {
        console.log(chatInput)
        console.log(socket)
        socket.emit("live_chat", {
            "message": chatInput,
            "sender_id": parseInt(user.id),
            "channel_id": parseInt(channelId),
        })
        console.log("hello world from handlecontent")
    }

    useEffect(() => {
        console.log("yoohoooooo")
        setMessages([...normalizedLiveChats])
    }, [liveChats, dispatch])


    useEffect(() => {
        socket = io("/channel"); //specify a namespace
        dispatch(thunkGetLiveChats(parseInt(channelId)))
        socket.emit("join", {
            room: `Channel ${channelId}`
        })
        socket.on("live_chat", async (chat) => {
            let chats = await dispatch(thunkGetLiveChats(parseInt(channelId)))
            console.log(chats)
            setMessages([...chats])
        })
        socket.on("update_live_chat", async (chat) => {
            let chats = await dispatch(thunkGetLiveChats(parseInt(channelId)))
            setMessages([...chats])
        })
        socket.on("delete_live_chat", async (chat) => {
            let chats = await dispatch(thunkGetLiveChats(parseInt(channelId)))
            setMessages([...chats])
        })
        return (() => {
          socket.disconnect()
        })
    }, [channelId, dispatch]);
    console.log("line 145 --------    ", messages)
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
        <LiveChatFeed messages={messages} channelId={channelId} socket={socket}></LiveChatFeed>
        <MessageTextArea
            value={chatInput}
            setValue={(e) => setChatInput(e.target.value)}
            action={handleContent}
        />
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
