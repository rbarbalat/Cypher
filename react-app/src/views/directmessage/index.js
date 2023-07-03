import React, {useEffect} from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useParams, useLocation } from 'react-router-dom';
import SendMessage from '../../components/sendmessage'
import DirectMessageRecipient from './directmessagerecipient';
import DirectMessageDetails from './directmessagedetails';
import MessageFeed from '../../components/messagefeed';
import Modal from '../../components/modal';
import '../views.css';
import './directmessage.css';
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetDirectMessages } from '../../store/messages';


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

    console.log("normalized messages, line 74 ---",normalizedDirectMessages)

    const { pathname } = useLocation()
    const partnerId = pathname.split('/')[4]
    const dispatch = useDispatch()

    useEffect(() => {
      console.log("printing partner ind ------ ", partnerId);
      dispatch(thunkGetDirectMessages(partnerId))
  }, [dispatch, partnerId])

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
                {/* <MessageFeed messages={messages}/> */}
                <MessageFeed messages={normalizedDirectMessages} needsPartner={true}/>
                <SendMessage data={{}}/>
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
