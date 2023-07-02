import React from 'react'
import SendMessage from '../../components/sendmessage'
import Recipients from './recipients';
import '../views.css';
import './newmessage.css';

function NewMessage() {
    return (
        <main className='views--wrapper'>
            <header className='views--header--wrapper'>
                <div className='views--header'>
                    <span className='views--header_label'>New Message</span>
                </div>
                <Recipients/>
            </header>

            <section className='views--feed'>

            </section>
            <SendMessage data={{}}/>
        </main>
  )
}

export default NewMessage
