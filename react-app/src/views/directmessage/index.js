import React, {useEffect} from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useParams, useLocation } from 'react-router-dom';
import SendMessage from '../../components/sendmessage'
import DirectMessageRecipient from './directmessagerecipient';
import DirectMessageDetails from './directmessagedetails';
import DirectMessageFeed from '../../components/directmessagefeed';
import Modal from '../../components/modal';
import '../views.css';
import './directmessage.css';
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetDirectMessages, thunkCreateDirectMessage } from '../../store/messages';
import { io } from "socket.io-client"
import {useState} from "react"
let socket;

function DirectMessage() {
    const { userId } = useParams();
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    const directMessages = useSelector(state => state.messages.directMessages);
    let normalizedDirectMessages = Object.values(directMessages)

    const [chatInput, setChatInput] = useState("")
    const [messages, setMessages] = useState([])

    const user = useSelector(state => state.session.user)

    console.log("normalized messages, line 74 ---",normalizedDirectMessages)

    const { pathname } = useLocation()
    const partnerId = pathname.split('/')[4]
    const dispatch = useDispatch()

    const handleContent = async () => {
        const text = {"message" : chatInput }
        await dispatch(thunkCreateDirectMessage(parseInt(partnerId), text))
        socket.emit("chat", {
            "user": user.username,
            "message": chatInput,
            "sender_id": parseInt(user.id),
            "recipient_id": parseInt(partnerId)
          })
    }

    useEffect(() => {
        normalizedDirectMessages = Object.values(directMessages)
        setMessages([...normalizedDirectMessages])
  }, [directMessages])


    useEffect(() => {
        socket = io()
        console.log(socket)
        dispatch(thunkGetDirectMessages(parseInt(partnerId)))
        console.log("socket connected")

        socket.on("chat", async (chat) => {
            let msgs = await dispatch(thunkGetDirectMessages(parseInt(partnerId)))
            console.log("msgs ---- line 51,", msgs)
            let normMsgs = Object.values(msgs)
            console.log("normMsgs   line 53,   ", normMsgs)
            setMessages([...normMsgs])
            console.log("normMsgs inside directMesssage   ", normMsgs)
        })
        socket.emit("chat", {
            "user": user.username,
            "message": "has connected",
            "sender_id": parseInt(user.id),
            "recipient_id": parseInt(partnerId)
          })

        return (() => {
            socket.emit("chat", {
                "user": user.username,
                "message": "is offline",
                "sender_id": parseInt(user.id),
                "recipient_id": parseInt(partnerId)
              })
          socket.disconnect()
        })
    }, [partnerId, dispatch,]);//empty in the sample code, maybe needs dispatch, partnerId

  //shouldn't be zero if clic
  if(normalizedDirectMessages.length == 0) return <div>loading</div>


    return (
        <main className='views--wrapper'>
                <header className='views--header--wrapper'>
                    <div className='views--header'>
                        {/* <DirectMessageRecipient
                            setIsVisible={setIsVisible}
                            // data={normalizedDirectMessages}
                            data = {messages}
                        /> */}
                    </div>
                </header>
                {/* <DirectMessageFeed messages={normalizedDirectMessages}/> */}
                <DirectMessageFeed messages={messages}/>
                {/* <SendMessage partnerId={partnerId}/> */}
                <div className='send_message--wrapper'>
                    <textarea value={chatInput} onChange={(e) => setChatInput(e.target.value)}>
                    </textarea>
                    <button onClick={handleContent}>SEND A MESSAGE</button>
                </div>

                {
                    isVisible ?
                    <Modal>
                        <DirectMessageDetails
                            setIsVisible={setIsVisible}
                            data={{}}
                            ref={ref}
                        />
                    </Modal> :
                    null
                }
        </main>
    )
}

export default DirectMessage
