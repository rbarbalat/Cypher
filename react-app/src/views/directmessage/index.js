import React, {useEffect, useRef } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useLocation } from 'react-router-dom';
import DirectMessageRecipient from './directmessagerecipient';
import DirectMessageDetails from './directmessagedetails';
import DirectMessageFeed from '../../components/directmessagefeed';
import Modal from '../../components/modal';
import DataLoading from '../../components/loading/DataLoading';
import '../views.css';
import './directmessage.css';
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetDirectMessages } from '../../store/messages';
import { io } from "socket.io-client"
import {useState} from "react"
import MessageTextArea from '../../components/MessageTextBox';
let socket;

function DirectMessage() {
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    const directMessages = useSelector(state => state.messages.directMessages);
    const normalizedDirectMessages = Object.values(directMessages)
    const messageRef = useRef(null)
    const [chatInput, setChatInput] = useState("")
    const [messages, setMessages] = useState([...normalizedDirectMessages])

    const user = useSelector(state => state.session.user)


    const { pathname } = useLocation()
    const partnerId = pathname.split('/')[4]
    const dispatch = useDispatch()

    const handleContent = () => {
        if(chatInput.trim().length === 0) return;
        if(chatInput.trim().length > 500) return;
        socket.emit("chat", {
            "user": user.username,
            "message": chatInput,
            "sender_id": parseInt(user.id),
            "recipient_id": parseInt(partnerId),
            "created_at": new Date()
        })
        messageRef.current?.scroll({
            top: messageRef.current.scrollHeight + 300,
            behavior: 'smooth'
        });
        setChatInput('')
    }

    useEffect(() => {
        setMessages([...normalizedDirectMessages])
        if (messageRef.current) {
            messageRef.current.scroll({
                top: messageRef.current.scrollHeight + 300,
                behavior: 'smooth'
            });
        }
    }, [directMessages, dispatch])


    useEffect(() => {
        socket = io("/direct") //specify a namespace
        dispatch(thunkGetDirectMessages(parseInt(partnerId)))
        socket.emit("join", {
            username: user.username,
            room: parseInt(user.id),
        })
        socket.on("chat", async (chat) => {
            let msgs = await dispatch(thunkGetDirectMessages(parseInt(partnerId)))
            let normMsgs = Object.values(msgs)
            setMessages([...normMsgs])
        })
        socket.on("update_chat", async (chat) => {
            let msgs = await dispatch(thunkGetDirectMessages(parseInt(partnerId)))
            let normMsgs = Object.values(msgs)
            setMessages([...normMsgs])
        })
        socket.on("delete_chat", async (chat) => {
            let msgs = await dispatch(thunkGetDirectMessages(parseInt(partnerId)))
            let normMsgs = Object.values(msgs)
            setMessages([...normMsgs])
        })
        return (() => {
          socket.disconnect()
        })
    }, [partnerId, dispatch]);


    return (
        <main className='views--wrapper'>
                <header className='views--header--wrapper'>
                    <div className='views--header'>
                        <DirectMessageRecipient
                            setIsVisible={setIsVisible}
                        />
                    </div>
                </header>
                { messages.length &&

                <DirectMessageFeed ref={messageRef} messages={messages} socket={socket} partnerId={partnerId}/>

                }
                <MessageTextArea
                    value={chatInput}
                    setValue={(e) => setChatInput(e.target.value)}
                    action={handleContent}
                />
                {
                    isVisible ?
                    <Modal>
                        <DirectMessageDetails
                            setIsVisible={setIsVisible}
                            ref={ref}
                        />
                    </Modal> :
                    null
                }
        </main>
    )
}

export default DirectMessage
