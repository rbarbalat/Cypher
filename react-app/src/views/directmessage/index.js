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
import { thunkGetDirectMessages } from '../../store/messages';
import { io } from "socket.io-client"
import {useState} from "react"
let socket;


// const messages = [
//     {
//         sender: 'Sender 1',
//         date: '01/01/2023',
//         time: '1:00',
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//     },
//     {
//         sender: 'Sender 2',
//         date: '01/01/2023',
//         time: '3:00',
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//     },
//     {
//         sender: 'Sender 3',
//         date: '01/02/2023',
//         time: '12:00',
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//     },
//     {
//         sender: 'Sender 4',
//         date: '01/03/2023',
//         time: '11:00',
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//     },
//     {
//         sender: 'Sender 5',
//         date: '01/03/2023',
//         time: '15:00',
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//     },
//   ]

// const fakeUsers = [
//     {
//         id: 1,
//         name: 'Omar El Sahalah'
//     },
//     {
//         id: 2,
//         name: 'Roman Barabalat'
//     },
//     {
//         id: 3,
//         name: 'Jonathan Carter'
//     },
//     {
//         id: 4,
//         name: 'Chris Eke'
//     }
// ]

function DirectMessage() {
    const { userId } = useParams();
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    // const directMessages = useSelector(state => state.messages);
    const directMessages = useSelector(state => state.messages.directMessages);
    const normalizedDirectMessages = Object.values(directMessages)

    // const [messages, setMessages] = useState(normalizedDirectMessages)
    // const [messages, setMessages] = useState([])
    const user = useSelector(state => state.session.user)

    console.log("normalized messages, line 74 ---",normalizedDirectMessages)

    const { pathname } = useLocation()
    const partnerId = pathname.split('/')[4]
    const dispatch = useDispatch()


    useEffect(() => {
      dispatch(thunkGetDirectMessages(partnerId))
  }, [dispatch, partnerId])


    useEffect(() => {
        socket = io()
        console.log(socket)
        dispatch(thunkGetDirectMessages(partnerId))
        console.log("socket connected")
        // socket.emit("chat", {
        //   "user": user.username,
        //   "message": "has connected",
        //   "sender_id": userId,
        //   "recipient_id": partnerId
        // })
        socket.on("chat", (chat) => {
            dispatch(thunkGetDirectMessages(partnerId))
            //need to await dispatch?
            // setMessages(messages => [...messages, chat])
        })

        return (() => {
        //   socket.emit("chat", {
        //     "user": user.username,
        //     "message": "has disconnected",
        //     "sender_id": user.id,
        //     "recipient_id": partnerId
        //   })
          socket.disconnect()
        })
    }, [partnerId, dispatch]);//empty in the sample code, maybe needs dispatch, partnerId

  //shouldn't be zero if clic
  if(normalizedDirectMessages.length == 0) return <div>loading</div>


    return (
        <main className='views--wrapper'>
                <header className='views--header--wrapper'>
                    <div className='views--header'>
                        <DirectMessageRecipient
                            setIsVisible={setIsVisible}
                            data={normalizedDirectMessages}
                        />
                    </div>
                </header>
                <DirectMessageFeed messages={normalizedDirectMessages}/>
                {/* <DirectMessageFeed messages={messages}/> */}
                <SendMessage partnerId={partnerId}/>
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
