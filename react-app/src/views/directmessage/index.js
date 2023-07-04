import React, {useEffect} from 'react';
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
    let normalizedDirectMessages = Object.values(directMessages)
    console.log("normDMS on line 22    ", normalizedDirectMessages)

    const [chatInput, setChatInput] = useState("")
    const [messages, setMessages] = useState([])

    const user = useSelector(state => state.session.user)


    const { pathname } = useLocation()
    const partnerId = pathname.split('/')[4]
    const dispatch = useDispatch()

    const handleContent = () => {
        socket.emit("chat", {
            "user": user.username,
            "message": chatInput,
            "sender_id": parseInt(user.id),
            "recipient_id": parseInt(partnerId),
            "created_at": new Date()
        })
        messageRef.current.scroll({
            top: messageRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        dispatch(thunkGetDirectMessages(parseInt(partnerId)))
        setMessages([...normalizedDirectMessages])
        console.log("forty four and a half")
        console.log(messages)
    }, [partnerId, dispatch])

    useEffect(() => {
        socket = io()
        dispatch(thunkGetDirectMessages(parseInt(partnerId)))
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
    }, [partnerId, dispatch]);//empty in the sample code, maybe needs dispatch, partnerId

  //shouldn't be zero if clic
  if(normalizedDirectMessages.length === 0)  return <DataLoading></DataLoading>
  if(messages.length === 0)  return <DataLoading></DataLoading>
    // return <div>loading</div>


    return (
        <main className='views--wrapper'>
                <header className='views--header--wrapper'>
                    <div className='views--header'>
                        <DirectMessageRecipient
                            setIsVisible={setIsVisible}
                        />
                    </div>
                </header>
                { messages.length != 0 &&
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
