import React, { useEffect, useState, useRef } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick';
import DataLoading from '../../components/loading/DataLoading'
import { useParams } from 'react-router-dom';
import MessageTextArea from '../../components/MessageTextBox';
import ChannelTeam from './channelteam';
import ChannelDetails from './channeldetails';
import ChannelMembers from './channelmembers';
import Modal from '../../components/modal';
import '../views.css';
import './channel.css';
import { io } from "socket.io-client"
import {useSelector, useDispatch} from "react-redux"
import { thunkGetLiveChats } from '../../store/channels';
import { thunkGetChannel } from '../../store/channels';
import LiveChatFeed from '../../components/livechatfeed';


let socket;
function Channel(){
    const [ loading, setLoading ] = useState(false)
    const { channelId } = useParams();
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    const channel = useSelector(state => state.channels.singleChannel)
    const team = useSelector(state => state.teams.singleTeam)
    const messageRef = useRef(null)
    const liveChats = useSelector(state => state.channels.liveChats)
    console.log("liveChats in Channel");
    console.log(liveChats);
    const normalizedLiveChats = Object.values(liveChats)
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const [messages, setMessages] = useState([...normalizedLiveChats])

    const [chatInput, setChatInput] = useState("")

    const handleContent = () => {
        //console.log(chatInput)
        //console.log(socket)
        if(chatInput.trim().length === 0) return;
        if(chatInput.trim().length > 500) return;
        socket.emit("live_chat", {
            "message": chatInput,
            "sender_id": parseInt(user.id),
            "channel_id": parseInt(channelId),
        })
        messageRef.current.scroll({
            top: messageRef.current.scrollHeight + 300,
            behavior: 'smooth'
        });
        setChatInput("")
    }

    console.log("channel line 50      ", channel)

    useEffect(() => {
        dispatch(thunkGetChannel(channelId))
    }, [dispatch, channelId])

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

    // if (loading || !channel) return <DataLoading></DataLoading>
    if (loading || !channel.id) return <DataLoading></DataLoading>
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
                    members={channel?.users}
                />
            </div>
        </header>
        {
            messages.length &&
            <LiveChatFeed setIsVisible={setIsVisible} ref={messageRef} messages={messages} channel={channel} socket={socket}></LiveChatFeed>
        }
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
                    channel={channel}
                    team = {team}
                    ref={ref}
                />
            </Modal> :
            null
        }
    </main>
    )
}

export default Channel
