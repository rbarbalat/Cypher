import React, { useState } from 'react'
import MessageTextArea from '../../components/MessageTextBox';
import Recipients from './recipients';
import { thunkCreateDirectMessage } from '../../store/messages';
import { useDispatch, useSelector } from 'react-redux';
import '../views.css';
import './newmessage.css';
import { useHistory } from 'react-router-dom';

function NewMessage() {
    const [message, setMessage] = useState('');
    const team = useSelector(state => state.teams.singleTeam)
    const [recipient, setRecipient] = useState(undefined)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async () => {
        dispatch(thunkCreateDirectMessage(recipient.id, {message}))
        .then(() => history.push(`/team/${team.id}/direct-messages/${recipient.id}`))
    }

    return (
        <main className='views--wrapper'>
            <header className='views--header--wrapper'>
                <div className='views--header'>
                    <span className='views--header_label'>New Message</span>
                </div>
                <Recipients recipient={recipient} setRecipient={setRecipient}/>
            </header>

            <section className='views--feed'>

            </section>
            <MessageTextArea
                value={message}
                setValue={(e) => setMessage(e.target.value)}
                action={handleSubmit}
            />
        </main>
  )
}

export default NewMessage
